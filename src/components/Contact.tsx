import { ShieldCheck } from "lucide-react";
import ContactDetails from "@/components/ContactDetails";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/motion/Reveal";
import SiteImage from "@/components/SiteImage";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section relative overflow-hidden bg-linear-to-b from-white via-tint-blue to-white">
      <span aria-hidden className="blob top-10 -right-40 size-[28rem] bg-gold/15" />
      <span aria-hidden className="blob bottom-10 -left-40 size-[28rem] bg-cobalt/10" />

      <div className="container-site relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Reveal>
            <span className="eyebrow">
              <span className="size-1.5 rounded-full bg-linear-to-r from-gold to-gold-deep" aria-hidden />
              Contact
            </span>
            <h2 id="contact-title" className="heading-lg mt-5">
              Let&rsquo;s Discuss <span className="text-gradient">Your Matter</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed">
              Share a few details and you will receive a response at the earliest.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ContactDetails className="mt-8" />
          </Reveal>

          <Reveal delay={0.12} className="relative mt-10">
            <span aria-hidden className="blob -top-6 -left-6 size-56 bg-teal/20" />
            <span aria-hidden className="blob -right-6 -bottom-6 size-56 bg-gold/25" />
            <span aria-hidden className="absolute inset-0 -translate-x-3 translate-y-3 rounded-[1.75rem] border-2 border-gold sm:-translate-x-4 sm:translate-y-4" />
            <SiteImage
              name="contact-handshake"
              alt="Two professionals shaking hands over a desk with a signed agreement"
              sizes="(min-width: 1024px) 520px, 92vw"
              className="rounded-[1.75rem] shadow-[0_30px_60px_-28px_rgba(15,27,77,0.4)] ring-6 ring-white"
            />
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-10 flex items-start gap-3 rounded-2xl bg-white/80 p-4 text-sm leading-relaxed ring-1 ring-navy/[0.07]">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-teal" aria-hidden />
              Your enquiry is treated as confidential. Please share only a brief outline here; documents can be exchanged
              securely once a consultation is arranged.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={40} className="lg:pt-4">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
