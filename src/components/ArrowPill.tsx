import { ArrowRight } from "lucide-react";

/** Small circular arrow used inside pill buttons. */
export default function ArrowPill({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span
      aria-hidden
      className={`grid size-6 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5 ${
        tone === "light" ? "bg-white/20" : "bg-navy/10"
      }`}
    >
      <ArrowRight className="size-3.5" strokeWidth={2.4} />
    </span>
  );
}
