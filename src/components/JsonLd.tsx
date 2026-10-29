import { fullAddress, siteConfig } from "@/config/site";
import { practiceAreas } from "@/data/practice-areas";

/** LegalService / Attorney structured data. Phone numbers are deliberately never included. */
export default function JsonLd() {
  const { email, city } = siteConfig.contact;
  const address = fullAddress();

  const data = {
    "@context": "https://schema.org",
    "@type": ["LegalService", "Attorney"],
    "@id": `${siteConfig.url}/#practice`,
    name: siteConfig.name,
    description:
      "Advocate and attorney at law practising before the High Court and Supreme Court, advising on corporate and commercial law, contracts, compliance and dispute resolution.",
    url: siteConfig.url,
    image: `${siteConfig.url}/images/about-office.jpg`,
    areaServed: { "@type": "Country", name: "India" },
    knowsAbout: practiceAreas.map((area) => area.title),
    ...(email.trim() ? { email: email.trim() } : {}),
    ...(address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.contact.address.trim() || undefined,
            addressLocality: city.trim() || undefined,
            addressCountry: "IN",
          },
        }
      : {}),
    employee: {
      "@type": "Person",
      name: siteConfig.name,
      jobTitle: siteConfig.title,
      hasCredential: siteConfig.qualifications,
    },
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output, with "<" escaped so the payload cannot close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
