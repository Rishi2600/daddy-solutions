import type { IconName } from "@/components/ui/Icon";

export type Service = {
  id: string;
  title: string;
  blurb: string;
  bullets: string[];
  icon: IconName;
  featured?: boolean;
  /** Offered to select clients only; may be retired. Rendered with a "Limited" flag. */
  temporary?: boolean;
};

export const services: Service[] = [
  {
    id: "full-stack",
    title: "Full-stack development",
    blurb:
      "One team owns the whole thing — interface, API, database, infrastructure. Nobody gets to say “that's the other guy's ticket.”",
    bullets: [
      "Web apps & dashboards",
      "Marketplaces & portals",
      "Internal tools",
      "MVP → v2 → scale",
    ],
    icon: "layers",
    featured: true,
  },
  {
    id: "backend",
    title: "Backend & APIs",
    blurb:
      "Services that stay up when the traffic shows up. Boring, in the best possible way.",
    bullets: [
      "REST, GraphQL, tRPC",
      "Auth, billing, webhooks",
      "Queues & background jobs",
    ],
    icon: "server",
  },
  {
    id: "frontend",
    title: "Frontend engineering",
    blurb: "Interfaces that load fast, feel expensive, and actually convert.",
    bullets: [
      "Next.js & React",
      "Design systems",
      "Accessibility & Core Web Vitals",
    ],
    icon: "window",
  },
  {
    id: "database",
    title: "Database architecture",
    blurb: "Schemas built to survive your growth, not just your demo day.",
    bullets: [
      "Postgres, MySQL, Mongo",
      "Modelling & migrations",
      "Indexing & query tuning",
    ],
    icon: "database",
  },
  {
    id: "devops",
    title: "Cloud & DevOps",
    blurb:
      "CI/CD, infrastructure as code, real observability. Ship on Friday. Sleep on Friday.",
    bullets: [
      "AWS, GCP, Vercel",
      "Docker & Kubernetes",
      "Monitoring & alerting",
    ],
    icon: "cloud",
  },
  {
    id: "web3",
    title: "Solana & Web3",
    blurb: "On-chain work done by people who read the docs and the source.",
    bullets: [
      "dApps & on-chain programs",
      "SPL tokens & NFTs",
      "Wallet integrations",
    ],
    icon: "hexagon",
  },
  {
    id: "support",
    title: "Maintenance & support",
    blurb:
      "We don't vanish at launch. We watch it, patch it, and pick up the phone.",
    bullets: [
      "SLAs from 4 hours",
      "Dependency & security updates",
      "Uptime and incident response",
    ],
    icon: "lifebuoy",
  },
  {
    id: "custom",
    title: "Custom software",
    blurb:
      "The thing that doesn't exist yet, because nobody has built it for your business.",
    bullets: [
      "Automation & integrations",
      "Data pipelines",
      "AI features that ship",
    ],
    icon: "sparkle",
  },
  {
    id: "marketing",
    title: "Digital marketing",
    blurb:
      "Campaigns, SEO and analytics for a handful of clients we already build for.",
    bullets: ["SEO & content", "Paid & analytics", "Landing pages"],
    icon: "megaphone",
    temporary: true,
  },
  {
    id: "crm",
    title: "CRM setup",
    blurb:
      "Standing up and wiring a CRM into the rest of your stack, for select engagements.",
    bullets: ["Setup & migration", "Pipeline automation", "Integrations"],
    icon: "users",
    temporary: true,
  },
  {
    id: "design",
    title: "Graphic design",
    blurb:
      "Brand and marketing visuals when a project needs them — offered case by case.",
    bullets: ["Brand & identity", "Marketing assets", "Social creative"],
    icon: "palette",
    temporary: true,
  },
];

/** Permanent offerings — used for the footer's standing menu. */
export const coreServices = services.filter((service) => !service.temporary);
/** Offered to select clients only; may be retired. */
export const temporaryServices = services.filter(
  (service) => service.temporary,
);

