import { WhatsappLogo } from "@phosphor-icons/react/ssr";
import { whatsappLinks } from "./links";

export function WhatsappSection() {
  return (
    <section aria-labelledby="whatsapp" className="px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto w-full max-w-6xl">
        <h2 id="whatsapp" tabIndex={-1} className="font-display text-4xl text-ink sm:text-5xl">
          No WhatsApp
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          Entre no canal para receber os avisos da próxima edição ou no grupo para conversar com
          quem também quer participar.
        </p>
        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          {whatsappLinks.map((item) => (
            <article
              key={item.href}
              className="flex flex-col gap-3 rounded-[1.4rem] border border-edge bg-surface px-5 py-4 shadow-[0_16px_40px_rgb(80_50_170/0.06)] sm:flex-row sm:items-center sm:gap-4"
            >
              <span className="icon-mark shrink-0" aria-hidden="true">
                <WhatsappLogo size={22} weight="fill" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-xl leading-snug font-semibold text-ink">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
              <a
                className="cta shrink-0 self-start sm:self-center"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
