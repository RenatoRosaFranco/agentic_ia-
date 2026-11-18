import { Buildings } from "@phosphor-icons/react/ssr";

export function AboutSection() {
  return (
    <section aria-labelledby="sobre" className="px-5 pt-2 pb-8 sm:px-8 sm:pb-10">
      <div className="mx-auto w-full max-w-6xl rounded-[1.6rem] border border-edge bg-surface px-6 py-10 shadow-[0_16px_40px_rgb(80_50_170/0.06)] sm:px-10 sm:py-12">
        <span className="icon-mark" aria-hidden="true">
          <Buildings size={22} weight="regular" />
        </span>
        <h2
          id="sobre"
          tabIndex={-1}
          className="mt-6 max-w-xl font-display text-4xl text-ink sm:text-5xl"
        >
          Sobre o workshop
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          IA Agêntica na Prática é um projeto piloto da Tech Missões.
        </p>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">
          Um encontro presencial em Cerro Largo, Rio Grande do Sul, para trabalhar uma rotina de verdade.
        </p>
      </div>
    </section>
  );
}
