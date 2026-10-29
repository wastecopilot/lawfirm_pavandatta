import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { MotionProvider } from "@/components/motion/Reveal";
import { siteConfig } from "@/config/site";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const title = "Pavan Datta P | Advocate - Corporate & Commercial Law, High Court & Supreme Court";
const description =
  "Pavan Datta P, B.Sc., LL.B., is an advocate and attorney at law practising before the High Court and Supreme Court of India, advising companies, founders and individuals on corporate and commercial law, contracts, compliance, arbitration and litigation.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title,
  description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  keywords: [
    "advocate",
    "corporate lawyer India",
    "commercial law",
    "contract drafting",
    "arbitration",
    "High Court advocate",
    "Supreme Court advocate",
    "compliance",
    "litigation",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: siteConfig.name,
    title,
    description,
    images: [{ url: "/images/about-office.jpg", width: 1611, height: 2000, alt: "Bright law library with brass scales of justice" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/about-office.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#2347F5",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${playfair.variable} ${jakarta.variable} antialiased`}>
      <body className="min-h-full">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
