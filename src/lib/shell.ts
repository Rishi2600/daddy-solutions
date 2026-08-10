import {
  services,
  solanaCapabilities,
  stackGroups,
  steps,
} from "@/lib/content";
import { site } from "@/lib/site";

/* ------------------------------------------------------------------
   ANSI helpers — truecolour SGR so the shell uses the exact brand
   palette rather than the terminal's 16-colour approximation.
------------------------------------------------------------------- */
const RESET = "\x1b[0m";
const rgb = (r: number, g: number, b: number) => (text: string) =>
  `\x1b[38;2;${r};${g};${b}m${text}${RESET}`;

export const paint = {
  brass: rgb(240, 180, 94),
  bone: rgb(237, 233, 225),
  dim: rgb(185, 181, 173),
  mute: rgb(133, 131, 143),
  mint: rgb(20, 241, 149),
  violet: rgb(153, 69, 255),
  red: rgb(255, 107, 107),
  bold: (text: string) => `\x1b[1m${text}${RESET}`,
};

export const PROMPT = `${paint.mint("you")}${paint.mute("@")}${paint.brass("daddy")}${paint.mute(":~$ ")}`;

const pad = (text: string, width: number) => text.padEnd(width, " ");
const ok = (text: string) => `${paint.mint("✓")} ${paint.dim(text)}`;

/* ------------------------------------------------------------------
   Effects — anything the shell wants the page to do. The command layer
   stays pure; the renderer performs these.
------------------------------------------------------------------- */
export type ShellEffect =
  | { type: "clear" }
  | { type: "deploy" }
  | { type: "navigate"; target: string }
  | { type: "prefill"; projectType?: string; message?: string };

export type CommandResult = { lines: string[]; effect?: ShellEffect };

export type Command = {
  name: string;
  usage: string;
  summary: string;
  hidden?: boolean;
  run: (args: string[]) => CommandResult;
};

const SECTIONS: Record<string, string> = {
  services: "services",
  why: "why",
  process: "process",
  solana: "solana",
  web3: "solana",
  stack: "stack",
  contact: "contact",
  hire: "contact",
};

/** Lines replayed by the `deploy` command — the renderer times them out. */
export const deployScript: string[] = [
  ok("types checked"),
  ok("412 tests passed"),
  ok("migrations applied"),
  ok("edge functions live in 12 regions"),
  ok("monitoring + alerts wired"),
  `${paint.brass("→")} ${paint.brass("https://yourproduct.com")}${paint.mute("  ready in 38s")}`,
  paint.mute("  # that's the whole handoff."),
];

