const items = [
  "Corporate Law",
  "Contracts",
  "Compliance",
  "Arbitration",
  "Litigation",
  "Intellectual Property",
  "Real Estate",
  "Employment",
  "Recovery",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 font-serif text-xl font-semibold whitespace-nowrap text-white sm:px-8 sm:text-2xl">
            {item}
          </span>
          <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-gold" aria-hidden="true">
            <path fill="currentColor" d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
          </svg>
        </li>
      ))}
    </ul>
  );
}

/** Infinitely scrolling band of practice keywords. */
export default function Marquee() {
  return (
    <section aria-label="Areas of practice" className="relative overflow-hidden bg-linear-to-r from-cobalt via-[#3446EE] to-indigo py-5 sm:py-6">
      <div className="group flex w-max animate-marquee hover:[animation-play-state:paused]">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
