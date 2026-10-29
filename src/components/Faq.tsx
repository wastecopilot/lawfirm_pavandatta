"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";

const faqs = [
  {
    q: "What kind of corporate matters do you advise on?",
    a: "Advice covers the full life of a business: incorporation and structuring, shareholder and joint venture arrangements, commercial contracts, regulatory compliance, governance, mergers and acquisitions, employment policies, intellectual property, and commercial disputes including arbitration and recovery.",
  },
  {
    q: "Do you appear before the High Court and the Supreme Court?",
    a: "Yes. The practice includes appearances before the High Court and the Supreme Court in writ petitions, appeals, special leave petitions and related proceedings, alongside advisory work and matters before tribunals and other forums.",
  },
  {
    q: "How do I begin?",
    a: "Use the contact form to share a short outline of your matter. You will receive a response to arrange an initial consultation, where the facts, your objectives and the possible next steps are discussed.",
  },
  {
    q: "Will what I share be kept confidential?",
    a: "Yes. Everything you share is treated as strictly confidential, in keeping with an advocate's professional obligations. Please avoid sending sensitive documents through the website form; they can be shared securely once a consultation is arranged.",
  },
  {
    q: "How are fees discussed?",
    a: "Fees are discussed transparently at the outset and depend on the scope, complexity and forum of the matter. You will have clarity on the fee structure before any work begins.",
  },
  {
    q: "What should I bring to the first consultation?",
    a: "A brief note of the key facts and dates, along with relevant documents such as agreements, notices, correspondence, court papers or company records. If you are unsure what is relevant, bring what you have and it will be reviewed together.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="section relative overflow-hidden">
      <span aria-hidden className="blob top-20 -left-40 size-[24rem] bg-tint-mint" />
      <span aria-hidden className="blob -right-40 bottom-0 size-[24rem] bg-tint-warm" />

      <div className="container-site relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start"
        >
          <span className="eyebrow">
            <span className="size-1.5 rounded-full bg-linear-to-r from-gold to-gold-deep" aria-hidden />
            FAQ
          </span>
          <h2 id="faq-title" className="heading-lg mt-5">
            Questions, <span className="text-gradient">Answered Plainly</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed">
            A few things clients often ask before getting in touch. For anything else, send a short note through the
            contact form.
          </p>
          <a href="#contact" className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-cobalt underline-offset-4 hover:underline">
            Ask a question
            <span aria-hidden>→</span>
          </a>
        </motion.div>

        <ul className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = open === index;
            const buttonId = `${baseId}-q${index}`;
            const panelId = `${baseId}-a${index}`;
            return (
              <li
                key={item.q}
                className={`rounded-[1.25rem] bg-white ring-1 transition-shadow duration-300 ${
                  isOpen ? "shadow-[0_24px_50px_-30px_rgba(15,27,77,0.4)] ring-cobalt/20" : "ring-navy/[0.08] hover:ring-navy/15"
                }`}
              >
                <h3 className="font-sans">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-5 rounded-[1.25rem] px-6 py-5 text-left text-[17px] font-semibold text-navy"
                  >
                    {item.q}
                    <span
                      aria-hidden
                      className={`grid size-9 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                        isOpen ? "rotate-45 bg-linear-to-br from-cobalt to-indigo text-white" : "bg-tint-blue text-cobalt"
                      }`}
                    >
                      <Plus className="size-4" strokeWidth={2.5} />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
