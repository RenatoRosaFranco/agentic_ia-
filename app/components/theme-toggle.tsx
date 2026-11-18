"use client";

import { Moon, Sun } from "@phosphor-icons/react/ssr";
import { useEffect } from "react";

const storageKey = "theme";

function preferredDark() {
  const stored = localStorage.getItem(storageKey);
  if (stored === "dark" || stored === "light") {
    return stored === "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
}

export function ThemeToggle() {
  useEffect(() => {
    applyTheme(preferredDark());
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    applyTheme(next);
    localStorage.setItem(storageKey, next ? "dark" : "light");
  };

  return (
    <button type="button" className="theme-toggle" aria-label="Alternar entre modo claro e escuro" onClick={toggle}>
      <Sun aria-hidden="true" className="hidden dark:block" size={18} weight="bold" />
      <Moon aria-hidden="true" className="dark:hidden" size={18} weight="bold" />
    </button>
  );
}
