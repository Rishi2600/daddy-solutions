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
│  ├─ ui/                  # Button, Section, Reveal, Icon, Logo, CodeBlock
│  │  ├─ TerminalPanel.tsx # hero terminal: idle log ⇄ live shell, lazy loading
│  │  ├─ DeployLog.tsx     # the idle, SSR-rendered deploy animation
│  │  └─ LiveTerminal.tsx  # xterm.js session: line editing, history, completion
│  └─ ContactForm.tsx
└─ lib/
   ├─ site.ts              # name, contact details, nav, socials
   ├─ content.ts           # services, process steps, stack, Solana capabilities
   ├─ shell.ts             # the shell: commands, ANSI output, page effects
   └─ utils.ts
```

**All copy and data live in `src/lib/`.** Editing services, stack items, process steps
or contact details never means touching a component.

## Design system

| Token                        | Value                 | Used for                                 |
| ---------------------------- | --------------------- | ---------------------------------------- |
| `ink-950`                    | `#08080a`             | page base                                |
| `ink-900 / 850 / 800`        | `#0b0b0f` → `#14141b` | cards, panels, chrome                    |
| `bone` / `bone-dim` / `mute` | `#ede9e1` → `#85838f` | text hierarchy                           |
| `brass`                      | `#f0b45e`             | the single brand accent, terminal cursor |
| `mint` / `violet`            | `#14f195` / `#9945ff` | **Solana section only**                  |

Type: **Bricolage Grotesque** (display), **Instrument Sans** (body), **JetBrains Mono**
(labels, code, data). Mono bracketed eyebrows — `[ services ]` — are the repeating brand
device; they always label real content, never decorate.

The signature element is the hero terminal: the site introduces the company the way the
company would introduce itself — a clean production deploy printing line by line.

## The hero terminal

It's a real terminal — [xterm.js](https://xtermjs.org) with the fit and web-links
addons — but it is deliberately _not_ loaded up front.

1. **Idle state** (`DeployLog`) renders on the server: a scripted deploy log, zero JS
   dependencies, no layout shift. This is what most visitors ever see.
2. **Warm** — once the browser goes idle, the terminal chunk is prefetched, skipped
   entirely on `saveData` or 2G connections.
3. **Live** — clicking the log or _Take the wheel_ swaps in `LiveTerminal`, which
   boots an xterm session with a prompt of `you@daddy:~$`. That's the joke: the
   visitor is the user, Daddy is the host.

xterm.js renders a stream; it does not give you a shell. The shell is
`src/lib/shell.ts` — a pure command registry with no DOM or React in it, which means
it's trivially testable and reusable. Every command reads from `content.ts`, so
`services`, `stack`, `process` and `solana` can never drift out of sync with the
rendered page.

**Commands:** `help` `services [name]` `stack` `process` `solana` `pricing`
`deploy --prod` `open <section>` `contact [message]` `whoami` `ls` `clear` — plus
`sudo`, `rm -rf /`, `cat`, `hire` and `exit`, which are hidden from `help` and exist
purely to reward the people who try them.

Line editing is hand-rolled: cursor movement, history on ↑/↓, Tab completion,
Ctrl+C and Ctrl+L. Commands return **effects** (`navigate`, `prefill`, `deploy`,
`clear`) that the renderer performs against the page — `open solana` scrolls, and
`contact needs a Solana dApp` scrolls to the form and fills the message field via a
`daddy:prefill` event. The terminal is a navigation surface, not a toy.

Nothing executes on a server. There is no pty, no websocket, no `node-pty` — a public
marketing page should never hand strangers a shell on your box.

Mobile keyboards and terminals get along badly, so the command chips under the panel
are the primary interface on touch and a discoverability aid on desktop.

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
