import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>{children}</div>
  );
}

export function Section({
  id,
  children,
  className,
  seam = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  seam?: boolean;
}) {
  return (
    <section id={id} className={cn("relative scroll-mt-24 py-24 sm:py-32", className)}>
      {seam && <div className="seam absolute inset-x-0 top-0" aria-hidden="true" />}
      {children}
    </section>
  );
}

/**
 * Mono, bracketed label. Used everywhere as the section marker — it is the
 * one repeating brand device, so it never carries decorative text.
 */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "font-mono text-[0.7rem] uppercase tracking-[0.28em] text-brass-dim",
        className,
      )}
    >
      <span className="text-mute">[</span>
      <span className="px-1.5">{children}</span>
      <span className="text-mute">]</span>
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "max-w-2xl",
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-gradient text-4xl leading-[1.05] sm:text-5xl">{title}</h2>
      {intro && <p className="text-lg leading-relaxed text-mute">{intro}</p>}
    </Reveal>
  );
}
