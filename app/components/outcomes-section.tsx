import { Checks, Cube, FlowArrow } from "@phosphor-icons/react/ssr";
import takeaways from "@/app/data/outcomes.json";

const outcomeIcons = {
  "flow-arrow": FlowArrow,
  cube: Cube,
  checks: Checks,
} as const;

type OutcomeIconName = keyof typeof outcomeIcons;

function isOutcomeIconName(icon: string): icon is OutcomeIconName {
  return icon in outcomeIcons;
}

export function TakeawaysSection() {
  return (
    <section aria-labelledby="criar" className="px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto w-full max-w-6xl">
        <h2
          id="criar"
          tabIndex={-1}
          className="max-w-xl font-display text-4xl text-ink sm:text-5xl"
        >
          O que você leva
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Material para continuar testando, não um sistema publicado.
        </p>
        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          {takeaways.map((item) => {
            if (!isOutcomeIconName(item.icon)) {
              return null;
            }

            const Icon = outcomeIcons[item.icon];

            return (
              <li
                key={item.title}
                className={
                  item.accent
                    ? "panel-gradient flex flex-col rounded-[1.4rem] p-7 shadow-[0_18px_40px_rgb(98_64_234/0.25)]"
                    : "lift flex flex-col rounded-[1.4rem] border border-edge bg-surface p-7 shadow-[0_16px_40px_rgb(80_50_170/0.06)]"
                }
              >
                <span className={item.accent ? "icon-mark icon-mark-inverse" : "icon-mark"} aria-hidden="true">
                  <Icon size={22} weight="regular" />
                </span>
                <h3 className={`mt-6 font-display text-2xl leading-tight font-semibold ${item.accent ? "text-white" : "text-ink"}`}>
                  {item.title}
                </h3>
                <p className={`mt-3 leading-relaxed ${item.accent ? "text-white/85" : "text-muted"}`}>{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
