import {
  BadgeCheck,
  Building,
  Coins,
  Factory,
  Landmark,
  Rocket,
} from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SiteImage from "@/components/SiteImage";

const services = [
  "Company incorporation & structuring",
  "Shareholder and joint venture agreements",
  "Contract drafting, review & negotiation",
  "Mergers, acquisitions & due diligence",
  "Regulatory & statutory compliance",
  "Corporate governance advisory",
  "Commercial disputes & arbitration",
  "Debt recovery & insolvency matters",
  "Employment & labour policies",
  "IP and trademark protection",
  "Property transactions for businesses",
];

const audiences = [
  { label: "Startups & Founders", icon: Rocket, tone: "bg-tint-warm text-[#9A5B00] ring-gold/30" },
  { label: "MSMEs", icon: Factory, tone: "bg-tint-mint text-[#0B7A70] ring-teal/25" },
  { label: "Private Limited Companies", icon: Building, tone: "bg-tint-blue text-cobalt ring-cobalt/20" },
  { label: "Public Companies", icon: Landmark, tone: "bg-[#EEEDFF] text-indigo ring-indigo/20" },
  { label: "NBFCs & Financial Institutions", icon: Coins, tone: "bg-[#FFEFEC] text-[#C2412F] ring-coral/25" },
  { label: "Real Estate Developers", icon: BadgeCheck, tone: "bg-tint-warm text-[#9A5B00] ring-gold/30" },
];

export default function CorporateFocus() {
  return (
    <section id="corporate" aria-labelledby="corporate-title" className="relative px-3 sm:px-5">
      <div className="relative isolate mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] bg-linear-to-br from-tint-blue via-[#F7F9FF] to-tint-mint py-20 sm:rounded-[2.5rem] sm:py-24 lg:py-28">
        <span aria-hidden className="blob -top-32 -left-24 -z-10 size-96 bg-cobalt/12" />
        <span aria-hidden className="blob -right-20 -bottom-24 -z-10 size-96 bg-gold/20" />

        <div className="container-site">
          <div className="grid items-end gap-10 lg:grid-cols-2 lg:gap-16">
            <SectionHeading
              id="corporate-title"
              eyebrow="Corporate Focus"
              title={
                <>
                  Legal Support for <span className="text-gradient">Every Stage</span> of Your Business
                </>
              }
              intro="From incorporation to expansion, financing to disputes, businesses need counsel that understands the commercial reality behind each decision. The practice offers end-to-end support so that legal questions are answered before they become obstacles."
            />
            <Reveal delay={0.1} className="relative">
              <span aria-hidden className="absolute -inset-3 -z-10 rounded-[2rem] bg-linear-to-br from-gold/40 via-transparent to-cobalt/30 blur-xl" />
              <SiteImage
                name="corporate-boardroom"
                alt="Business team and a lawyer in discussion around a boardroom table"
                sizes="(min-width: 1024px) 600px, 92vw"
                className="rounded-[1.75rem] shadow-[0_30px_60px_-28px_rgba(15,27,77,0.45)] ring-6 ring-white"
              />
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ul className="mt-14 grid gap-x-10 gap-y-1 rounded-[1.75rem] bg-white/80 p-4 shadow-[0_24px_60px_-36px_rgba(15,27,77,0.35)] ring-1 ring-navy/5 backdrop-blur sm:p-8 md:grid-cols-2">
              {services.map((service, index) => (
                <li
                  key={service}
                  className="flex items-center gap-4 border-b border-dashed border-navy/10 py-3.5 text-[16px] font-medium text-navy last:border-0 md:[&:nth-last-child(2):nth-child(odd)]:border-0"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-linear-to-br from-cobalt to-indigo text-xs font-bold text-white tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {service}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="mt-14">
            <h3 className="text-center font-sans text-sm font-semibold tracking-[0.2em] text-body uppercase">
              Who we work with
            </h3>
            <ul className="mt-6 flex flex-wrap justify-center gap-3">
              {audiences.map(({ label, icon: Icon, tone }) => (
                <li
                  key={label}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold ring-1 transition hover:-translate-y-0.5 ${tone}`}
                >
                  <Icon className="size-4" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
