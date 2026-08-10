import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Daddy Solutions — home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span className="relative grid size-8 place-items-center rounded-lg bg-brass text-ink-950 transition-transform duration-300 group-hover:-rotate-6">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 2.5h4.5A5.5 5.5 0 0 1 7.5 13.5H3V2.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M6.2 6.2h1.4v3.6H6.2z" fill="currentColor" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-semibold tracking-tight text-bone">
          Daddy Solutions
        </span>
        {!compact && (
          <span className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-mute">
            software · cloud · web3
          </span>
        )}
      </span>
    </Link>
  );
}
