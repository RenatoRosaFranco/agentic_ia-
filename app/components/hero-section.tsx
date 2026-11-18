import { ArrowDown, MapPin } from "@phosphor-icons/react/ssr";
import { InterestCta } from "./interest-cta";
import { ReviewDiagram } from "./review-diagram";

export function HeroSection() {
  return (
    <section aria-labelledby="hero-titulo" className="px-5 pt-8 pb-8 sm:px-8 sm:pt-10 lg:pt-12 lg:pb-10">
      <div className="mx-auto grid w-full max-w-6xl items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.8fr)] lg:gap-16">
        <div className="rise">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-semibold text-ink shadow-[0_8px_24px_rgb(80_50_170/0.06)]">
            <MapPin aria-hidden="true" className="text-accent" size={18} weight="regular" />
            Workshop presencial de IA agêntica
          </p>
          <h1
            id="hero-titulo"
            className="mt-6 font-display text-[2.2rem] text-ink sm:text-5xl lg:text-[3.25rem]"
          >
            <span className="block">Tem uma tarefa que se repete toda semana?</span>
            <span className="mt-1 block">
              Vamos transformá-la em <span className="gradient-text">um agente de IA.</span>
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Em um encontro prático, você vai escolher uma tarefa da sua rotina, desenhar como a IA
            pode ajudar e montar um protótipo para testar — mesmo sem saber programar.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
            <InterestCta />
            <a href="#como-funciona" className="text-link">
              Ver o que vou fazer
              <ArrowDown aria-hidden="true" size={18} weight="bold" />
            </a>
          </div>
        </div>
        <ReviewDiagram />
      </div>
    </section>
  );
}
