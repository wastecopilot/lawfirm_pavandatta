import ArrowPill from "@/components/ArrowPill";
import Reveal from "@/components/motion/Reveal";
import SiteImage from "@/components/SiteImage";

export default function CourtCta() {
  return (
    <section aria-labelledby="court-title" className="px-3 sm:px-5">
      <div className="relative isolate mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
        <SiteImage
          name="court-building"
          alt="Domed courthouse building with broad steps under a clear blue sky"
          cover
          sizes="100vw"
          className="-z-20"
          imageClassName="object-[60%_40%]"
        />
        {/* Bright white-to-blue wash keeps the image light and the text readable */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-b from-white/95 via-white/85 to-[#E6EEFF]/80 md:bg-linear-to-r md:from-white/95 md:via-white/80 md:to-[#DCE7FF]/30"
        />

        <div className="container-site py-20 sm:py-24 lg:py-32">
          <Reveal className="max-w-xl">
            <span className="eyebrow">
              <span className="size-1.5 rounded-full bg-linear-to-r from-gold to-gold-deep" aria-hidden />
              Appellate &amp; Constitutional Practice
            </span>
            <h2 id="court-title" className="heading-lg mt-5">
              Matters before the <span className="text-gradient">High Court and Supreme Court</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-navy/80">
              Writ petitions, appeals, special leave petitions and complex commercial disputes, prepared with rigour and
              presented with clarity.
            </p>
            <a href="#contact" className="btn-primary group mt-9 pr-3!">
              Discuss Your Matter
              <ArrowPill />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
