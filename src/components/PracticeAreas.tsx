import Reveal from "@/components/motion/Reveal";
import PracticeGrid from "@/components/PracticeGrid";
import SectionHeading from "@/components/SectionHeading";
import SiteImage from "@/components/SiteImage";

export default function PracticeAreas() {
  return (
    <section id="practice-areas" aria-labelledby="practice-title" className="section relative overflow-hidden">
      <span aria-hidden className="blob top-10 -left-40 size-[26rem] bg-tint-warm" />
      <span aria-hidden className="blob -right-40 bottom-20 size-[26rem] bg-tint-blue" />

      <div className="container-site relative">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <SectionHeading
            id="practice-title"
            eyebrow="Practice Areas"
            title={
              <>
                Focused Expertise, <span className="text-gradient">Across the Law</span>
              </>
            }
            intro="Advisory and courtroom work across corporate, commercial and personal matters. Select an area to see what it covers."
          />

          <Reveal delay={0.1} className="relative mx-auto hidden size-60 sm:block lg:mx-0 lg:size-72">
            <span aria-hidden className="absolute inset-4 rounded-full bg-linear-to-br from-tint-warm via-white to-tint-blue ring-1 ring-gold/20" />
            <span aria-hidden className="absolute inset-0 rounded-full border border-dashed border-gold/50" />
            <div className="absolute inset-9">
              <SiteImage
                name="scales-justice"
                alt="Polished gold scales of justice"
                sizes="240px"
                cover
                className="rounded-full"
                imageClassName="object-contain mix-blend-multiply"
              />
            </div>
          </Reveal>
        </div>

        <PracticeGrid />
      </div>
    </section>
  );
}
