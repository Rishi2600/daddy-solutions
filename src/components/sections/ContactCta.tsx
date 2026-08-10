import { ContactForm } from "@/components/ContactForm";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

const facts = [
  { label: "Reply time", value: "< 1 business day" },
  { label: "First demo", value: "~9 days from kickoff" },
  { label: "Minimum engagement", value: "2 weeks" },
];

export function ContactCta() {
  return (
    <Section id="contact" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_50%_100%,rgba(240,180,94,0.12),transparent_70%)]"
      />

      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>Start a project</Eyebrow>
              <h2 className="mt-5 font-display text-[2.6rem] leading-[1] tracking-[-0.04em] sm:text-[3.4rem]">
                <span className="text-gradient block">Got a project?</span>
                <span className="block text-bone">
                  Let <span className="text-brass">Daddy</span> handle it.
                </span>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-mute">
                Tell us what you&rsquo;re building. If we&rsquo;re the wrong fit, we&rsquo;ll
                say so and point you somewhere better — usually in the first reply.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <dl className="mt-10 space-y-4">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between gap-4 border-b border-bone/8 pb-3"
                  >
                    <dt className="font-mono text-[0.72rem] tracking-[0.16em] text-mute uppercase">
                      {fact.label}
                    </dt>
                    <dd className="text-[0.95rem] text-bone">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-8 space-y-1.5 font-mono text-sm">
                <a href={`mailto:${site.contact.email}`} className="block text-brass hover:underline">
                  {site.contact.email}
                </a>
                <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`} className="block text-bone-dim hover:text-bone">
                  {site.contact.phone}
                </a>
                <p className="text-mute">{site.contact.hours}</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
