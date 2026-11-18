import { validatePreRegistration } from "@/app/components/pre-registration-schema";
import { appendPreRegistration, SheetConfigError } from "@/app/lib/google-sheet";

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

  try {
    await appendPreRegistration(result.value);
  } catch (error) {
    const message =
      error instanceof SheetConfigError
        ? "A planilha do Google ainda não está configurada."
        : "Não foi possível registrar agora. Tente de novo.";

    return Response.json({ ok: false, errors: { form: message } }, { status: 500 });
  }

  return Response.json({ ok: true });
}
