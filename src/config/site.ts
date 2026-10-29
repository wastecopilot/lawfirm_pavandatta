/**
 * Single source of truth for the brand and contact details.
 *
 * Every contact field is intentionally empty. Any field left as an empty
 * string is hidden across the site automatically (contact section, footer,
 * floating call / WhatsApp buttons and structured data).
 */
export const siteConfig = {
  name: "Pavan Datta P",
  tagline: "Advocate · High Court & Supreme Court",
  title: "Advocate & Attorney at Law",
  qualifications: "B.Sc., LL.B.",

  /** Public URL of the website, used for SEO (canonical URL, sitemap, Open Graph). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  contact: {
    /** e.g. "+91 98xxxxxxxx". Leave empty to hide the call button and phone line. */
    phone: "",
    email: "",
    address: "",
    city: "",
    /** Digits with country code, e.g. "9198xxxxxxxx". Leave empty to hide WhatsApp. */
    whatsapp: "",
    /** e.g. "Mon to Sat, 10:00 am to 6:00 pm" */
    officeHours: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;

const clean = (value: string) => value.trim();

/** Phone digits suitable for a tel: link, or an empty string. */
export const phoneHref = () => {
  const digits = clean(siteConfig.contact.phone).replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : "";
};

/** WhatsApp chat link, or an empty string when no number is configured. */
export const whatsappHref = () => {
  const digits = clean(siteConfig.contact.whatsapp).replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "";
};

/** Full postal address line built from address and city, skipping empty parts. */
export const fullAddress = () =>
  [siteConfig.contact.address, siteConfig.contact.city].map(clean).filter(Boolean).join(", ");
