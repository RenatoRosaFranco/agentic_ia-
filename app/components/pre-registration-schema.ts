export const genderOptions = [
  { value: "masculino", label: "Masculino" },
  { value: "feminino", label: "Feminino" },
  { value: "nao-informar", label: "Prefiro não informar" },
] as const;

export type GenderValue = (typeof genderOptions)[number]["value"];

export type PreRegistrationInput = {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: GenderValue;
  notebook: true;
};

export type PreRegistrationErrors = Partial<
  Record<"name" | "email" | "phone" | "birthDate" | "gender" | "notebook" | "form", string>
>;

const genderValues = new Set<string>(genderOptions.map((option) => option.value));

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isRealDate(iso: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    return false;
  }

  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function todayIso() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function validatePreRegistration(
  input: unknown,
): { ok: true; value: PreRegistrationInput } | { ok: false; errors: PreRegistrationErrors } {
  const source = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const errors: PreRegistrationErrors = {};
  const name = text(source.name);
  const email = text(source.email);
  const phone = text(source.phone);
  const birthDate = text(source.birthDate);
  const gender = text(source.gender);
  const digits = phone.replace(/\D/g, "");

  if (name.length < 2) {
    errors.name = "Informe seu nome.";
  } else if (name.length > 120) {
    errors.name = "Use no máximo 120 caracteres.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160) {
    errors.email = "Informe um e-mail válido.";
  }

  if (digits.length < 10 || digits.length > 13) {
    errors.phone = "Informe um telefone com DDD.";
  }

  if (!isRealDate(birthDate) || birthDate < "1900-01-01" || birthDate > todayIso()) {
    errors.birthDate = "Informe uma data de nascimento válida.";
  }

  if (!genderValues.has(gender)) {
    errors.gender = "Selecione uma opção.";
  }

  if (source.notebook !== true) {
    errors.notebook = "Confirme que vai levar um notebook. Ele é obrigatório no dia do workshop.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      name,
      email,
      phone,
      birthDate,
      gender: gender as GenderValue,
      notebook: true,
    },
  };
}
