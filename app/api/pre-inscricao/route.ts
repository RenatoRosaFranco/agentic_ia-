import { validatePreRegistration } from "@/app/components/pre-registration-schema";
import { appendPreRegistration, SheetConfigError } from "@/app/lib/google-sheet";
import { RecaptchaConfigError, verifyRecaptcha } from "@/app/lib/recaptcha";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { ok: false, errors: { form: "Não foi possível ler os dados." } },
      { status: 400 },
    );
  }

  const result = validatePreRegistration(payload);

  if (!result.ok) {
    return Response.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  const recaptchaToken =
    payload && typeof payload === "object" && "recaptchaToken" in payload && typeof payload.recaptchaToken === "string"
      ? payload.recaptchaToken
      : "";

  try {
    const human = await verifyRecaptcha(recaptchaToken);
    if (!human) {
      return Response.json(
        { ok: false, errors: { form: "Não foi possível confirmar que você não é um robô. Tente de novo." } },
        { status: 400 },
      );
    }

    await appendPreRegistration(result.value);
  } catch (error) {
    const message =
      error instanceof RecaptchaConfigError
        ? "A verificação anti-robô ainda não está configurada."
        : error instanceof SheetConfigError
          ? "A planilha do Google ainda não está configurada."
          : "Não foi possível registrar agora. Tente de novo.";

    return Response.json({ ok: false, errors: { form: message } }, { status: 500 });
  }

  return Response.json({ ok: true });
}
