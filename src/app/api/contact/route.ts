import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Brief = {
  name?: string;
  email?: string;
  projectType?: string;
  budget?: string;
  message?: string;
  company_website?: string; // honeypot
};

/**
 * In-memory throttle. Good enough for a marketing form on a single instance —
 * swap for Redis/Upstash when this runs in more than one region.
 */
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "That's a lot of briefs in one minute. Give it sixty seconds." },
      { status: 429 },
    );
  }

  let body: Brief;
  try {
    body = (await request.json()) as Brief;
  } catch {
    return NextResponse.json({ ok: false, error: "We couldn't read that submission." }, { status: 400 });
  }

  // Bots fill hidden fields; people don't.
  if (body.company_website) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Add a name we can reply to." }, { status: 422 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "That email address looks off. Check it and resend." }, { status: 422 });
  }
  if (message.length < 12) {
    return NextResponse.json(
      { ok: false, error: "Give us a couple more lines about the project so the reply is useful." },
      { status: 422 },
    );
  }

  const brief = {
    receivedAt: new Date().toISOString(),
    name,
    email,
    projectType: body.projectType?.trim() || "Unspecified",
    budget: body.budget?.trim() || "Unspecified",
    message,
    source: ip,
  };

  // Wire this up to your provider of choice (Resend, Postmark, Slack, CRM…).
  // Keeping it a log means the form works out of the box in local dev.
  console.info("[contact] new brief", brief);

  return NextResponse.json({ ok: true });
}
