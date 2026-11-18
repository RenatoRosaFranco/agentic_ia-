import { Compass, Storefront, Users, Wrench } from "@phosphor-icons/react/ssr";
import audience from "@/app/data/audience.json";

const audienceIcons = {
  storefront: Storefront,
  users: Users,
  wrench: Wrench,
  compass: Compass,
} as const;

type AudienceIconName = keyof typeof audienceIcons;

function isAudienceIconName(icon: string): icon is AudienceIconName {
  return icon in audienceIcons;
}

export function AudienceSection() {
  return (
    <section aria-labelledby="para-quem" className="px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto w-full max-w-6xl">
        <h2
          id="para-quem"
          tabIndex={-1}
          className="max-w-xl font-display text-4xl text-ink sm:text-5xl"
        >
          Para quem é
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Para quem tem uma rotina de trabalho e quer testar a IA nela. Programar não é requisito.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {audience.map((person) => {
            if (!isAudienceIconName(person.icon)) {
              return null;
            }

            const Icon = audienceIcons[person.icon];

            return (
              <li key={person.title} className="lift rounded-[1.4rem] border border-edge bg-surface p-6 shadow-[0_16px_40px_rgb(80_50_170/0.06)] sm:p-7">
                <span className="icon-mark" aria-hidden="true">
                  <Icon size={22} weight="regular" />
                </span>
                <h3 className="mt-5 font-display text-2xl leading-tight font-semibold text-ink">
                  {person.title}
                </h3>
                <p className="mt-2 max-w-[42ch] leading-relaxed text-muted">{person.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
