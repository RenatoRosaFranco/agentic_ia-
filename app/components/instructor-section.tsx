import { GithubLogo, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react/ssr";
import { instructorLinks } from "./links";

const instructorIcons = {
  instagram: InstagramLogo,
  linkedin: LinkedinLogo,
  github: GithubLogo,
} as const;

export function InstructorSection() {
  return (
    <section aria-labelledby="piloto" className="px-5 py-4 sm:px-8">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-[5.5rem_1fr] items-center gap-x-4 gap-y-2 rounded-[1.6rem] border border-edge bg-surface px-6 py-4 shadow-[0_16px_40px_rgb(80_50_170/0.06)] sm:grid-cols-[7rem_1fr] sm:gap-x-6 sm:px-10 sm:py-5">
        <img
          src="/instrutor.jpg"
          alt="Renato Rosa Franco"
          width={400}
          height={400}
          className="col-start-1 row-start-1 size-[5.5rem] rounded-2xl object-cover sm:row-span-4 sm:size-28"
        />
        <h2 id="piloto" tabIndex={-1} className="col-start-2 font-display text-2xl text-ink sm:text-3xl">
          Quem é o piloto
        </h2>
        <p className="col-start-2 text-sm font-semibold text-ink sm:text-base">
          Renato Rosa Franco
          <span className="text-accent"> · Lead AI Engineer · Instrutor do Workshop</span>
        </p>
        <p className="col-span-2 text-sm leading-relaxed text-muted sm:col-start-2">
          Senior Software Engineer na <strong className="font-bold text-ink">Skydropx</strong>, com
          passagens por <strong className="font-bold text-ink">Teleport.OTD</strong>,{" "}
          <strong className="font-bold text-ink">Grafeno</strong>,{" "}
          <strong className="font-bold text-ink">Repassa</strong>,{" "}
          <strong className="font-bold text-ink">Dispatch</strong> e{" "}
          <strong className="font-bold text-ink">Funding Circle</strong>. Natural de São Paulo,
          conduz o encontro presencial da Tech Missões em Cerro Largo.
        </p>
        <ul className="col-span-2 flex gap-2 sm:col-start-2" aria-label="Redes do instrutor">
            {instructorLinks.map((item) => {
              const Icon = instructorIcons[item.icon];

              return (
                <li key={item.href}>
                  <a
                    className="inline-flex size-9 items-center justify-center rounded-full border border-accent bg-transparent text-accent transition hover:border-[#6240ea] hover:bg-[#6240ea] hover:text-white"
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                  >
                    <Icon aria-hidden="true" size={16} weight="fill" />
                  </a>
                </li>
              );
            })}
          </ul>
      </div>
    </section>
  );
}
