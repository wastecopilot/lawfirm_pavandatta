import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Scale } from "lucide-react";

export type ImageSlot =
  | "hero-main"
  | "about-office"
  | "corporate-boardroom"
  | "consultation"
  | "court-building"
  | "contact-handshake"
  | "scales-justice";

const RATIOS: Record<ImageSlot, string> = {
  "hero-main": "aspect-[4/5]",
  "about-office": "aspect-[4/5]",
  "corporate-boardroom": "aspect-[16/10]",
  consultation: "aspect-[4/3]",
  "court-building": "aspect-[16/9]",
  "contact-handshake": "aspect-[4/3]",
  "scales-justice": "aspect-square",
};

const EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];

/** Soft blue tint shown while a lazy image loads. */
const LOADING_TINT =
  "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23EEF2FB'/%3E%3C/svg%3E";

/**
 * Returns the public URL for an image slot, or null when no file exists.
 * A version query based on the file's modified time keeps the optimised
 * image fresh when a file is swapped for one with the same name.
 */
export function findSlotImage(name: ImageSlot): string | null {
  const dir = path.join(/* turbopackIgnore: true */ process.cwd(), "public", "images");
  for (const ext of EXTENSIONS) {
    const file = path.join(/* turbopackIgnore: true */ dir, `${name}${ext}`);
    if (fs.existsSync(file)) {
      const version = Math.floor(fs.statSync(file).mtimeMs).toString(36);
      return `/images/${name}${ext}?v=${version}`;
    }
  }
  return null;
}

type SiteImageProps = {
  name: ImageSlot;
  alt: string;
  /** Classes for the outer frame (rounding, shadows, etc.). */
  className?: string;
  /** Classes for the <img> itself, e.g. object position or blend mode. */
  imageClassName?: string;
  sizes?: string;
  /** Preload the image. Use for the above-the-fold hero only. */
  preload?: boolean;
  /** Fill the parent instead of using the slot's aspect ratio. */
  cover?: boolean;
};

export default function SiteImage({
  name,
  alt,
  className = "",
  imageClassName = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  preload = false,
  cover = false,
}: SiteImageProps) {
  const src = findSlotImage(name);
  const frame = `${cover ? "absolute inset-0" : `relative ${RATIOS[name]}`} overflow-hidden ${className}`;

  if (src) {
    return (
      <div className={frame}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          placeholder={preload ? "empty" : LOADING_TINT}
          className={`${imageClassName.includes("object-contain") ? "" : "object-cover"} ${imageClassName}`}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`${frame} bg-linear-to-br from-tint-blue via-white to-tint-mint`}
    >
      <span className="blob -top-1/4 -left-1/4 size-3/4 bg-cobalt/25" />
      <span className="blob -right-1/4 -bottom-1/4 size-3/4 bg-gold/35" />
      <span className="blob top-1/3 left-1/3 size-1/2 bg-teal/20" />
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid size-20 place-items-center rounded-full bg-white/80 shadow-lg ring-1 ring-cobalt/10 backdrop-blur">
          <Scale className="size-9 text-cobalt" strokeWidth={1.5} aria-hidden />
        </span>
      </span>
    </div>
  );
}
