"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { DeployLog } from "@/components/ui/DeployLog";
import { Icon } from "@/components/ui/Icon";
import type { TerminalHandle } from "@/components/ui/LiveTerminal";
import type { ShellEffect } from "@/lib/shell";
import { cn } from "@/lib/utils";

const LiveTerminal = dynamic(() => import("@/components/ui/LiveTerminal"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center font-mono text-xs text-mute">
      booting shell…
    </div>
  ),
});

const chips = [
  "help",
  "services",
  "solana",
  "stack",
  "deploy --prod",
  "contact",
];

export function TerminalPanel({ className }: { className?: string }) {
  const [live, setLive] = useState(false);
  const terminal = useRef<TerminalHandle>(null);

  /* Warm the chunk while the browser is idle so activation feels instant —
     but not on metered or slow connections. */
  useEffect(() => {
    if (live) return;

    type Connection = { saveData?: boolean; effectiveType?: string };
    const connection = (navigator as Navigator & { connection?: Connection })
      .connection;
    if (connection?.saveData || /2g/.test(connection?.effectiveType ?? ""))
      return;

    const warm = () => {
      void import("@/components/ui/LiveTerminal");
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(warm);
      return () => window.cancelIdleCallback(id);
    }

    const id = window.setTimeout(warm, 2500);
    return () => window.clearTimeout(id);
  }, [live]);

  const handleEffect = useCallback((effect: ShellEffect) => {
    if (effect.type === "navigate" || effect.type === "prefill") {
      const target = effect.type === "navigate" ? effect.target : "contact";
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      document
        .getElementById(target)
        ?.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        });
    }

    if (effect.type === "prefill") {
      window.dispatchEvent(
        new CustomEvent("daddy:prefill", {
          detail: { projectType: effect.projectType, message: effect.message },
        }),
      );
    }
  }, []);

  return (
    <div className={className}>
      <div className="hairline relative overflow-hidden rounded-2xl bg-ink-900/80 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-bone/8 px-4 py-3">
          <span className="size-2.5 rounded-full bg-ink-600" />
          <span className="size-2.5 rounded-full bg-ink-600" />
          <span className="size-2.5 rounded-full bg-ink-600" />
          <span className="ml-2 font-mono text-[0.7rem] tracking-wide text-mute">
            production — daddy-cli
          </span>

          {live ? (
            <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[0.62rem] tracking-[0.18em] text-mint uppercase">
              <span className="animate-pulse-dot size-1.5 rounded-full bg-mint" />
              live
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setLive(true)}
              className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-brass/25 bg-brass/[0.07] px-2.5 py-1 font-mono text-[0.62rem] tracking-[0.14em] text-brass uppercase transition-colors hover:bg-brass/15"
            >
              Take the wheel
              <Icon name="arrowRight" size={12} />
            </button>
          )}
        </div>

        {/* Fixed viewport. Both states occupy this exact box, so the height is
            reserved from first paint and activating the shell never reflows the
            hero. overflow-hidden clips any sub-pixel canvas spill on either axis. */}
        <div className="relative h-[19rem] overflow-hidden sm:h-[21rem]">
          {live ? (
            <LiveTerminal handleRef={terminal} onEffect={handleEffect} />
          ) : (
            <>
              <DeployLog />
              <button
                type="button"
                onClick={() => setLive(true)}
                aria-label="Start the interactive shell"
                className="absolute inset-0 cursor-text"
              />
            </>
          )}
        </div>
      </div>

      {/* Tap targets — discoverability on desktop, the whole interface on touch */}
      <div className="mt-3 flex flex-wrap gap-2">
        {chips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => {
              if (!live) {
                setLive(true);
                window.setTimeout(() => terminal.current?.submit(chip), 350);
                return;
              }
              terminal.current?.submit(chip);
            }}
            className={cn(
              "hairline rounded-full bg-ink-900/60 px-3 py-1.5 font-mono text-[0.72rem] text-bone-dim",
              "transition-colors duration-200 hover:border-brass/40 hover:text-brass",
            )}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
