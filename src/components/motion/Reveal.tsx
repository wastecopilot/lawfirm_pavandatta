"use client";

import { motion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Honour the visitor's reduced-motion setting for every Framer animation. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical offset to animate from, in pixels. */
  y?: number;
  x?: number;
  as?: "div" | "li" | "article";
};

/** Fades and slides content in once, the first time it scrolls into view. */
export default function Reveal({ children, className, delay = 0, y = 28, x = 0, as = "div" }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}
