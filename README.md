# Daddy Solutions — marketing site

End-to-end software company site. Next.js (App Router) + TypeScript + Tailwind CSS v4,
zero UI dependencies, one API route for the contact form.

> **Positioning:** you bring the idea, Daddy handles the rest.
> The joke lives in the copy, never in the layout — the site has to read as a
> consultancy a CTO would actually hire.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` before deploying —
canonical URLs, the sitemap and Open Graph tags all read from it.

## Structure

```
src/
├─ app/
│  ├─ layout.tsx           # fonts, metadata, JSON-LD, nav + footer shell
│  ├─ page.tsx             # section composition
│  ├─ globals.css          # design tokens, utilities, motion
│  ├─ opengraph-image.tsx  # generated 1200×630 social card
│  ├─ robots.ts, sitemap.ts
│  └─ api/contact/route.ts # brief intake: validation, honeypot, rate limit
├─ components/
│  ├─ layout/              # Navbar, Footer
│  ├─ sections/            # Hero, Services, WhyDaddy, Process, Solana, TechStack, ContactCta
│  ├─ ui/                  # Button, Section, Reveal, Icon, Logo, CodeBlock, DeployLog
│  └─ ContactForm.tsx
└─ lib/
   ├─ site.ts              # name, contact details, nav, socials
   ├─ content.ts           # services, process steps, stack, Solana capabilities
   └─ utils.ts
```

**All copy and data live in `src/lib/`.** Editing services, stack items, process steps
or contact details never means touching a component.

## Design system

| Token | Value | Used for |
| --- | --- | --- |
| `ink-950` | `#08080a` | page base |
| `ink-900 / 850 / 800` | `#0b0b0f` → `#14141b` | cards, panels, chrome |
| `bone` / `bone-dim` / `mute` | `#ede9e1` → `#85838f` | text hierarchy |
| `brass` | `#f0b45e` | the single brand accent |
| `mint` / `violet` | `#14f195` / `#9945ff` | **Solana section only** |

Type: **Bricolage Grotesque** (display), **Instrument Sans** (body), **JetBrains Mono**
(labels, code, data). Mono bracketed eyebrows — `[ services ]` — are the repeating brand
device; they always label real content, never decorate.

The signature element is the hero terminal: the site introduces the company the way the
company would introduce itself — a clean production deploy printing line by line.

## Motion

Deliberately cheap. One `IntersectionObserver` per revealed block (disconnected after it
fires), CSS transitions only, no animation library. `prefers-reduced-motion: reduce`
short-circuits every animation and shows final states immediately.

## SEO

- Metadata API with title template, canonical, Open Graph and Twitter cards
- `ProfessionalService` JSON-LD including every service as an `Offer`
- Generated OG image via `next/og`, `robots.ts`, `sitemap.ts`
- Semantic landmarks, one `h1`, labelled nav regions, skip link, visible focus rings

## Contact form

`POST /api/contact` validates name/email/message, drops honeypot submissions, and throttles
to 5 requests per IP per minute. It currently logs the brief — swap the `console.info` for
Resend, Postmark, Slack or your CRM. Rate limiting is in-memory: move it to Redis if you
run more than one instance.

## Preview

`preview.html` (in the parent folder) is a standalone static mirror of the page for quick
visual review — open it in a browser, no install needed. The Next.js app is the real
deliverable.
