import { CalendarBlank, Laptop } from "@phosphor-icons/react/ssr";
import { InterestCta } from "./interest-cta";

export function EditionSection() {
  return (
    <section aria-labelledby="interesse" className="px-5 py-4 sm:px-8">
      <div className="panel-gradient on-ink relative mx-auto flex w-full max-w-6xl flex-col gap-8 overflow-hidden rounded-[1.6rem] px-6 py-12 text-white shadow-[0_20px_50px_rgb(98_64_234/0.28)] sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-14">
        <CalendarBlank
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 text-white/15 sm:hidden"
          style={{ bottom: "-9.5rem" }}
          size={240}
          weight="duotone"
        />
        <CalendarBlank
          aria-hidden="true"
          className="pointer-events-none absolute -right-3 text-white/20 max-sm:hidden"
          style={{ bottom: "-9.5rem" }}
          size={300}
          weight="duotone"
        />
        <div className="relative z-10 max-w-2xl">
          <h2
            id="interesse"
            tabIndex={-1}
            className="max-w-xl font-display text-4xl sm:text-5xl"
          >
            Próxima edição
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/80">
            Estamos planejando a próxima edição. Data, local, duração e investimento serão
            divulgados quando estiverem definidos.
          </p>
          <p className="mt-4 flex items-start gap-2 text-base font-semibold leading-relaxed text-white">
            <Laptop aria-hidden="true" className="mt-0.5 shrink-0" size={20} weight="bold" />
            Levar um notebook é obrigatório no dia do workshop.
          </p>
        </div>
        <InterestCta className="cta cta-outline relative z-10 shrink-0 self-end sm:self-center" withIcon={false} />
      </div>
    </section>
  );
}
