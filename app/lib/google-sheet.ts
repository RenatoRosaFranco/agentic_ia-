import { createSign } from "node:crypto";
import { genderOptions, type PreRegistrationInput } from "@/app/components/pre-registration-schema";

const sheetsScope = "https://www.googleapis.com/auth/spreadsheets";
const tokenUrl = "https://oauth2.googleapis.com/token";
const headers = [
  "Nome",
  "E-mail",
  "Telefone",
  "Data de nascimento",
  "Gênero",
  "Notebook",
  "Registrado em",
];

export class SheetConfigError extends Error {}

type TokenCache = {
  value: string;
  expiresAt: number;
};

let tokenCache: TokenCache | null = null;

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new SheetConfigError();
  }
  return value;
}

function privateKey() {
  return requiredEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");
}

function sheetId() {
  const id = requiredEnv("GOOGLE_SHEET_ID");
  if (!/^[a-zA-Z0-9-_]+$/.test(id)) {
    throw new SheetConfigError();
  }
  return id;
}

function signServiceJwt(email: string, key: string) {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({
      iss: email,
      scope: sheetsScope,
      aud: tokenUrl,
      iat: now,
      exp: now + 3600,
    }),
  ).toString("base64url");
  const unsigned = `${header}.${payload}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  return `${unsigned}.${signer.sign(key).toString("base64url")}`;
}

async function accessToken() {
  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt > now) {
    return tokenCache.value;
  }

  const assertion = signServiceJwt(requiredEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL"), privateKey());
  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!response.ok) {
    throw new Error("Falha ao autenticar na planilha.");
  }

  const payload = (await response.json()) as { access_token?: string; expires_in?: number };
  if (!payload.access_token) {
    throw new Error("Falha ao autenticar na planilha.");
  }

  tokenCache = {
    value: payload.access_token,
    expiresAt: now + Math.max((payload.expires_in ?? 3600) - 60, 30) * 1000,
  };
  return payload.access_token;
}

async function sheetsFetch(path: string, init: RequestInit) {
  const token = await accessToken();
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId()}${path}`, {
    ...init,
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
      ...init.headers,
    },
  });

  if (!response.ok) {
    throw new Error("Falha ao gravar na planilha.");
  }

  return response;
}

function row(record: PreRegistrationInput, createdAt: string) {
  const gender = genderOptions.find((option) => option.value === record.gender)?.label ?? record.gender;
  return [record.name, record.email, record.phone, record.birthDate, gender, "Sim", createdAt];
}

export async function appendPreRegistration(record: PreRegistrationInput) {
  const createdAt = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const current = await sheetsFetch("/values/A1:G1", { method: "GET" });
  const body = (await current.json()) as { values?: string[][] };
  const hasHeader = body.values?.[0]?.[0] === headers[0];
  const values = hasHeader ? [row(record, createdAt)] : [headers, row(record, createdAt)];

  await sheetsFetch("/values/A:G:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS", {
    method: "POST",
    body: JSON.stringify({ values }),
  });
}
