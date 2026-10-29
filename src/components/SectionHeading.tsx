import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({ eyebrow, title, intro, id, align = "left", className = "" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={`${centered ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      <span className="eyebrow">
        <span className="size-1.5 rounded-full bg-linear-to-r from-gold to-gold-deep" aria-hidden />
        {eyebrow}
      </span>
      <h2 id={id} className="heading-lg mt-5">
        {title}
      </h2>
      {intro && <p className={`mt-5 text-lg leading-relaxed ${centered ? "mx-auto max-w-2xl" : ""}`}>{intro}</p>}
    </Reveal>
  );
}
