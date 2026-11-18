import { ChatCircle, Lightbulb, MapPin, Rocket } from "@phosphor-icons/react/ssr";
import questions from "@/app/data/faq.json";

const faqIcons = {
  "chat-circle": ChatCircle,
  lightbulb: Lightbulb,
  rocket: Rocket,
  "map-pin": MapPin,
} as const;

type FaqIconName = keyof typeof faqIcons;

function isFaqIconName(icon: string): icon is FaqIconName {
  return icon in faqIcons;
}

export function FaqSection() {
  return (
    <section aria-labelledby="duvidas" className="px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto w-full max-w-6xl">
        <h2
          id="duvidas"
          tabIndex={-1}
          className="font-display text-4xl text-ink sm:text-5xl"
        >
          Dúvidas frequentes
        </h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {questions.map((item) => {
            if (!isFaqIconName(item.icon)) {
              return null;
            }

            const Icon = faqIcons[item.icon];

            return (
              <article key={item.question} className="lift rounded-[1.4rem] border border-edge bg-surface p-6 shadow-[0_16px_40px_rgb(80_50_170/0.06)] sm:p-7">
                <span className="icon-mark" aria-hidden="true">
                  <Icon size={22} weight="regular" />
                </span>
                <h3 className="mt-5 font-display text-2xl leading-snug font-semibold text-ink">
                  {item.question}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{item.answer}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
