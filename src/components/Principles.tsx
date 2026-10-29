import { BriefcaseBusiness, Gavel, Lock, MessagesSquare } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "@/components/SectionHeading";

const principles = [
  {
    title: "Court-ready Preparation",
    text: "Every matter is prepared as though it will be argued, so you are never caught unready.",
    icon: Gavel,
    tile: "bg-tint-blue text-cobalt",
    bar: "from-cobalt to-indigo",
  },
  {
    title: "Business-minded Advice",
    text: "Legal advice weighed against your commercial priorities, timelines and costs.",
    icon: BriefcaseBusiness,
    tile: "bg-tint-warm text-gold-deep",
    bar: "from-gold to-gold-deep",
  },
  {
    title: "Strict Confidentiality",
    text: "Your information and instructions are handled with complete discretion.",
    icon: Lock,
    tile: "bg-tint-mint text-teal",
    bar: "from-teal to-[#12C9A0]",
  },
  {
    title: "Clear Communication",
    text: "Plain-language advice and timely updates, without jargon or surprises.",
    icon: MessagesSquare,
    tile: "bg-[#FFEFEC] text-coral",
    bar: "from-coral to-[#FF8A5B]",
  },
];

export default function Principles() {
  return (
    <section aria-labelledby="principles-title" className="section pt-8 sm:pt-10 lg:pt-12">
      <div className="container-site">
        <SectionHeading
          id="principles-title"
          eyebrow="Principles"
          align="center"
          title={
            <>
              What Every Client <span className="text-gradient">Can Expect</span>
            </>
          }
        />
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map(({ title, text, icon: Icon, tile, bar }, index) => (
            <Reveal
              as="li"
              key={title}
              delay={index * 0.08}
              className="group card-lift relative overflow-hidden rounded-[1.5rem] bg-white p-7 shadow-[0_18px_44px_-30px_rgba(15,27,77,0.35)] ring-1 ring-navy/[0.07]"
            >
              <span aria-hidden className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${bar}`} />
              <span className={`grid size-13 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${tile}`}>
                <Icon className="size-6" strokeWidth={1.8} aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-2.5 leading-relaxed">{text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
