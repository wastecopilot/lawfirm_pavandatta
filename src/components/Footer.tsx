import ContactDetails, { getContactItems } from "@/components/ContactDetails";
import Logo from "@/components/Logo";
import { siteConfig } from "@/config/site";
import { navLinks } from "@/data/navigation";
import { practiceAreas } from "@/data/practice-areas";

const DISCLAIMER =
  "The information on this website is for general informational purposes only. It does not constitute solicitation, advertisement or legal advice, and viewing it does not create an advocate-client relationship.";

const footerPractice = practiceAreas.slice(0, 7);

export default function Footer() {
  const hasContact = getContactItems().length > 0;
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden bg-linear-to-br from-cobalt via-[#3A44EC] to-indigo text-white">
      <span aria-hidden className="blob -top-40 -left-20 -z-10 size-[30rem] bg-[#5B8CFF]/50" />
      <span aria-hidden className="blob -top-48 -right-24 -z-10 size-[30rem] bg-gold/25" />
      <span aria-hidden className="blob bottom-0 left-1/3 -z-10 size-[22rem] bg-teal/20" />

      <div className="container-site relative pt-20 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr]">
          <div>
            <a href="#home" aria-label="Pavan Datta P, back to top" className="inline-block rounded-xl">
              <Logo inverted id="footer-logo" />
            </a>
            <p className="mt-6 max-w-sm leading-relaxed text-white/85">
              {siteConfig.title} practising before the High Court and the Supreme Court, with a corporate-first practice
              spanning commercial advisory, contracts, compliance and dispute resolution.
            </p>
            <a href="#contact" className="btn-gold mt-7">
              Schedule a Consultation
            </a>
          </div>

          <nav aria-label="Quick links">
            <h2 className="font-sans text-sm font-semibold tracking-[0.18em] text-white uppercase">Quick links</h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/80 transition hover:text-gold">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Practice areas">
            <h2 className="font-sans text-sm font-semibold tracking-[0.18em] text-white uppercase">Practice</h2>
            <ul className="mt-5 space-y-3">
              {footerPractice.map((area) => (
                <li key={area.slug}>
                  <a href="#practice-areas" className="text-white/80 transition hover:text-gold">
                    {area.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-sans text-sm font-semibold tracking-[0.18em] text-white uppercase">Get in touch</h2>
            {hasContact ? (
              <ContactDetails variant="inverted" className="mt-5" />
            ) : (
              <p className="mt-5 leading-relaxed text-white/80">
                Use the{" "}
                <a href="#contact" className="font-semibold text-white underline decoration-gold decoration-2 underline-offset-4 hover:text-gold">
                  enquiry form
                </a>{" "}
                to share a brief outline of your matter.
              </p>
            )}
          </div>
        </div>

        <p
          aria-hidden
          className="pointer-events-none mt-16 text-center font-serif text-[clamp(3.2rem,13vw,11rem)] leading-none font-bold tracking-tight whitespace-nowrap text-white/[0.09] select-none"
        >
          PAVAN DATTA
        </p>

        <div className="mt-8 border-t border-white/20 pt-8">
          <p className="max-w-4xl text-sm leading-relaxed text-white/80">
            <span className="font-semibold text-white">Disclaimer: </span>
            {DISCLAIMER}
          </p>
          <p className="mt-5 text-sm text-white/75">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
