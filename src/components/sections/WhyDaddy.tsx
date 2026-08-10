import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { theDaddyWay, theUsualWay } from "@/lib/content";

const guarantees = [
  {
    icon: "shield" as const,
    title: "You own everything",
    body: "Repos, infrastructure, documentation, IP. Handed over from day one, not held hostage at the end.",
  },
  {
    icon: "clock" as const,
    title: "Honest timelines",
    body: "If something is going to take longer, you hear it before the deadline, not after it.",
  },
  {
    icon: "bolt" as const,
    title: "Senior people only",
    body: "Nobody learns their framework on your budget. The person on the call is the person on the commit.",
  },
];

export function WhyDaddy() {
  return (
    <Section id="why">
      <Container>
        <SectionHeading
          eyebrow="Why Daddy"
          title={
            <>
              One team. One invoice.
              <br />
              Nobody left to blame.
            </>
          }
          intro="Most software projects don't fail on code. They fail in the gaps between five vendors who have never met. We removed the gaps."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {/* The usual way */}
          <Reveal>
            <div className="hairline h-full rounded-2xl bg-ink-900/30 p-7">
              <p className="font-mono text-[0.7rem] tracking-[0.2em] text-mute uppercase">
                The usual way
              </p>
              <ul className="mt-6 space-y-4">
                {theUsualWay.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.97rem] leading-relaxed text-mute">
                    <Icon name="cross" size={16} className="mt-1 shrink-0 text-mute/50" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-t border-bone/5 pt-5 font-mono text-xs text-mute/70">
                Result: 5 vendors, 4 timezones, 0 owners.
              </p>
            </div>
          </Reveal>

          {/* The Daddy way */}
          <Reveal delay={100}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-brass/25 bg-gradient-to-b from-brass/[0.07] to-ink-900/60 p-7">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full bg-brass/12 blur-3xl"
              />
              <p className="font-mono text-[0.7rem] tracking-[0.2em] text-brass uppercase">
                With Daddy
              </p>
              <ul className="mt-6 space-y-4">
                {theDaddyWay.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.97rem] leading-relaxed text-bone-dim">
                    <Icon name="check" size={16} className="mt-1 shrink-0 text-brass" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-t border-brass/15 pt-5 font-mono text-xs text-brass-dim">
                Result: one number to call. Ours.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {guarantees.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="card-lift hairline h-full rounded-2xl bg-ink-900/50 p-6">
                <Icon name={item.icon} size={20} className="text-brass" />
                <h3 className="mt-4 text-lg tracking-tight text-bone">{item.title}</h3>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-mute">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
