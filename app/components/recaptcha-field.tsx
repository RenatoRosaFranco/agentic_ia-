"use client";

import { useEffect, useImperativeHandle, useRef } from "react";

export const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

type Grecaptcha = {
  render: (
    container: HTMLElement,
    parameters: {
      sitekey: string;
      theme: "light" | "dark";
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => number;
  reset: (widgetId: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

export type RecaptchaFieldHandle = {
  reset: () => void;
};

type RecaptchaFieldProps = {
  ref: React.Ref<RecaptchaFieldHandle>;
  onToken: (token: string) => void;
  onError: () => void;
};

let ready: Promise<void> | null = null;

function loadRecaptcha() {
  if (window.grecaptcha?.render) {
    return Promise.resolve();
  }

  ready ??= new Promise((resolve, reject) => {
    const callbackName = `onRecaptchaReady_${Math.random().toString(36).slice(2)}`;
    const host = window as unknown as Record<string, () => void>;
    host[callbackName] = () => {
      delete host[callbackName];
      resolve();
    };

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?onload=${callbackName}&render=explicit`;
    script.async = true;
    script.onerror = () => reject(new Error("recaptcha"));
    document.head.appendChild(script);
  });

  return ready;
}

export function RecaptchaField({ ref, onToken, onError }: RecaptchaFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);
  const onTokenRef = useRef(onToken);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onTokenRef.current = onToken;
    onErrorRef.current = onError;
  });

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetId.current !== null && window.grecaptcha) {
        window.grecaptcha.reset(widgetId.current);
      }
      onTokenRef.current("");
    },
  }));

  useEffect(() => {
    if (!recaptchaSiteKey || !containerRef.current) {
      return;
    }

    let cancelled = false;

    loadRecaptcha()
      .then(() => {
        if (cancelled || !containerRef.current || !window.grecaptcha || widgetId.current !== null) {
          return;
        }

        widgetId.current = window.grecaptcha.render(containerRef.current, {
          sitekey: recaptchaSiteKey,
          theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
          callback: (token) => onTokenRef.current(token),
          "expired-callback": () => onTokenRef.current(""),
          "error-callback": () => onErrorRef.current(),
        });
      })
      .catch(() => onErrorRef.current());

    return () => {
      cancelled = true;
    };
  }, []);

  if (!recaptchaSiteKey) {
    return (
      <p className="rounded-2xl border border-line px-4 py-3 text-sm text-muted" role="status">
        A verificação anti-robô ainda não está configurada.
      </p>
    );
  }

  return <div ref={containerRef} className="min-h-[78px] overflow-x-auto" />;
}