/* ------------------------------------------------------------------
   Commands — every one reads from src/lib/content.ts, so the terminal
   can never drift out of sync with the rest of the page.
------------------------------------------------------------------- */
export const commands: Command[] = [
  {
    name: "help",
    usage: "help",
    summary: "list every command",
    run: () => ({
      lines: [
        paint.bone("Available commands"),
        "",
        ...commands
          .filter((command) => !command.hidden)
          .map(
            (command) =>
              `  ${paint.brass(pad(command.usage, 22))}${paint.mute(command.summary)}`,
          ),
        "",
        paint.mute(
          "  Tab completes · ↑ ↓ walks history · Ctrl+C cancels · Ctrl+L clears",
        ),
      ],
    }),
  },
  {
    name: "services",
    usage: "services [name]",
    summary: "what we build",
    run: ([id]) => {
      if (!id) {
        return {
          lines: [
            paint.bone("Eight things we do:"),
            "",
            ...services.map(
              (service) =>
                `  ${paint.brass(pad(service.id, 12))}${paint.dim(service.title)}`,
            ),
            "",
            paint.mute("  services <name> for detail. Example: services web3"),
          ],
        };
      }

      const service = services.find((entry) => entry.id === id.toLowerCase());
      if (!service) {
        return {
          lines: [
            `${paint.red("not found:")} ${paint.dim(id)}`,
            paint.mute("Run `services` for the list."),
          ],
        };
      }

      return {
        lines: [
          paint.bold(paint.bone(service.title)),
          paint.dim(service.blurb),
          "",
          ...service.bullets.map(
            (bullet) => `  ${paint.brass("·")} ${paint.dim(bullet)}`,
          ),
        ],
      };
    },
  },
  {
    name: "stack",
    usage: "stack",
    summary: "technology we work in",
    run: () => ({
      lines: [
        ...stackGroups.flatMap((group) => [
          `  ${(group.core ? paint.brass : paint.mute)(pad(group.label.toUpperCase(), 16))}${paint.dim(group.items.join("  "))}`,
        ]),
        "",
        paint.mute(
          "  Using something else? We've probably inherited a codebase in it.",
        ),
      ],
    }),
  },
  {
    name: "process",
    usage: "process",
    summary: "how a project runs",
    run: () => ({
      lines: [
        ...steps.map(
          (step) =>
            `  ${paint.brass(step.n)}  ${paint.bone(pad(step.title, 10))}${paint.mute(pad(step.meta, 14))}${paint.dim(step.deliverable)}`,
        ),
        "",
        paint.mute(
          "  You're never more than seven days from seeing something real.",
        ),
      ],
    }),
  },
  {
    name: "solana",
    usage: "solana",
    summary: "on-chain capabilities",
    run: () => ({
      lines: [
        paint.violet("Solana / Web3"),
        "",
        ...solanaCapabilities.map(
          (capability) => `  ${paint.mint("◆")} ${paint.dim(capability.title)}`,
        ),
        "",
        paint.mute(
          "  Test suite, devnet dry run and a second senior review before mainnet.",
        ),
      ],
    }),
  },
  {
    name: "pricing",
    usage: "pricing",
    summary: "how engagements work",
    run: () => ({
      lines: [
        `  ${paint.mute(pad("Fixed scope", 22))}${paint.dim("quoted after a scoping call, no surprises")}`,
        `  ${paint.mute(pad("Retainer", 22))}${paint.dim("monthly, for ongoing build and maintenance")}`,
        `  ${paint.mute(pad("Minimum engagement", 22))}${paint.dim("2 weeks")}`,
        `  ${paint.mute(pad("Support SLA", 22))}${paint.dim("from 4 hours")}`,
        "",
        paint.mute("  Run `contact` and we'll put a real number on it."),
      ],
    }),
  },
  {
    name: "deploy",
    usage: "deploy --prod",
    summary: "ship it",
    run: (args) =>
      args.includes("--prod")
        ? { lines: [], effect: { type: "deploy" } }
        : {
            lines: [
              paint.mute(
                "Staging is fine, but you came here for the real thing.",
              ),
              paint.mute("Try: deploy --prod"),
            ],
          },
  },
  {
    name: "open",
    usage: "open <section>",
    summary: "jump to a section of the page",
    run: ([target]) => {
      const section = target ? SECTIONS[target.toLowerCase()] : undefined;
      if (!section) {
        return {
          lines: [
            paint.mute(
              `Sections: ${Object.keys(SECTIONS).slice(0, 6).join(", ")}`,
            ),
          ],
        };
      }
      return {
        lines: [paint.dim(`Scrolling to #${section}…`)],
        effect: { type: "navigate", target: section },
      };
    },
  },
  {
    name: "contact",
    usage: "contact [message]",
    summary: "start a project brief",
    run: (args) => ({
      lines: [
        paint.dim("Opening the brief form…"),
        paint.mute(`Or just email ${site.contact.email}`),
      ],
      effect: { type: "prefill", message: args.join(" ") || undefined },
    }),
  },
  {
    name: "hire",
    usage: "hire",
    summary: "same as contact, more direct",
    hidden: true,
    run: () => ({
      lines: [paint.brass("Good answer.")],
      effect: { type: "prefill" },
    }),
  },
  {
    name: "whoami",
    usage: "whoami",
    summary: "who's who around here",
    run: () => ({
      lines: [
        paint.bone("you"),
        paint.mute("You brought the idea. That makes you the important one."),
      ],
    }),
  },
  {
    name: "ls",
    usage: "ls",
    summary: "list what's on this machine",
    run: () => ({
      lines: [
        `  ${paint.brass("services/")}   ${paint.brass("process/")}   ${paint.brass("solana/")}   ${paint.brass("stack/")}   ${paint.dim("pricing.md")}   ${paint.dim("contact.md")}`,
      ],
    }),
  },
  {
    name: "cat",
    usage: "cat <file>",
    summary: "read a file",
    hidden: true,
    run: ([file]) => {
      if (!file)
        return { lines: [paint.mute("cat: needs a filename. Try `ls`.")] };
      const key = file.replace(/\.md$|\/$/g, "").toLowerCase();
      const command = commands.find((entry) => entry.name === key);
      if (command) return command.run([]);
      return {
        lines: [`${paint.red("cat:")} ${paint.dim(file)}: no such file`],
      };
    },
  },
  {
    name: "sudo",
    usage: "sudo <command>",
    summary: "escalate privileges",
    hidden: true,
    run: () => ({
      lines: [
        paint.red("Permission denied."),
        paint.mute("Daddy has the root password. Always has."),
      ],
    }),
  },
  {
    name: "rm",
    usage: "rm -rf /",
    summary: "delete everything",
    hidden: true,
    run: () => ({
      lines: [
        paint.mute(
          "Nice try. Backups run every six hours and the snapshots are immutable.",
        ),
        ok("nothing happened"),
      ],
    }),
  },
  {
    name: "exit",
    usage: "exit",
    summary: "leave",
    hidden: true,
    run: () => ({
      lines: [paint.mute("You can't really leave. We do maintenance.")],
    }),
  },
  {
    name: "clear",
    usage: "clear",
    summary: "clear the screen",
    run: () => ({ lines: [], effect: { type: "clear" } }),
  },
];

export const commandNames = commands.map((command) => command.name);

export function banner(): string[] {
  return [
    `${paint.brass("Daddy Solutions")} ${paint.mute("interactive shell · v1.4.2")}`,
    paint.mute(
      `Connected to ${site.url.replace("https://", "")} — read-only, obviously.`,
    ),
    "",
    `${paint.mute("Type")} ${paint.brass("help")} ${paint.mute("to see what this thing does.")}`,
    "",
  ];
}

export function runCommand(input: string): CommandResult {
  const [name, ...args] = input.trim().split(/\s+/);
  if (!name) return { lines: [] };

  const command = commands.find((entry) => entry.name === name.toLowerCase());
  if (!command) {
    return {
      lines: [
        `${paint.red("command not found:")} ${paint.dim(name)}`,
        paint.mute("Run `help`. Daddy doesn't guess."),
      ],
    };
  }

  return command.run(args);
}

/** Longest common prefix completion over command names. */
export function complete(input: string): string | null {
  const matches = commandNames.filter(
    (name) => name.startsWith(input) && input.length > 0,
  );
  if (matches.length === 0) return null;
  if (matches.length === 1) return `${matches[0]} `;

  let prefix = matches[0];
  for (const match of matches) {
    while (!match.startsWith(prefix)) prefix = prefix.slice(0, -1);
  }
  return prefix;
}