export type Step = {
  n: string;
  title: string;
  meta: string;
  body: string;
  deliverable: string;
};

export const steps: Step[] = [
  {
    n: "01",
    title: "Idea",
    meta: "Week 0–1",
    body: "You talk, we ask the annoying questions. Scope, budget, and the honest version of the timeline.",
    deliverable: "Scope doc + fixed quote",
  },
  {
    n: "02",
    title: "Build",
    meta: "Week 1+",
    body: "Weekly demos on a real URL. No status decks, no mystery. You see it as it grows.",
    deliverable: "Working software, every week",
  },
  {
    n: "03",
    title: "Test",
    meta: "Continuous",
    body: "Automated tests, load checks, and a human trying to break it on purpose.",
    deliverable: "Test suite + QA report",
  },
  {
    n: "04",
    title: "Deploy",
    meta: "Launch day",
    body: "Zero-downtime release, rollbacks ready, monitoring wired before the first user arrives.",
    deliverable: "Production + runbook",
  },
  {
    n: "05",
    title: "Maintain",
    meta: "Ongoing",
    body: "Patches, performance, new features. The relationship doesn't end at the invoice.",
    deliverable: "SLA + monthly report",
  },
];

export const solanaCapabilities = [
  {
    title: "Solana dApps",
    body: "Fast front-ends wired straight to the chain, with state that doesn't lie to your users.",
  },
  {
    title: "On-chain programs",
    body: "Rust and Anchor programs, written carefully and reviewed twice before anyone touches mainnet.",
  },
  {
    title: "SPL tokens",
    body: "Mints, vesting, staking and treasury logic — set up so you can explain it to your lawyer.",
  },
  {
    title: "Wallet integrations",
    body: "Phantom, Solflare, Backpack. Sign-in, sessions and transaction flows people finish.",
  },
  {
    title: "NFT & token infrastructure",
    body: "Metaplex, compressed NFTs, mint pages and the boring backend that keeps them alive.",
  },
  {
    title: "Web3 integrations",
    body: "RPC, indexers, webhooks and off-chain services that keep your app honest and in sync.",
  },
];

export const stackGroups = [
  {
    label: "Core",
    note: "What we reach for first",
    items: ["Next.js", "TypeScript", "React", "Node.js", "PostgreSQL"],
    core: true,
  },
  {
    label: "Frontend",
    note: "Interface layer",
    items: [
      "Tailwind CSS",
      "React Query",
      "Zustand",
      "Framer Motion",
      "Storybook",
    ],
  },
  {
    label: "Backend",
    note: "Services & APIs",
    items: ["NestJS", "Go", "Python", "GraphQL", "Redis", "Prisma"],
  },
  {
    label: "Data",
    note: "Storage & pipelines",
    items: ["MongoDB", "Supabase", "ClickHouse", "Kafka", "S3"],
  },
  {
    label: "Cloud & DevOps",
    note: "Where it runs",
    items: [
      "AWS",
      "Vercel",
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
      "Grafana",
    ],
  },
  {
    label: "Web3",
    note: "On-chain",
    items: ["Solana", "Rust", "Anchor", "web3.js", "Metaplex", "Helius"],
  },
];

export const proofPoints = [
  { value: "60+", label: "products shipped" },
  { value: "7 yrs", label: "average senior experience" },
  { value: "99.98%", label: "uptime across managed apps" },
  { value: "4 hrs", label: "fastest support SLA" },
];

export const theUsualWay = [
  "A design studio that hands over a Figma file and disappears",
  "A frontend freelancer in one timezone",
  "A backend contractor in another",
  "A DevOps guy who is “around on weekends”",
  "A Web3 “expert” you found in a Telegram group",
  "You, in the middle, forwarding emails at midnight",
];

export const theDaddyWay = [
  "One team from first sketch to production",
  "One contract, one invoice, one roadmap",
  "Senior engineers only — no learning on your budget",
  "Weekly demos on a real, clickable URL",
  "You own the repos, the infra and the IP. All of it",
  "We stay after launch, because launch isn't the end",
];
