import { Briefcase, GraduationCap, Landmark, Lock } from "lucide-react";
import ArrowPill from "@/components/ArrowPill";
import Reveal from "@/components/motion/Reveal";
import SiteImage from "@/components/SiteImage";
import { siteConfig } from "@/config/site";

const chips = [
  { label: "High Court & Supreme Court practice", icon: Landmark, tile: "bg-tint-blue text-cobalt" },
  { label: "Corporate-first advisory", icon: Briefcase, tile: "bg-tint-warm text-gold-deep" },
  { label: "Confidential & transparent", icon: Lock, tile: "bg-tint-mint text-teal" },
];

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-linear-to-b from-tint-blue via-white to-white pt-[calc(var(--header-h)+3rem)] pb-24 lg:pt-[calc(var(--header-h)+4.5rem)] lg:pb-32"
    >
      {/* Decorative background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <span className="blob -top-40 -left-40 size-[34rem] bg-cobalt/12" />
        <span className="blob top-20 -right-32 size-[30rem] bg-gold/20" />
        <span className="blob bottom-0 left-1/3 size-[26rem] bg-teal/10" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(35,71,245,0.09)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent_75%)] bg-[size:26px_26px]" />
      </div>

      <p
        aria-hidden
        className="pointer-events-none absolute top-[calc(var(--header-h)+0.5rem)] left-1/2 -z-10 -translate-x-1/2 font-serif text-[clamp(4.5rem,17vw,15.5rem)] leading-none font-bold tracking-tight whitespace-nowrap text-cobalt/[0.05] select-none"
      >
        ADVOCATE
      </p>

      <div className="container-site grid items-center gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <div className="relative z-10 max-w-2xl">
          <Reveal>
            <span className="eyebrow">
              <span className="size-1.5 rounded-full bg-linear-to-r from-gold to-gold-deep" aria-hidden />
              {siteConfig.tagline}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 id="hero-title" className="heading-xl mt-7">
              Legal Counsel That <span className="text-gradient">Moves Your Business</span> Forward
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed sm:text-xl">
              Corporate advisory, contracts, compliance and dispute resolution, handled with precision and clarity.
              Practical counsel for businesses, founders and individuals at every stage.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#contact" className="btn-primary group pr-3!">
              Schedule a Consultation
              <ArrowPill />
            </a>
            <a href="#practice-areas" className="btn-outline group pr-3!">
              Explore Practice Areas
              <ArrowPill tone="dark" />
            </a>
          </Reveal>

          <Reveal delay={0.32}>
            <ul className="mt-10 flex flex-wrap gap-3" aria-label="Practice highlights">
              {chips.map(({ label, icon: Icon, tile }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2.5 rounded-full bg-white/90 py-1.5 pr-4 pl-1.5 text-sm font-medium text-navy shadow-sm ring-1 ring-navy/[0.07]"
                >
                  <span className={`grid size-7 place-items-center rounded-full ${tile}`}>
                    <Icon className="size-3.5" strokeWidth={2.2} aria-hidden />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15} y={40} className="relative mx-auto w-full max-w-[440px] lg:mr-10 lg:ml-auto">
          <span aria-hidden className="blob -top-10 -right-10 size-72 bg-gold/35" />
          <span aria-hidden className="blob -bottom-10 -left-12 size-72 bg-cobalt/25" />
          <span aria-hidden className="blob top-1/3 -right-16 size-48 bg-teal/25" />

          {/* Offset gold outline */}
          <span aria-hidden className="arch absolute inset-0 translate-x-4 translate-y-4 border-2 border-gold sm:translate-x-5 sm:translate-y-5" />

          {/*
            AI-generated placeholder portrait. To use the advocate's real photo,
            drop a file named hero-main.jpg (or .png / .webp) into public/images.
          */}
          <SiteImage
            name="hero-main"
            alt="Advocate in a navy suit standing in a bright law chamber lined with books"
            preload
            sizes="(min-width: 1024px) 440px, (min-width: 640px) 440px, 90vw"
            className="arch shadow-[0_40px_80px_-30px_rgba(15,27,77,0.45)] ring-8 ring-white"
            imageClassName="object-[50%_20%]"
          />

          <div className="absolute top-14 -left-4 animate-float sm:-left-12">
            <div className="flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_20px_40px_-18px_rgba(15,27,77,0.4)] ring-1 ring-navy/5 backdrop-blur">
              <span className="grid size-10 place-items-center rounded-xl bg-tint-warm text-gold-deep">
                <GraduationCap className="size-5" aria-hidden />
              </span>
              <span className="leading-tight">
                <span className="block text-[11px] font-semibold tracking-[0.14em] text-body uppercase">Qualified</span>
                <span className="block font-serif text-base font-bold text-navy">{siteConfig.qualifications}</span>
              </span>
            </div>
          </div>

          <div className="absolute -right-3 bottom-24 animate-float-delayed sm:-right-8">
            <div className="flex max-w-[15rem] items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-[0_20px_40px_-18px_rgba(15,27,77,0.4)] ring-1 ring-navy/5 backdrop-blur">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-linear-to-br from-cobalt to-indigo text-white">
                <Briefcase className="size-5" aria-hidden />
              </span>
              <span className="text-sm leading-snug font-semibold text-navy">Corporate &amp; Commercial Advisory</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
