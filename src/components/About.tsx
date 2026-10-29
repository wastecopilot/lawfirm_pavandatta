import { Check } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import SiteImage from "@/components/SiteImage";
import { siteConfig } from "@/config/site";

const credentials = [
  siteConfig.qualifications,
  "Practising before the High Court",
  "Practising before the Supreme Court",
  "Corporate & commercial advisory",
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section relative overflow-hidden">
      <span aria-hidden className="blob top-40 -right-40 size-[28rem] bg-tint-mint" />

      <div className="container-site relative grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal y={40} className="relative mx-auto w-full max-w-[420px] lg:mx-0">
          <span aria-hidden className="blob -top-8 -left-10 size-64 bg-teal/25" />
          <span aria-hidden className="blob -right-8 -bottom-10 size-64 bg-gold/30" />
          <span aria-hidden className="arch absolute inset-0 -translate-x-4 translate-y-4 border-2 border-gold sm:-translate-x-5 sm:translate-y-5" />
          <SiteImage
            name="about-office"
            alt="Bright law library with shelves of books and brass scales of justice on a desk"
            sizes="(min-width: 1024px) 420px, 90vw"
            className="arch shadow-[0_40px_80px_-30px_rgba(15,27,77,0.4)] ring-8 ring-white"
          />
          <div className="absolute -right-2 bottom-10 rounded-2xl bg-white/95 px-5 py-4 shadow-[0_20px_40px_-18px_rgba(15,27,77,0.4)] ring-1 ring-navy/5 sm:-right-10">
            <p className="font-serif text-lg leading-tight font-bold text-navy">Ethics first.</p>
            <p className="mt-1 text-sm">Preparation always.</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow">
              <span className="size-1.5 rounded-full bg-linear-to-r from-gold to-gold-deep" aria-hidden />
              About the Advocate
            </span>
            <h2 id="about-title" className="heading-lg mt-5">
              Meet <span className="text-gradient">{siteConfig.name}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-7 space-y-5 text-[17px] leading-relaxed">
            <p>
              {siteConfig.name} is an advocate and attorney at law holding a {siteConfig.qualifications}, practising before
              the High Court and the Supreme Court. A grounding in science shapes the way every matter is handled: facts
              are tested, documents are read closely and each conclusion is checked against the record.
            </p>
            <p>
              The practice is built around corporate and commercial work, advising companies, founders and financial
              institutions on transactions, contracts, compliance and disputes, while also representing individuals in
              civil, criminal, property and family matters.
            </p>
            <p>
              Every engagement rests on the same principles: thorough preparation, uncompromising ethics, strict
              confidentiality and advice in plain language, so that clients understand where they stand, what their
              options are and what comes next.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <ul className="mt-9 grid gap-3 sm:grid-cols-2" aria-label="Credentials">
              {credentials.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-tint-blue/70 px-4 py-3.5 font-medium text-navy ring-1 ring-cobalt/10"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-linear-to-br from-teal to-[#12C9A0] text-white">
                    <Check className="size-4" strokeWidth={3} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
