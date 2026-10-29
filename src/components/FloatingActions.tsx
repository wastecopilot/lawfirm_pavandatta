import { MessageCircle, Phone } from "lucide-react";
import BackToTop from "@/components/BackToTop";
import { phoneHref, whatsappHref } from "@/config/site";

/** Back-to-top plus call / WhatsApp buttons, shown only when configured. */
export default function FloatingActions() {
  const call = phoneHref();
  const whatsapp = whatsappHref();

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <BackToTop />
      {whatsapp && (
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="grid size-13 place-items-center rounded-full bg-linear-to-br from-teal to-[#12C9A0] text-white shadow-[0_14px_30px_-10px_rgba(15,181,166,0.8)] transition hover:-translate-y-0.5"
        >
          <MessageCircle className="size-6" aria-hidden />
        </a>
      )}
      {call && (
        <a
          href={call}
          aria-label="Call the office"
          className="grid size-13 place-items-center rounded-full bg-linear-to-br from-cobalt to-indigo text-white shadow-[0_14px_30px_-10px_rgba(35,71,245,0.8)] transition hover:-translate-y-0.5"
        >
          <Phone className="size-5" aria-hidden />
        </a>
      )}
    </div>
  );
}
