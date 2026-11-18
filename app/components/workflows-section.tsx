import { ChatText, MagnifyingGlass, NotePencil, PaperPlaneTilt } from "@phosphor-icons/react/ssr";

const sequence = [
  {
    label: "Pergunta do cliente",
    text: "Tem a torneira de pia e o anel de vedação?",
    icon: ChatText,
    highlight: false,
  },
  {
    label: "Consulta",
    text: "O agente olha a lista de produtos que a loja passou.",
    icon: MagnifyingGlass,
    highlight: false,
  },
  {
    label: "Rascunho",
    text: "A torneira consta. O anel precisa ser conferido na gaveta.",
    icon: NotePencil,
    highlight: true,
  },
  {
    label: "Quem atende",
    text: "Confere o estoque e só então envia a resposta.",
    icon: PaperPlaneTilt,
    highlight: false,
  },
] as const;

export function ExampleSection() {
  return (
    <section aria-labelledby="exemplo" className="px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto grid w-full max-w-6xl items-start gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(20rem,1fr)] lg:gap-16">
        <div>
          <h2
            id="exemplo"
            tabIndex={-1}
            className="max-w-xl font-display text-4xl text-ink sm:text-5xl"
          >
            Um exemplo prático
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            Uma loja recebe, várias vezes ao dia, a pergunta se um produto está disponível.
          </p>
        </div>
        <figure>
          <ol className="overflow-hidden rounded-[1.4rem] border border-edge bg-surface shadow-[0_18px_44px_rgb(80_50_170/0.08)]">
            {sequence.map((step, index) => {
              const Icon = step.icon;

              return (
                <li
                  key={step.label}
                  className={`grid grid-cols-[2.75rem_1fr] items-center gap-4 px-5 py-4 ${
                    index > 0 ? "border-t border-line" : ""
                  } ${step.highlight ? "bg-[linear-gradient(90deg,var(--color-accent-soft),#e7fbf8)] dark:bg-[#222226]" : ""}`}
                >
                  <span className="icon-mark" aria-hidden="true">
                    <Icon size={20} weight="regular" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{step.label}</p>
                    <p className="mt-1 leading-snug text-muted">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <figcaption className="mt-3 text-sm leading-relaxed text-muted">
            Exemplo ilustrativo. Não é uma loja nem um cliente real.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
