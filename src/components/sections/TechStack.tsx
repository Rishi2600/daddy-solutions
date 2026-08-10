import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { stackGroups } from "@/lib/content";
import { cn } from "@/lib/utils";

export function TechStack() {
  return (
    <Section id="stack">
      <Container>
        <SectionHeading
          eyebrow="Stack"
          title={
            <>
              Tools we know cold —{" "}
              <span className="text-brass">not tools we&rsquo;re curious about.</span>
            </>
          }
          intro="We pick boring, proven technology and use it well. Next.js and TypeScript carry most of what we ship."
        />

        <div className="mt-14 overflow-hidden rounded-2xl border border-bone/8">
          {stackGroups.map((group, i) => (
            <Reveal key={group.label} delay={i * 60}>
              <div
                className={cn(
                  "grid gap-4 border-b border-bone/8 px-6 py-6 transition-colors duration-300 last:border-b-0 hover:bg-bone/[0.02] sm:grid-cols-[200px_1fr] sm:items-center sm:px-8",
                  group.core && "bg-brass/[0.04]",
                )}
              >
                <div>
                  <p
                    className={cn(
                      "font-mono text-[0.72rem] tracking-[0.2em] uppercase",
                      group.core ? "text-brass" : "text-bone-dim",
                    )}
                  >
                    {group.label}
                  </p>
                  <p className="mt-1 text-[0.82rem] text-mute">{group.note}</p>
                </div>

                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className={cn(
                        "rounded-lg border px-3 py-1.5 text-[0.85rem] transition-colors duration-300",
                        group.core
                          ? "border-brass/25 bg-brass/[0.07] text-bone"
                          : "border-bone/8 bg-ink-900/60 text-bone-dim hover:border-bone/20",
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-6 font-mono text-xs text-mute">
            Using something else? We&rsquo;ve probably inherited a codebase in it.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
