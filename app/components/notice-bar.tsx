import { CalendarBlank, GraduationCap, MapPin } from "@phosphor-icons/react/ssr";

const facts = [
  {
    id: "lugar",
    icon: MapPin,
    text: "Encontro presencial em Cerro Largo, Rio Grande do Sul",
  },
  {
    id: "codigo",
    icon: GraduationCap,
    text: "Dá para participar sem saber programar",
  },
  {
    id: "edicao",
    icon: CalendarBlank,
    text: "A próxima edição ainda está em planejamento",
  },
] as const;

const copies = [0, 1, 2, 3, 4, 5] as const;

function NoticeGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="info-group" aria-hidden={hidden || undefined} aria-label={hidden ? undefined : "Informações confirmadas"}>
      {copies.map((copy) =>
        facts.map((item) => {
          const Mark = item.icon;

          return (
            <li key={`${item.id}-${copy}`}>
              <Mark aria-hidden="true" className="info-mark" size={16} weight="bold" />
              <span>{item.text}</span>
            </li>
          );
        }),
      )}
    </ul>
  );
}

export function NoticeBar() {
  return (
    <div className="info-row">
      <div className="info-track">
        <NoticeGroup />
        <NoticeGroup hidden />
      </div>
    </div>
  );
}
