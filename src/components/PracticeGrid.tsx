"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, MessagesSquare, X } from "lucide-react";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import ArrowPill from "@/components/ArrowPill";
import { type PracticeArea, practiceAreas, tintClasses } from "@/data/practice-areas";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PracticeGrid() {
  const [selected, setSelected] = useState<PracticeArea | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const open = (area: PracticeArea, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setSelected(area);
  };

  const close = () => {
    setSelected(null);
    triggerRef.current?.focus({ preventScroll: true });
  };

  // Leaving the modal through its contact link: let the page scroll to #contact.
  const dismiss = () => setSelected(null);

  return (
    <>
      <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {practiceAreas.map((area, index) => {
          const tint = tintClasses[area.tint];
          const Icon = area.icon;
          return (
            <motion.li
              key={area.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: EASE }}
            >
              <button
                type="button"
                onClick={(event) => open(area, event.currentTarget)}
                aria-haspopup="dialog"
                className="group card-lift relative flex h-full w-full flex-col items-center rounded-t-[11rem] rounded-b-[1.75rem] bg-white px-7 pt-12 pb-8 text-center shadow-[0_18px_44px_-30px_rgba(15,27,77,0.35)] ring-1 ring-navy/[0.07] hover:ring-cobalt/25"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-28 rounded-t-[11rem] bg-linear-to-b from-tint-blue/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span
                  className={`relative grid size-16 place-items-center rounded-2xl ring-1 transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-4deg] ${tint.tile} ${tint.ring}`}
                >
                  <Icon className={`size-7 ${tint.icon}`} strokeWidth={1.8} aria-hidden />
                </span>
                <span className="relative mt-6 font-serif text-xl leading-snug font-bold text-navy">{area.title}</span>
                <span className="relative mt-3 text-[15px] leading-relaxed">{area.summary}</span>
                <span className="relative mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-cobalt">
                  View scope
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </span>
              </button>
            </motion.li>
          );
        })}

        <motion.li
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          className="md:col-span-1 lg:col-span-2"
        >
          <div className="relative isolate flex h-full flex-col justify-center overflow-hidden rounded-[1.75rem] bg-linear-to-br from-cobalt to-indigo px-8 py-10 text-white sm:px-10">
            <span aria-hidden className="blob -top-16 -right-10 -z-10 size-64 bg-gold/40" />
            <span aria-hidden className="blob -bottom-20 left-10 -z-10 size-56 bg-teal/40" />
            <span className="grid size-12 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25">
              <MessagesSquare className="size-6" aria-hidden />
            </span>
            <h3 className="mt-5 font-serif text-2xl font-bold text-white sm:text-3xl">Not sure where your matter fits?</h3>
            <p className="mt-3 max-w-lg text-white/85">
              Share a brief outline and you will be guided on the right course of action, whichever area of law it
              touches.
            </p>
            <a href="#contact" className="btn-gold group mt-7 self-start pr-3!">
              Start a conversation
              <ArrowPill tone="dark" />
            </a>
          </div>
        </motion.li>
      </ul>

      <PracticeModal area={selected} onClose={close} onNavigate={dismiss} />
    </>
  );
}

type PracticeModalProps = {
  area: PracticeArea | null;
  onClose: () => void;
  onNavigate: () => void;
};

function PracticeModal({ area, onClose, onNavigate }: PracticeModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape closes; Tab and Shift+Tab stay inside the dialog.
  const onKey = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
      return;
    }
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const isOpen = area !== null;
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => onKey(event);
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  const tint = area ? tintClasses[area.tint] : null;
  const Icon = area?.icon;

  return (
    <AnimatePresence>
      {area && tint && Icon && (
        <motion.div
          key="practice-modal"
          className="fixed inset-0 z-[60] flex items-end justify-center p-3 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div aria-hidden className="absolute inset-0 bg-navy/30 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="practice-modal-title"
            aria-describedby="practice-modal-summary"
            className="relative max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-[1.75rem] bg-white p-7 shadow-2xl sm:p-9"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <span aria-hidden className="blob -top-20 -right-20 size-56 bg-gold/20" />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-tint-blue text-navy transition hover:text-cobalt"
            >
              <X className="size-5" />
            </button>

            <span className={`relative grid size-14 place-items-center rounded-2xl ring-1 ${tint.tile} ${tint.ring}`}>
              <Icon className={`size-7 ${tint.icon}`} strokeWidth={1.8} aria-hidden />
            </span>
            <h3 id="practice-modal-title" className="relative mt-5 pr-8 text-2xl font-bold sm:text-3xl">
              {area.title}
            </h3>
            <p id="practice-modal-summary" className="relative mt-3 leading-relaxed">
              {area.summary}
            </p>

            <p className="relative mt-6 text-xs font-semibold tracking-[0.18em] text-body uppercase">What it covers</p>
            <ul className="relative mt-3 space-y-2.5">
              {area.covers.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-navy">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-tint-mint text-teal">
                    <Check className="size-3" strokeWidth={3} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <a href="#contact" onClick={onNavigate} className="btn-primary group relative mt-8 w-full sm:w-auto sm:pr-3!">
              Discuss this matter
              <ArrowPill />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
