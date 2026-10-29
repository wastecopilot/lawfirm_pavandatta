import {
  Banknote,
  Building,
  FilePen,
  Gavel,
  HeartHandshake,
  House,
  Landmark,
  Lightbulb,
  type LucideIcon,
  Scale,
  ScrollText,
  ShieldCheck,
  ShoppingBag,
  Users,
} from "lucide-react";

export type Tint = "blue" | "gold" | "teal" | "coral" | "indigo";

export type PracticeArea = {
  slug: string;
  title: string;
  summary: string;
  covers: string[];
  icon: LucideIcon;
  tint: Tint;
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "corporate-commercial",
    title: "Corporate & Commercial Law",
    summary: "Structuring, governance and day-to-day legal support for companies and the people who run them.",
    icon: Building,
    tint: "blue",
    covers: [
      "Incorporation of companies, LLPs and partnerships",
      "Board and shareholder resolutions and statutory filings",
      "Corporate governance and directors' duties",
      "Share transfers, capital changes and restructuring",
      "Company law proceedings before the NCLT",
    ],
  },
  {
    slug: "contracts",
    title: "Contracts & Agreements",
    summary: "Clear, enforceable contracts drafted, reviewed and negotiated to protect your position.",
    icon: FilePen,
    tint: "gold",
    covers: [
      "Commercial, vendor and service agreements",
      "Shareholder, joint venture and founders' agreements",
      "NDAs, licensing and distribution agreements",
      "Contract review with risk notes and redlines",
      "Negotiation support and enforcement of terms",
    ],
  },
  {
    slug: "arbitration",
    title: "Arbitration & Dispute Resolution",
    summary: "Commercial disputes resolved through arbitration, mediation and well-judged settlement.",
    icon: Scale,
    tint: "teal",
    covers: [
      "Ad hoc and institutional arbitration",
      "Interim relief and challenges to arbitral awards",
      "Enforcement of domestic and foreign awards",
      "Mediation and pre-litigation settlement",
      "Drafting effective dispute resolution clauses",
    ],
  },
  {
    slug: "civil-litigation",
    title: "Civil Litigation",
    summary: "Representation in civil suits with careful pleadings and steady, well-prepared advocacy.",
    icon: Gavel,
    tint: "indigo",
    covers: [
      "Suits for recovery, injunction and declaration",
      "Specific performance and contractual claims",
      "Partition, title and possession disputes",
      "Execution of decrees",
      "Interim applications and urgent relief",
    ],
  },
  {
    slug: "criminal-law",
    title: "Criminal Law",
    summary: "Measured defence and advice in criminal proceedings, from the earliest stage onward.",
    icon: ShieldCheck,
    tint: "coral",
    covers: [
      "Bail and anticipatory bail",
      "Petitions to quash proceedings",
      "Cheque dishonour matters",
      "White-collar and economic offences",
      "Trial and appellate representation",
    ],
  },
  {
    slug: "writs-constitutional",
    title: "Writs & Constitutional Matters",
    summary: "Writ petitions to protect rights and challenge unlawful action by public authorities.",
    icon: Landmark,
    tint: "blue",
    covers: [
      "Writ petitions before the High Court and Supreme Court",
      "Challenges to government and regulatory action",
      "Service and administrative law matters",
      "Tender and public procurement disputes",
      "Protection of fundamental rights",
    ],
  },
  {
    slug: "appeals",
    title: "Appeals (High Court & Supreme Court)",
    summary: "Appellate work grounded in a close reading of the record and precise legal argument.",
    icon: ScrollText,
    tint: "gold",
    covers: [
      "First and second appeals, revisions and reviews",
      "Special Leave Petitions before the Supreme Court",
      "Civil and criminal appeals",
      "Appeals from tribunals and regulatory bodies",
      "Stay and interim applications pending appeal",
    ],
  },
  {
    slug: "property-real-estate",
    title: "Property & Real Estate",
    summary: "Due diligence, documentation and dispute support for property transactions of every size.",
    icon: House,
    tint: "teal",
    covers: [
      "Title verification and due diligence",
      "Sale deeds, leases and development agreements",
      "RERA matters for homebuyers and developers",
      "Property, tenancy and possession disputes",
      "Registration and conveyancing",
    ],
  },
  {
    slug: "banking-finance-recovery",
    title: "Banking, Finance & Recovery",
    summary: "Lending, security and recovery advice for lenders, NBFCs and borrowers alike.",
    icon: Banknote,
    tint: "indigo",
    covers: [
      "Loan and security documentation",
      "SARFAESI proceedings",
      "Debt Recovery Tribunal matters",
      "Insolvency and IBC proceedings",
      "Regulatory and compliance advice for NBFCs",
    ],
  },
  {
    slug: "intellectual-property",
    title: "Intellectual Property",
    summary: "Protecting brands, content and ideas through registration, licensing and enforcement.",
    icon: Lightbulb,
    tint: "coral",
    covers: [
      "Trademark searches, filing and prosecution",
      "Opposition and rectification proceedings",
      "Copyright registration and licensing",
      "Infringement and passing-off actions",
      "IP assignment and licensing agreements",
    ],
  },
  {
    slug: "employment-labour",
    title: "Employment & Labour",
    summary: "Practical employment advice and compliant policies for growing teams.",
    icon: Users,
    tint: "blue",
    covers: [
      "Employment contracts and HR policies",
      "POSH policy and Internal Committee compliance",
      "Labour law compliance",
      "Terminations, separations and settlements",
      "Employment disputes and proceedings",
    ],
  },
  {
    slug: "family-matrimonial",
    title: "Family & Matrimonial Law",
    summary: "Sensitive, discreet counsel on family matters with an emphasis on fair resolution.",
    icon: HeartHandshake,
    tint: "gold",
    covers: [
      "Divorce by mutual consent and contested divorce",
      "Maintenance and alimony",
      "Child custody and guardianship",
      "Protection under domestic violence law",
      "Succession, wills and inheritance",
    ],
  },
  {
    slug: "consumer-protection",
    title: "Consumer Protection",
    summary: "Representation before consumer commissions for consumers and businesses.",
    icon: ShoppingBag,
    tint: "teal",
    covers: [
      "Complaints before District, State and National Commissions",
      "Deficiency in service and defective goods",
      "Homebuyer complaints against builders",
      "Defending businesses in consumer claims",
      "Appeals and execution of orders",
    ],
  },
];

export const enquiryTypes = [
  ...practiceAreas.map((area) => area.title),
  "General enquiry",
] as const;

/** Tailwind classes for each icon tile tint. */
export const tintClasses: Record<Tint, { tile: string; icon: string; ring: string }> = {
  blue: { tile: "bg-tint-blue", icon: "text-cobalt", ring: "ring-cobalt/15" },
  gold: { tile: "bg-tint-warm", icon: "text-gold-deep", ring: "ring-gold/30" },
  teal: { tile: "bg-tint-mint", icon: "text-teal", ring: "ring-teal/20" },
  coral: { tile: "bg-[#FFEFEC]", icon: "text-coral", ring: "ring-coral/20" },
  indigo: { tile: "bg-[#EEEDFF]", icon: "text-indigo", ring: "ring-indigo/15" },
};
