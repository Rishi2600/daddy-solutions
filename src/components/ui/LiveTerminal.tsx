"use client";

import { useEffect, useImperativeHandle, useRef, type Ref } from "react";
import { FitAddon } from "@xterm/addon-fit";
import { WebLinksAddon } from "@xterm/addon-web-links";
import { Terminal as XTerm } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import {
  PROMPT,
  banner,
  complete,
  deployScript,
  paint,
  runCommand,
  type ShellEffect,
} from "@/lib/shell";

export type TerminalHandle = {
  focus: () => void;
  submit: (line: string) => void;
};

type Props = {
  /** Imperative handle so the chips below the terminal can drive it. */
  handleRef?: Ref<TerminalHandle>;
  onEffect?: (effect: ShellEffect) => void;
};

/**
 * xterm.js is a renderer, not a shell — the command layer lives in
 * `src/lib/shell.ts`. This file only owns line editing and I/O.
 *
 * Loaded lazily by TerminalPanel, so none of it (≈90 kB gzipped with addons)
 * is in the initial bundle.
 */
export default function LiveTerminal({ handleRef, onEffect }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<XTerm | null>(null);
  const apiRef = useRef<TerminalHandle | null>(null);

  useImperativeHandle(handleRef, () => ({
    focus: () => apiRef.current?.focus(),
    submit: (line: string) => apiRef.current?.submit(line),
  }));

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // next/font generates a hashed family name — read it off the CSS variable
    // so the terminal uses the same mono face as the rest of the page.
    const mono =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--font-jetbrains")
        .trim() || "JetBrains Mono";

    const term = new XTerm({
      convertEol: true,
      cursorBlink: true,
      cursorStyle: "bar",
      fontFamily: `${mono}, ui-monospace, SFMono-Regular, monospace`,
      fontSize: 13,
      lineHeight: 1.5,
      letterSpacing: 0,
      scrollback: 600,
      allowTransparency: true,
      smoothScrollDuration: 0,
      theme: {
        background: "rgba(0,0,0,0)",
        foreground: "#b9b5ad",
        cursor: "#f0b45e",
        cursorAccent: "#08080a",
        selectionBackground: "rgba(240,180,94,0.28)",
        black: "#08080a",
        red: "#ff6b6b",
        green: "#14f195",
        yellow: "#f0b45e",
        blue: "#9945ff",
        magenta: "#c98f3d",
        cyan: "#14f195",
        white: "#ede9e1",
        brightBlack: "#85838f",
        brightWhite: "#ffffff",
      },
    });

    const fit = new FitAddon();
    term.loadAddon(fit);
    term.loadAddon(new WebLinksAddon());
    term.open(host);
    fit.fit();
    termRef.current = term;

    /* ---------------- line editing state ---------------- */
    let buffer = "";
    let cursor = 0;
    let busy = false;
    const history: string[] = [];
    let historyIndex = -1;

    const write = (lines: string[]) =>
      lines.forEach((line) => term.writeln(line));
    const prompt = () => term.write(`\r\n${PROMPT}`);

    const redraw = () => {
      term.write(`\r\x1b[K${PROMPT}${buffer}`);
      const back = buffer.length - cursor;
      if (back > 0) term.write(`\x1b[${back}D`);
    };

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const playDeploy = () => {
      busy = true;
      const step = (index: number) => {
        if (index >= deployScript.length) {
          busy = false;
          prompt();
          return;
        }
        term.writeln(deployScript[index]);
        window.setTimeout(() => step(index + 1), reduced ? 0 : 260);
      };
      term.writeln(paint.mute("building…"));
      window.setTimeout(() => step(0), reduced ? 0 : 400);
    };

    const submit = (line: string) => {
      if (busy) return;
      term.writeln("");

      const trimmed = line.trim();
      if (trimmed) {
        history.unshift(trimmed);
        historyIndex = -1;
      }

      buffer = "";
      cursor = 0;

      if (!trimmed) {
        term.write(PROMPT);
        return;
      }

      const { lines, effect } = runCommand(trimmed);

      if (effect?.type === "clear") {
        term.clear();
        term.write(PROMPT);
        return;
      }

      write(lines);

      if (effect?.type === "deploy") {
        playDeploy();
        return;
      }
      if (effect) onEffect?.(effect);

      prompt();
    };

    /* ---------------- input ---------------- */
    const disposable = term.onData((data) => {
      if (busy) return;

      switch (data) {
        case "\r": // Enter
          submit(buffer);
          return;
        case "\u0003": // Ctrl+C
          term.write(`${paint.mute("^C")}`);
          buffer = "";
          cursor = 0;
          prompt();
          return;
        case "\u000c": // Ctrl+L
          term.clear();
          redraw();
          return;
        case "\u007f": // Backspace
          if (cursor > 0) {
            buffer = buffer.slice(0, cursor - 1) + buffer.slice(cursor);
            cursor -= 1;
            redraw();
          }
          return;
        case "\t": {
          const completion = complete(buffer);
          if (completion) {
            buffer = completion;
            cursor = buffer.length;
            redraw();
          }
          return;
        }
        case "\u001b[A": // ↑
          if (history.length && historyIndex < history.length - 1) {
            historyIndex += 1;
            buffer = history[historyIndex];
            cursor = buffer.length;
            redraw();
          }
          return;
        case "\u001b[B": // ↓
          if (historyIndex > 0) {
            historyIndex -= 1;
            buffer = history[historyIndex];
          } else {
            historyIndex = -1;
            buffer = "";
          }
          cursor = buffer.length;
          redraw();
          return;
        case "\u001b[D": // ←
          if (cursor > 0) {
            cursor -= 1;
            term.write("\x1b[D");
          }
          return;
        case "\u001b[C": // →
          if (cursor < buffer.length) {
            cursor += 1;
            term.write("\x1b[C");
          }
          return;
        case "\u001b[H": // Home
          cursor = 0;
          redraw();
          return;
        case "\u001b[F": // End
          cursor = buffer.length;
          redraw();
          return;
        default:
          // printable characters only
          if (data >= " " && data !== "\u007f") {
            buffer = buffer.slice(0, cursor) + data + buffer.slice(cursor);
            cursor += data.length;
            redraw();
          }
      }
    });

    apiRef.current = {
      focus: () => term.focus(),
      submit: (line: string) => {
        if (busy) return;
        term.write(line);
        submit(line);
        term.focus();
      },
    };

    /* ---------------- boot ---------------- */
    write(banner());
    term.write(PROMPT);
    term.focus();

    const observer = new ResizeObserver(() => {
      try {
        fit.fit();
      } catch {
        /* element hidden — nothing to fit */
      }
    });
    observer.observe(host);

    return () => {
      observer.disconnect();
      disposable.dispose();
      term.dispose();
      termRef.current = null;
      apiRef.current = null;
    };
  }, [onEffect]);

  return (
    <div
      ref={hostRef}
      className="h-full w-full overflow-hidden px-2 py-3 sm:px-3"
      aria-label="Daddy Solutions interactive shell"
    />
  );
}
