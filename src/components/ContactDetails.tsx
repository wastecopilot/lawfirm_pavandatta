import { Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { fullAddress, phoneHref, siteConfig, whatsappHref } from "@/config/site";

type Item = { label: string; value: string; href?: string; icon: LucideIcon; external?: boolean };

/** Contact items from site config, skipping every empty field. */
export function getContactItems(): Item[] {
  const { phone, email, whatsapp, officeHours } = siteConfig.contact;
  const items: Item[] = [];
  if (phone.trim()) items.push({ label: "Phone", value: phone, href: phoneHref(), icon: Phone });
  if (email.trim()) items.push({ label: "Email", value: email, href: `mailto:${email.trim()}`, icon: Mail });
  if (whatsapp.trim()) items.push({ label: "WhatsApp", value: whatsapp, href: whatsappHref(), icon: MessageCircle, external: true });
  const address = fullAddress();
  if (address) items.push({ label: "Office", value: address, icon: MapPin });
  if (officeHours.trim()) items.push({ label: "Office hours", value: officeHours, icon: Clock });
  return items;
}

const tiles = [
  "bg-tint-blue text-cobalt",
  "bg-tint-warm text-gold-deep",
  "bg-tint-mint text-teal",
  "bg-[#FFEFEC] text-coral",
  "bg-[#EEEDFF] text-indigo",
];

type ContactDetailsProps = { variant?: "light" | "inverted"; className?: string };

export default function ContactDetails({ variant = "light", className = "" }: ContactDetailsProps) {
  const items = getContactItems();
  if (items.length === 0) return null;
  const inverted = variant === "inverted";

  return (
    <ul className={`space-y-4 ${className}`}>
      {items.map(({ label, value, href, icon: Icon, external }, index) => {
        const content = (
          <>
            <span
              className={`grid size-11 shrink-0 place-items-center rounded-xl ${inverted ? "bg-white/15 text-white" : tiles[index % tiles.length]}`}
            >
              <Icon className="size-5" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className={`block text-xs font-semibold tracking-[0.14em] uppercase ${inverted ? "text-white/70" : "text-body"}`}>
                {label}
              </span>
              <span className={`block font-medium break-words ${inverted ? "text-white" : "text-navy"}`}>{value}</span>
            </span>
          </>
        );
        return (
          <li key={label}>
            {href ? (
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`flex items-center gap-4 rounded-xl transition ${inverted ? "hover:text-gold" : "hover:text-cobalt"}`}
              >
                {content}
              </a>
            ) : (
              <div className="flex items-center gap-4">{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
