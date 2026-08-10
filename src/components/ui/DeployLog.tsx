"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Line = {
  text: string;
  tone?: "prompt" | "ok" | "note" | "link" | "dim";
};

const lines: Line[] = [
  { text: "daddy deploy --prod", tone: "prompt" },
  { text: "types checked", tone: "ok" },
  { text: "412 tests passed", tone: "ok" },
  { text: "migrations applied", tone: "ok" },
  { text: "edge functions live in 12 regions", tone: "ok" },
  { text: "monitoring + alerts wired", tone: "ok" },
  { text: "https://yourproduct.com  ready in 38s", tone: "link" },
  { text: "# that's the whole handoff.", tone: "note" },
];

const toneClass: Record<NonNullable<Line["tone"]>, string> = {
  prompt: "text-bone",
  ok: "text-bone-dim",
  note: "text-brass-dim",
  link: "text-brass",
  dim: "text-mute",
};

/**
 * The page's signature moment: the site introduces itself the way the company
 * would — as a clean production deploy, printed line by line.
 */
export function DeployLog({ className }: { className?: string }) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(lines.length);
      return;
    }

    let index = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const tick = () => {
      index += 1;
      setVisible(index);
      if (index < lines.length) {
        timers.push(setTimeout(tick, index === 1 ? 620 : 320));
      }
    };

    timers.push(setTimeout(tick, 500));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      className={cn(
        "hairline relative overflow-hidden rounded-2xl bg-ink-900/80 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur",
        className,
      )}
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-bone/8 px-4 py-3">
        <span className="size-2.5 rounded-full bg-ink-600" />
        <span className="size-2.5 rounded-full bg-ink-600" />
        <span className="size-2.5 rounded-full bg-ink-600" />
        <span className="ml-2 font-mono text-[0.7rem] tracking-wide text-mute">
          production — daddy-cli
        </span>
      </div>

      <div className="px-4 py-5 font-mono text-[0.78rem] leading-7 sm:px-6 sm:text-[0.85rem]">
        {lines.map((line, i) => {
          const shown = i < visible;
          return (
            <div
              key={line.text}
              className={cn(
                "flex gap-2 transition-opacity duration-300",
                shown ? "opacity-100" : "opacity-0",
                toneClass[line.tone ?? "dim"],
              )}
              aria-hidden={!shown}
            >
              <span className="select-none text-mute">
                {line.tone === "prompt" ? "$" : line.tone === "note" ? " " : line.tone === "link" ? "→" : "✓"}
              </span>
              <span className={cn(line.tone === "note" && "italic")}>{line.text}</span>
            </div>
          );
        })}

        <div className="flex gap-2 text-mute">
          <span className="select-none">$</span>
          <span className="caret inline-block h-[1.05em] w-[0.55em] translate-y-[0.15em] bg-brass/80" />
        </div>
      </div>
    </div>
  );
}
