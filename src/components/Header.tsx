"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ArrowPill from "@/components/ArrowPill";
import Logo from "@/components/Logo";
import { navLinks } from "@/data/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link for the section currently in the middle of the viewport.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    // The drawer is hidden from lg up, so close it (and release the scroll lock) on resize/rotation.
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
      toggle?.focus();
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-navy/[0.06] bg-white/75 shadow-[0_10px_30px_-18px_rgba(15,27,77,0.25)] backdrop-blur-xl"
            : "bg-white/40 backdrop-blur-md"
        }`}
      >
        <a
          href="#main"
          className="sr-only rounded-full bg-cobalt text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:px-4 focus:py-2"
        >
          Skip to content
        </a>

        <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-4">
          <a href="#home" aria-label="Pavan Datta P, back to top" className="rounded-xl">
            <Logo id="header-logo" compact />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center">
              {navLinks.map((link) => {
                const isActive = active === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "location" : undefined}
                      className={`relative rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                        isActive ? "text-cobalt" : "text-navy/75 hover:text-cobalt"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-linear-to-r from-cobalt to-gold"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {/* Hidden on phones, and on small laptops where the inline nav needs the room. */}
            <a
              href="#contact"
              className="btn-primary group py-3! pr-3! whitespace-nowrap max-sm:hidden lg:max-[72rem]:hidden"
            >
              Schedule a Consultation
              <ArrowPill />
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-full bg-white text-navy shadow-sm ring-1 ring-navy/10 transition hover:text-cobalt lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise contain the fixed drawer. */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 z-50 bg-navy/25 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="drawer"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="fixed inset-y-0 right-0 z-50 flex w-[min(88vw,380px)] flex-col overflow-y-auto overscroll-contain bg-white px-6 pt-5 pb-8 shadow-2xl lg:hidden short:pt-3 short:pb-4"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <span className="blob -top-20 -right-16 size-56 bg-cobalt/15" />
              <span className="blob bottom-10 -left-20 size-56 bg-gold/20" />

              <div className="relative flex items-center justify-between">
                <span className="text-xs font-semibold tracking-[0.2em] text-body uppercase">Menu</span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid size-11 place-items-center rounded-full bg-tint-blue text-navy transition hover:text-cobalt"
                >
                  <X className="size-5" />
                </button>
              </div>

              <nav aria-label="Mobile" className="relative mt-8 short:mt-2">
                <ul className="space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 * index + 0.08 }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-serif text-xl font-semibold transition short:py-2 short:text-lg ${
                          active === link.href ? "bg-tint-blue text-cobalt" : "text-navy hover:bg-tint-blue/70"
                        }`}
                      >
                        {link.label}
                        <span aria-hidden className="text-sm text-gold-deep">
                          0{index + 1}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <a href="#contact" onClick={() => setOpen(false)} className="btn-primary group relative mt-auto w-full short:mt-4">
                Schedule a Consultation
                <ArrowPill />
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
