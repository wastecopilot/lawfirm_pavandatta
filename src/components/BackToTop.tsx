"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#home"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          className="grid size-12 place-items-center rounded-full bg-white text-cobalt shadow-[0_14px_30px_-12px_rgba(15,27,77,0.45)] ring-1 ring-navy/10 transition-colors hover:bg-linear-to-br hover:from-gold hover:to-gold-deep hover:text-navy"
        >
          <ArrowUp className="size-5" aria-hidden />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
