import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Container, Eyebrow, Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { solanaCapabilities } from "@/lib/content";

const sample = `#[program]
pub mod daddy_vault {
    use super::*;

    /// Deposit SPL tokens into a user-owned vault.
    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        require!(amount > 0, VaultError::NothingToDeposit);

        token::transfer(ctx.accounts.transfer_ctx(), amount)?;
        ctx.accounts.position.balance += amount;

        emit!(Deposited { owner: ctx.accounts.owner.key(), amount });
        Ok(())
    }
}`;

const chips = [
  "Anchor",
  "Rust",
  "web3.js",
  "Metaplex",
  "cNFTs",
  "Helius",
  "Jupiter",
  "Squads",
];

export function Solana() {
  return (
    <Section id="solana" className="overflow-hidden">
      {/* the one place mint + violet are allowed */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(153,69,255,0.10),transparent_70%)]"
      />

      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div className="min-w-0 lg:sticky lg:top-28">
            <Reveal>
              <Eyebrow className="text-mint/80">Web3 · Solana</Eyebrow>
              <h2 className="mt-5 text-4xl leading-[1.05] sm:text-5xl">
                <span className="text-gradient">Daddy does chains, too.</span>
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-mute">
                Solana work from people who read the source, not just the
                whitepaper. Sub-second finality, fees measured in fractions of a
                cent, and the same review discipline we bring to everything
                else.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-mint/20 bg-mint/[0.06] px-3 py-1.5 font-mono text-[0.72rem] text-mint/90"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mt-9">
                <Button href="#contact" variant="secondary" size="md">
                  Start an on-chain build
                  <Icon
                    name="arrowRight"
                    size={16}
                    className="text-mint transition-transform group-hover:translate-x-0.5"
                  />
                </Button>
              </div>
            </Reveal>

            <Reveal delay={140} className="mt-10">
              <CodeBlock
                code={sample}
                filename="programs/daddy_vault/src/lib.rs"
              />
            </Reveal>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
            {solanaCapabilities.map((cap, i) => (
              <Reveal key={cap.title} delay={i * 70}>
                <div className="card-lift card-lift-mint hairline h-full rounded-2xl bg-ink-900/50 p-6">
                  <span className="grid size-8 place-items-center rounded-lg border border-mint/20 bg-mint/[0.07]">
                    <span className="size-1.5 rounded-full bg-mint" />
                  </span>
                  <h3 className="mt-5 text-lg tracking-tight text-bone">
                    {cap.title}
                  </h3>
                  <p className="mt-2 text-[0.93rem] leading-relaxed text-mute">
                    {cap.body}
                  </p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={430} className="sm:col-span-2">
              <div className="hairline rounded-2xl bg-gradient-to-r from-violet/[0.09] via-ink-900/60 to-mint/[0.07] p-6">
                <p className="text-[0.97rem] leading-relaxed text-bone-dim">
                  Every on-chain program we ship gets a test suite, a devnet dry
                  run and a second pair of senior eyes before it touches
                  mainnet.
                  <span className="text-mute">
                    {" "}
                    Money moves. We don&rsquo;t improvise.
                  </span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
