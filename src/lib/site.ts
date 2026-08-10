export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://daddysolutions.dev";

export const site = {
  name: "Daddy Solutions",
  legalName: "Daddy Solutions Labs",
  tagline: "You bring the idea. Daddy handles the rest.",
  description:
    "Daddy Solutions is an end-to-end software company. Full-stack web, APIs, databases, cloud, DevOps, Solana/Web3 and long-term maintenance — one senior team, from idea to production.",
  url: siteUrl,
  founded: "2019",
  locations: ["Remote-first", "Dubai", "Bengaluru"],
  contact: {
    email: "hello@daddysolutions.dev",
    sales: "newwork@daddysolutions.dev",
    phone: "+1 (555) 013-0420",
    hours: "Mon–Fri, 09:00–19:00 GST",
  },
  socials: [
    { label: "X", href: "https://x.com/", handle: "@daddysolutions" },
    { label: "GitHub", href: "https://github.com/", handle: "/daddy-solutions" },
    { label: "LinkedIn", href: "https://linkedin.com/", handle: "/daddy-solutions" },
    { label: "Dribbble", href: "https://dribbble.com/", handle: "/daddysolutions" },
  ],
} as const;

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Why Daddy", href: "#why" },
  { label: "How we work", href: "#process" },
  { label: "Solana", href: "#solana" },
  { label: "Stack", href: "#stack" },
] as const;
