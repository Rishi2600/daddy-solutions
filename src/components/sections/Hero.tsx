import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { TerminalPanel } from "@/components/ui/TerminalPanel";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { proofPoints } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="backdrop-grid absolute inset-0" />
        <div className="animate-drift absolute -top-40 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-brass/12 blur-[120px]" />
        <div className="absolute -top-10 right-[8%] h-72 w-72 rounded-full bg-violet/8 blur-[110px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
      </div>

      <Container className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <Reveal>
            <span className="hairline inline-flex items-center gap-2.5 rounded-full bg-ink-900/70 py-1.5 pr-4 pl-3 font-mono text-[0.7rem] tracking-wide text-bone-dim backdrop-blur">
              <span className="animate-pulse-dot size-1.5 rounded-full bg-mint" />
              Two build slots open for Q4
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 font-display text-[2.9rem] leading-[0.96] font-semibold tracking-[-0.04em] sm:text-6xl lg:text-[4.35rem]">
              <span className="text-gradient block">You bring the idea.</span>
              <span className="block text-bone">
                <span className="text-brass">Daddy</span> handles the rest.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-mute sm:text-xl">
              End-to-end software development — web apps, APIs, databases, cloud
              and Solana. One senior team takes it from a sketch on a call to a
              product in production, then keeps it running.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="#contact" size="lg">
                Talk to Daddy
                <Icon
                  name="arrowRight"
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
              <Button href="#services" size="lg" variant="secondary">
                See what Daddy does
                <Icon
                  name="arrowUpRight"
                  size={18}
                  className="text-brass transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Button>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <p className="mt-6 font-mono text-xs tracking-wide text-mute/80">
              No account managers. You talk to the people writing the code.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200} className="lg:pl-4">
          <TerminalPanel />

          <div className="hairline mt-3 flex items-center justify-between rounded-xl bg-ink-900/50 px-4 py-3 backdrop-blur">
            <span className="font-mono text-[0.7rem] tracking-wide text-mute">
              avg. time from brief → first demo
            </span>
            <span className="font-display text-sm font-semibold text-brass">
              9 days
            </span>
          </div>
        </Reveal>
      </Container>

      {/* proof strip */}
      <Container className="mt-20 sm:mt-24">
        <Reveal delay={120}>
          <dl className="hairline grid grid-cols-2 divide-bone/8 rounded-2xl bg-ink-900/40 backdrop-blur sm:grid-cols-4 sm:divide-x">
            {proofPoints.map((point) => (
              <div
                key={point.label}
                className="px-6 py-6 text-center sm:text-left"
              >
                <dt className="font-display text-2xl font-semibold tracking-tight text-bone sm:text-3xl">
                  {point.value}
                </dt>
                <dd className="mt-1 font-mono text-[0.68rem] tracking-wide text-mute uppercase">
                  {point.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
