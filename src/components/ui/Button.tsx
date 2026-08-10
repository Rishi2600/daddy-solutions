import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-brass text-ink-950 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_10px_30px_-12px_rgba(240,180,94,0.75)] hover:bg-[#f7c47c] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_16px_40px_-12px_rgba(240,180,94,0.9)]",
  secondary:
    "hairline bg-ink-900/60 text-bone backdrop-blur hover:border-brass/40 hover:bg-ink-800",
  ghost: "text-bone-dim hover:text-bone",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-7 text-base",
};

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Renders a Next.js link instead of a <button>. */
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  target?: string;
  rel?: string;
  "aria-label"?: string;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  href,
  type = "button",
  disabled,
  onClick,
  target,
  rel,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
