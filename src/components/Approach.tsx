import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SiteImage from "@/components/SiteImage";

const steps = [
  {
    title: "Understand",
    text: "A focused first conversation about the facts, the commercial context and what you need to achieve.",
    dot: "from-cobalt to-indigo",
  },
  {
    title: "Evaluate",
    text: "A careful review of documents, law and precedent to assess strengths, risks and realistic options.",
    dot: "from-teal to-[#12C9A0]",
  },
  {
    title: "Strategise",
    text: "A clear plan of action, with timelines and costs discussed openly, so every decision is an informed one.",
    dot: "from-gold to-gold-deep",
  },
  {
    title: "Represent",
    text: "Diligent drafting, negotiation and advocacy, with regular updates until the matter is resolved.",
    dot: "from-coral to-[#FF8A5B]",
  },
];

export default function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="section relative overflow-hidden bg-linear-to-b from-white via-tint-warm/60 to-white">
      <div className="container-site grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            id="approach-title"
            eyebrow="The Approach"
            title={
              <>
                A Clear Path From <span className="text-gradient">First Call to Resolution</span>
              </>
            }
            intro="Every matter follows a disciplined process, so you always know what is happening, why, and what comes next."
          />

          <div className="relative mt-12">
            <span
              aria-hidden
              className="absolute top-6 bottom-6 left-6 w-0.5 -translate-x-1/2 bg-linear-to-b from-cobalt via-gold to-coral opacity-40"
            />
            <ol className="space-y-8">
              {steps.map((step, index) => (
                <Reveal as="li" key={step.title} delay={index * 0.08} className="relative flex gap-6">
                  <span
                    className={`relative z-10 grid size-12 shrink-0 place-items-center rounded-full bg-linear-to-br font-serif text-lg font-bold text-white shadow-lg ring-4 ring-white ${step.dot}`}
                  >
                    {index + 1}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                    <p className="mt-2 max-w-md leading-relaxed">{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        <Reveal delay={0.1} y={40} className="relative">
          <span aria-hidden className="blob -top-10 -right-6 size-72 bg-cobalt/20" />
          <span aria-hidden className="blob -bottom-12 -left-8 size-72 bg-gold/30" />
          <span aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border-2 border-gold sm:translate-x-5 sm:translate-y-5" />
          <SiteImage
            name="consultation"
            alt="Advocate and a businesswoman reviewing documents together across a desk"
            sizes="(min-width: 1024px) 600px, 92vw"
            className="rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(15,27,77,0.4)] ring-8 ring-white"
          />
        </Reveal>
      </div>
    </section>
  );
}
