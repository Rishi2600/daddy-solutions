import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { steps } from "@/lib/content";

export function Process() {
  return (
    <Section id="process">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              Idea → Build → Test → Deploy →{" "}
              <span className="text-brass">Maintain</span>
            </>
          }
          intro="Five stages, no mystery. You always know what's happening, what it costs, and what lands next week."
        />

        <ol className="relative mt-16 grid gap-10 lg:grid-cols-5 lg:gap-6">
          {/* the spine */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[13px] w-px bg-gradient-to-b from-brass/40 via-bone/10 to-transparent lg:top-[13px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto lg:bg-gradient-to-r"
          />

          {steps.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 90} className="relative pl-11 lg:pt-11 lg:pl-0">
              <span className="absolute top-1 left-0 grid size-[27px] place-items-center rounded-full border border-brass/30 bg-ink-950 font-mono text-[0.62rem] text-brass lg:top-0">
                {step.n}
              </span>

              <p className="font-mono text-[0.68rem] tracking-[0.18em] text-mute uppercase">
                {step.meta}
              </p>
              <h3 className="mt-2 text-2xl tracking-tight text-bone">{step.title}</h3>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-mute">{step.body}</p>
              <p className="mt-4 border-t border-bone/8 pt-3 font-mono text-[0.72rem] text-bone-dim/70">
                {step.deliverable}
              </p>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120}>
          <p className="mt-14 text-center font-display text-lg text-mute">
            You&rsquo;re never more than seven days from seeing something real.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
