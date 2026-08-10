import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const PATTERN =
  /(\/\/[^\n]*)|(#\[[^\]]*\])|("(?:[^"\\]|\\.)*")|\b(pub|fn|mod|use|let|mut|struct|impl|match|super|crate|const|async|await|export|return)\b|\b(u64|u8|bool|Result|Ok|Err|Context|Pubkey|Vec|String)\b|\b(\d+)\b/g;

const tone = [
  "text-mute italic", // comment
  "text-violet", // attribute macro
  "text-brass", // string
  "text-mint", // keyword
  "text-bone", // type
  "text-brass-dim", // number
];

function highlight(code: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  PATTERN.lastIndex = 0;
  while ((match = PATTERN.exec(code)) !== null) {
    if (match.index > last) nodes.push(code.slice(last, match.index));
    const groupIndex = match.slice(1).findIndex(Boolean);
    nodes.push(
      <span key={key++} className={tone[groupIndex] ?? ""}>
        {match[0]}
      </span>,
    );
    last = match.index + match[0].length;
  }
  if (last < code.length) nodes.push(code.slice(last));
  return nodes;
}

export function CodeBlock({
  code,
  filename,
  className,
}: {
  code: string;
  filename?: string;
  className?: string;
}) {
  return (
    <div className={cn("hairline overflow-hidden rounded-2xl bg-ink-950/70 backdrop-blur", className)}>
      {filename && (
        <div className="flex items-center justify-between border-b border-bone/8 px-4 py-2.5">
          <span className="font-mono text-[0.7rem] text-mute">{filename}</span>
          <span className="font-mono text-[0.62rem] tracking-[0.18em] text-mint/70 uppercase">
            mainnet
          </span>
        </div>
      )}
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[0.74rem] leading-6 text-bone-dim sm:px-5 sm:text-[0.8rem]">
        <code>{highlight(code)}</code>
      </pre>
    </div>
  );
}
