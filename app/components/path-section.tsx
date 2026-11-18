import { ArrowsClockwise, Flask, SlidersHorizontal } from "@phosphor-icons/react/ssr";
import steps from "@/app/data/path.json";

const pathIcons = {
  "arrows-clockwise": ArrowsClockwise,
  "sliders-horizontal": SlidersHorizontal,
  flask: Flask,
} as const;

type PathIconName = keyof typeof pathIcons;

function isPathIconName(icon: string): icon is PathIconName {
  return icon in pathIcons;
}

export function ActivitiesSection() {
  return (
    <section aria-labelledby="como-funciona" className="px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto w-full max-w-6xl">
        <h2
          id="como-funciona"
          tabIndex={-1}
          className="max-w-xl font-display text-4xl text-ink sm:text-5xl"
        >
          O que você vai fazer
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Três momentos de um só encontro, em volta de uma tarefa sua.
        </p>
        <ol className="mt-8 grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => {
            if (!isPathIconName(step.icon)) {
              return null;
            }

            const Icon = pathIcons[step.icon];

            return (
              <li key={step.title} className="lift rounded-[1.4rem] border border-edge bg-surface p-6 shadow-[0_16px_40px_rgb(80_50_170/0.06)]">
                <div className="flex items-center gap-3">
                  <span className="icon-mark" aria-hidden="true">
                    <Icon size={22} weight="regular" />
                  </span>
                  <span className="font-sans text-sm font-semibold text-accent">0{index + 1}</span>
                </div>
                <h3 className="mt-5 font-display text-2xl leading-tight font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
