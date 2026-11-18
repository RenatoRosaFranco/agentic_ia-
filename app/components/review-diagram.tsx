import { ArrowsClockwise, Flask, SlidersHorizontal } from "@phosphor-icons/react/ssr";
import rows from "@/app/data/review.json";

const reviewIcons = {
  "arrows-clockwise": ArrowsClockwise,
  "sliders-horizontal": SlidersHorizontal,
  flask: Flask,
} as const;

type ReviewIconName = keyof typeof reviewIcons;

function isReviewIconName(icon: string): icon is ReviewIconName {
  return icon in reviewIcons;
}

export function ReviewDiagram() {
  return (
    <figure className="rise rise-delay relative mx-auto w-full max-w-lg lg:max-w-none lg:pt-6 lg:pr-2 lg:pb-12">
      <div className="relative z-20 mb-3 ml-auto w-fit rounded-full border border-edge bg-surface px-4 py-2 text-sm font-semibold text-ink shadow-[0_14px_32px_rgb(98_64_234/0.16)] lg:absolute lg:top-0 lg:right-0 lg:mb-0">
        Protótipo para testar
      </div>
      <div className="relative z-10 rounded-[1.6rem] border border-edge bg-surface p-5 shadow-[0_24px_60px_rgb(80_50_170/0.14)] sm:p-6 lg:mt-8 lg:pb-24">
        <p className="font-sans text-lg font-semibold text-ink">Da tarefa ao teste</p>
        <ol className="mt-4 space-y-3">
          {rows.map((row) => {
            if (!isReviewIconName(row.icon)) {
              return null;
            }

            const Icon = reviewIcons[row.icon];

            return (
              <li
                key={row.label}
                className="grid grid-cols-[2.5rem_1fr] items-center gap-3 rounded-2xl bg-canvas/80 px-3 py-3"
              >
                <span className="icon-mark" aria-hidden="true">
                  <Icon size={20} weight="regular" />
                </span>
                <div>
                  <p className="font-semibold text-ink">{row.label}</p>
                  <p className="text-sm leading-snug text-muted">{row.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="relative z-20 mt-4 max-w-[15rem] rounded-2xl border border-edge bg-surface px-4 py-3 shadow-[0_16px_40px_rgb(46_200_192/0.22)] lg:absolute lg:bottom-0 lg:left-0 lg:mt-0">
        <p className="text-sm font-semibold text-accent">A pessoa confere</p>
        <p className="mt-1 text-sm leading-snug text-muted">
          A IA só avança dentro do que foi combinado.
        </p>
      </div>
    </figure>
  );
}
