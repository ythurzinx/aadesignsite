import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { PROJECT_CATEGORIES } from "@/lib/types";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 50_000;
const TRUSTED_PROXY_HEADERS = new Set(["x-forwarded-for", "x-real-ip", "cf-connecting-ip"]);

class PayloadTooLargeError extends Error {}

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 160;
}

function validUrl(value: string) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const allowed = new Set([request.nextUrl.origin]);
  try {
    if (process.env.NEXT_PUBLIC_SITE_URL) allowed.add(new URL(process.env.NEXT_PUBLIC_SITE_URL).origin);
  } catch {
    // A malformed optional canonical URL must not widen the origin allowlist.
  }
  return allowed.has(origin);
}

function clientIdentifier(request: NextRequest) {
  const configuredHeader = process.env.TRUSTED_PROXY_IP_HEADER?.toLowerCase();
  const header = process.env.VERCEL
    ? "x-vercel-forwarded-for"
    : configuredHeader && TRUSTED_PROXY_HEADERS.has(configuredHeader)
      ? configuredHeader
      : null;
  return header ? request.headers.get(header)?.split(",")[0]?.trim() || "unknown" : "unknown";
}

async function readJsonBody(request: NextRequest) {
  const contentType = request.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase();
  if (contentType !== "application/json") throw new TypeError("unsupported_content_type");

  const declaredLength = request.headers.get("content-length");
  if (declaredLength) {
    const parsedLength = Number(declaredLength);
    if (!Number.isSafeInteger(parsedLength) || parsedLength < 0) throw new SyntaxError("invalid_content_length");
    if (parsedLength > MAX_BODY_BYTES) throw new PayloadTooLargeError();
  }

  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError("empty_body");
  const chunks: Uint8Array[] = [];
  let received = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new PayloadTooLargeError();
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  const parsed = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)) as unknown;
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new SyntaxError("invalid_json_object");
  return parsed as Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return NextResponse.json({ error: "Origem não autorizada." }, { status: 403 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return NextResponse.json({ error: "Formulário ainda não configurado. Use o WhatsApp." }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await readJsonBody(request);
  } catch (error) {
    if (error instanceof PayloadTooLargeError) {
      return NextResponse.json({ error: "Solicitação muito grande." }, { status: 413 });
    }
    if (error instanceof TypeError && error.message === "unsupported_content_type") {
      return NextResponse.json({ error: "Envie os dados como JSON." }, { status: 415 });
    }
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  if (text(body.website, 200)) return NextResponse.json({ ok: true });

  const ipHash = createHash("sha256")
    .update(`${clientIdentifier(request)}:${process.env.CONTACT_RATE_LIMIT_SALT || serviceKey}`)
    .digest("hex");
  const lead = {
    name: text(body.name, 100),
    company: text(body.company, 120) || null,
    phone: text(body.phone, 30),
    email: text(body.email, 160).toLowerCase(),
    project_type: text(body.projectType, 100),
    expected_date: text(body.expectedDate, 10) || null,
    city: text(body.city, 120),
    budget: text(body.budget, 80),
    description: text(body.description, 3000),
    reference_url: text(body.referenceUrl, 500) || null,
    consent: body.consent === "true" || body.consent === true
  };

  const allowedTypes = new Set<string>([
    ...PROJECT_CATEGORIES,
    "Produção audiovisual",
    "Vídeo institucional",
    "Social Content / Reels",
    "Fotografia",
    "Drone / FPV",
    "Cobertura de evento",
    "Documentário",
    "Pós-produção",
    "Outro"
  ]);

  if (
    lead.name.length < 2 ||
    lead.phone.length < 8 ||
    !validEmail(lead.email) ||
    !allowedTypes.has(lead.project_type) ||
    !lead.city ||
    !lead.budget ||
    lead.description.length < 20 ||
    !lead.consent ||
    !validUrl(lead.reference_url || "")
  ) {
    return NextResponse.json({ error: "Revise os campos obrigatórios." }, { status: 422 });
  }

  const supabase = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { error } = await supabase.rpc("submit_contact_lead", {
    p_identifier: ipHash,
    p_lead: lead
  });
  if (error) {
    if (error.code === "P0001" && error.message.includes("rate_limited")) {
      return NextResponse.json({ error: "Muitas tentativas. Aguarde alguns minutos." }, { status: 429 });
    }
    console.error("Contact persistence failed", { code: error.code });
    return NextResponse.json({ error: "Não foi possível salvar agora. Tente pelo WhatsApp." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
