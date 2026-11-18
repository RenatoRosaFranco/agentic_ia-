"use client";

import { Laptop, PencilSimple, X } from "@phosphor-icons/react/ssr";
import { createContext, useContext, useEffect, useId, useRef, useState } from "react";
import {
  genderOptions,
  validatePreRegistration,
  type PreRegistrationErrors,
} from "./pre-registration-schema";

const PreRegistrationContext = createContext<(() => void) | null>(null);

export function useOpenPreRegistration() {
  const open = useContext(PreRegistrationContext);

  if (!open) {
    throw new Error("A pré-inscrição precisa estar dentro do provider.");
  }

  return open;
}

export function PreRegistrationProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openerRef = useRef<HTMLElement | null>(null);

  const openDialog = () => {
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    window.requestAnimationFrame(() => openerRef.current?.focus());
  };

  return (
    <PreRegistrationContext.Provider value={openDialog}>
      {children}
      {open ? <PreRegistrationDialog onClose={closeDialog} /> : null}
    </PreRegistrationContext.Provider>
  );
}

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  birthDate: "",
  gender: "",
  notebook: false,
};

function PreRegistrationDialog({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<PreRegistrationErrors>({});
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("input, select, button")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>("input, select, button, a")].filter(
        (element) => !element.hasAttribute("disabled"),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const update = (field: keyof typeof emptyForm, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, form: undefined }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = validatePreRegistration(form);

    if (!result.ok) {
      setErrors(result.errors);
      return;
    }

    setPending(true);
    setErrors({});

    try {
      const response = await fetch("/api/pre-inscricao", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(result.value),
      });
      const payload = (await response.json()) as { ok?: boolean; errors?: PreRegistrationErrors };

      if (!response.ok || !payload.ok) {
        setErrors(payload.errors ?? { form: "Não foi possível registrar agora. Tente de novo." });
        return;
      }

      setDone(true);
    } catch {
      setErrors({ form: "Não foi possível registrar agora. Tente de novo." });
    } finally {
      setPending(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/55 p-4 sm:items-center"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="flex max-h-[calc(100dvh-2rem)] w-full max-w-xl flex-col overflow-hidden rounded-[1.6rem] border border-edge bg-surface shadow-[0_24px_70px_rgb(0_0_0/0.28)]"
      >
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-line px-6 py-5 sm:px-8 dark:border-white/15">
          <h2 id={titleId} tabIndex={-1} className="flex items-center gap-3 font-display text-3xl text-ink">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <PencilSimple aria-hidden="true" size={20} weight="bold" />
            </span>
            Pré-inscrição
          </h2>
          <button
            type="button"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-ink"
            onClick={onClose}
            aria-label="Fechar"
          >
            <X aria-hidden="true" size={18} weight="bold" />
          </button>
        </header>

        {done ? (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5 sm:px-8">
              <p id={descriptionId} className="text-base leading-relaxed text-ink" role="status">
                Pré-inscrição registrada. Este contato fica guardado para o aviso da próxima edição. No dia,
                o notebook continua obrigatório.
              </p>
            </div>
            <footer className="flex shrink-0 justify-end border-t border-line px-6 py-4 sm:px-8 dark:border-white/15">
              <button type="button" className={`${closeButtonClass} modal-action`} onClick={onClose}>
                Fechar
              </button>
            </footer>
          </>
        ) : (
          <form className="flex min-h-0 flex-1 flex-col overflow-hidden" onSubmit={submit} noValidate>
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5 sm:px-8">
            <p id={descriptionId} className="text-sm leading-relaxed text-muted">
              Deixe seu contato. Data, local, duração e investimento ainda serão divulgados.
            </p>
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-line bg-canvas px-4 py-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Laptop aria-hidden="true" size={20} weight="bold" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">Importante</p>
                <p className="text-sm leading-relaxed text-muted">
                  Levar um notebook é obrigatório no dia do workshop.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Nome" error={errors.name} htmlFor="pre-nome">
                <input
                  id="pre-nome"
                  name="name"
                  autoComplete="name"
                  placeholder="Seu nome completo"
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  className={inputClass}
                  required
                />
              </Field>
              <Field label="Telefone" error={errors.phone} htmlFor="pre-telefone">
                <input
                  id="pre-telefone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="(00) 00000-0000"
                  value={form.phone}
                  onChange={(event) => update("phone", maskPhone(event.target.value))}
                  className={inputClass}
                  required
                />
              </Field>
            </div>
            <Field label="E-mail" error={errors.email} htmlFor="pre-email">
              <input
                id="pre-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="seu@email.com"
                value={form.email}
                onChange={(event) => update("email", event.target.value)}
                className={inputClass}
                required
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Data de nascimento" error={errors.birthDate} htmlFor="pre-nascimento">
                <input
                  id="pre-nascimento"
                  name="birthDate"
                  type="date"
                  autoComplete="bday"
                  value={form.birthDate}
                  onChange={(event) => update("birthDate", event.target.value)}
                  className={inputClass}
                  required
                />
              </Field>
              <Field label="Gênero" error={errors.gender} htmlFor="pre-genero">
                <select
                  id="pre-genero"
                  name="gender"
                  autoComplete="sex"
                  value={form.gender}
                  onChange={(event) => update("gender", event.target.value)}
                  className={inputClass}
                  required
                >
                  <option value="">Selecione</option>
                  {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <div>
              <label className={`notebook-confirm${errors.notebook ? " notebook-confirm-error" : ""}`}>
                <input
                  type="checkbox"
                  checked={form.notebook}
                  onChange={(event) => update("notebook", event.target.checked)}
                  required
                />
                <span>
                  <span className="block text-sm font-semibold text-accent">Obrigatório para enviar</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-ink">
                    Confirmo que vou levar um notebook no dia do workshop.
                  </span>
                </span>
              </label>
              {errors.notebook ? (
                <p className="mt-2 text-sm text-[#c24141]" role="alert">
                  {errors.notebook}
                </p>
              ) : null}
            </div>
            {errors.form ? (
              <p className="text-sm text-[#c24141]" role="alert">
                {errors.form}
              </p>
            ) : null}
            </div>
            </div>
            <footer className="flex shrink-0 items-center justify-end gap-3 border-t border-line px-6 py-4 sm:px-8 dark:border-white/15">
              <button type="button" className={`${closeButtonClass} modal-action`} onClick={onClose}>
                Fechar
              </button>
              <button type="submit" className="cta modal-action" disabled={pending}>
                {pending ? "Enviando..." : "Enviar"}
              </button>
            </footer>
          </form>
        )}
      </div>
    </div>
  );
}

const closeButtonClass =
  "inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full border border-line bg-transparent px-5 font-sans text-[0.95rem] font-semibold text-ink";

const inputClass =
  "form-control mt-1.5 box-border h-12 w-full rounded-xl border border-line bg-canvas px-3 text-base text-ink placeholder:text-muted";

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const area = digits.slice(0, 2);
  const number = digits.slice(2);

  if (digits.length === 0) {
    return "";
  }
  if (digits.length <= 2) {
    return `(${area}`;
  }
  if (digits.length <= 6) {
    return `(${area}) ${number}`;
  }
  if (digits.length <= 10) {
    return `(${area}) ${number.slice(0, 4)}-${number.slice(4)}`;
  }
  return `(${area}) ${number.slice(0, 5)}-${number.slice(5)}`;
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {error ? <p className="mt-1 text-sm text-[#c24141]">{error}</p> : null}
    </div>
  );
}
