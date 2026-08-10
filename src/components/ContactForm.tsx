"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

const projectTypes = [
  "Full-stack web app",
  "Backend / API work",
  "Frontend build",
  "Solana / Web3",
  "Cloud & DevOps",
  "Maintenance & support",
  "Still figuring it out",
];

const budgets = [
  "Under $10k",
  "$10k – $30k",
  "$30k – $75k",
  "$75k+",
  "Retainer / ongoing",
];

const fieldClass =
  "w-full rounded-xl border border-bone/10 bg-ink-950/60 px-4 py-3 text-[0.95rem] text-bone placeholder:text-mute/60 transition-colors duration-200 focus:border-brass/50 focus:outline-none";

const labelClass =
  "mb-2 block font-mono text-[0.68rem] tracking-[0.16em] text-mute uppercase";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  /** The hero shell can hand a brief straight to this form: `contact <message>`. */
  useEffect(() => {
    const onPrefill = (event: Event) => {
      const { projectType, message } = (
        event as CustomEvent<{
          projectType?: string;
          message?: string;
        }>
      ).detail;
      const form = formRef.current;
      if (!form) return;

      if (projectType) {
        const select = form.elements.namedItem(
          "projectType",
        ) as HTMLSelectElement | null;
        if (
          select &&
          Array.from(select.options).some(
            (option) => option.value === projectType,
          )
        ) {
          select.value = projectType;
        }
      }
      if (message) {
        const textarea = form.elements.namedItem(
          "message",
        ) as HTMLTextAreaElement | null;
        if (textarea) textarea.value = message;
      }

      (form.elements.namedItem("name") as HTMLInputElement | null)?.focus();
    };

    window.addEventListener("daddy:prefill", onPrefill);
    return () => window.removeEventListener("daddy:prefill", onPrefill);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: { ok?: boolean; error?: string } = await response.json();

      if (!response.ok || !data.ok) {
        setStatus("error");
        setError(
          data.error ??
            "That didn't send. Try again, or email hello@daddysolutions.dev.",
        );
        return;
      }

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Network dropped on the way out. Try again in a moment.");
    }
  }

  if (status === "sent") {
    return (
      <div className="hairline flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl bg-ink-900/60 p-10 text-center">
        <span className="grid size-12 place-items-center rounded-full bg-brass text-ink-950">
          <Icon name="check" size={22} />
        </span>
        <h3 className="mt-6 text-2xl tracking-tight text-bone">
          Brief received.
        </h3>
        <p className="mt-3 max-w-sm text-[0.97rem] leading-relaxed text-mute">
          A senior engineer reads it today and replies within one business day —
          with questions, a rough shape, and an honest timeline.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 font-mono text-xs tracking-wide text-brass hover:underline"
        >
          Send another brief
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="hairline rounded-2xl bg-ink-900/60 p-6 backdrop-blur sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Your name
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="Alex Mercer"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="alex@company.com"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="projectType" className={labelClass}>
            What do you need
          </label>
          <select
            id="projectType"
            name="projectType"
            defaultValue={projectTypes[0]}
            className={fieldClass}
          >
            {projectTypes.map((type) => (
              <option key={type} value={type} className="bg-ink-900">
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="budget" className={labelClass}>
            Budget range
          </label>
          <select
            id="budget"
            name="budget"
            defaultValue={budgets[1]}
            className={fieldClass}
          >
            {budgets.map((budget) => (
              <option key={budget} value={budget} className="bg-ink-900">
                {budget}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelClass}>
            Tell Daddy what you need
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="What are you building, who is it for, and when does it need to be live?"
            className={cn(fieldClass, "resize-y")}
          />
        </div>
      </div>

      {/* honeypot — invisible to people, catchy for bots */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute size-0 opacity-0"
      />

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[0.7rem] leading-relaxed text-mute">
          One reply, from a human, within a business day.
        </p>
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send the brief"}
          {status !== "sending" && (
            <Icon
              name="arrowRight"
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          )}
        </Button>
      </div>

      {status === "error" && error && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-500/25 bg-red-500/8 px-4 py-3 text-sm text-red-200"
        >
          {error}
        </p>
      )}
    </form>
  );
}
