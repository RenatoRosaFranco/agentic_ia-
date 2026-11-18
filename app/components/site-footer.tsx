import { FacebookLogo, InstagramLogo, TiktokLogo } from "@phosphor-icons/react/ssr";
import { InterestCta } from "./interest-cta";
import { sectionLinks, socialLinks } from "./links";

const socialIcons = {
  facebook: FacebookLogo,
  instagram: InstagramLogo,
  tiktok: TiktokLogo,
} as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 pt-16 pb-14 sm:px-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(12rem,0.7fr)_minmax(16rem,0.85fr)] lg:gap-16 lg:pt-20">
        <div>
          <a href="#topo" className="font-sans text-2xl font-semibold text-ink">
            IA Agêntica na Prática
          </a>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-muted">
            Encontro presencial para transformar uma tarefa repetitiva em um protótipo de agente.
          </p>
          <ul className="mt-8 flex flex-wrap gap-3" aria-label="Redes sociais">
            {socialLinks.map((item) => {
              const Icon = socialIcons[item.icon];

              return (
                <li key={item.href}>
                  <a
                    className="inline-flex size-11 items-center justify-center rounded-full border border-accent bg-transparent text-accent transition hover:border-[#6240ea] hover:bg-[#6240ea] hover:text-white"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                  >
                    <Icon aria-hidden="true" size={20} weight="fill" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <nav aria-label="Rodapé">
          <p className="font-sans text-sm font-semibold tracking-wide text-ink">Nesta página</p>
          <ul className="mt-5 flex flex-col gap-3">
            {sectionLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="nav-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-sans text-sm font-semibold tracking-wide text-ink">Próxima edição</p>
          <p className="mt-5 max-w-xs leading-relaxed text-muted">
            Data, local, duração e investimento serão divulgados quando estiverem definidos.
          </p>
          <div className="mt-6">
            <InterestCta />
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>Projeto piloto da Tech Missões</p>
          <p>Cerro Largo, Rio Grande do Sul</p>
        </div>
      </div>
    </footer>
  );
}
