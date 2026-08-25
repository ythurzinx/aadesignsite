import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const next = request.nextUrl.searchParams.get("next") || "/admin";
  const fallback = new URL("/admin", request.nextUrl.origin);
  let destination = fallback;
  if (next.startsWith("/") && !next.includes("\\") && !/[\u0000-\u001f\u007f]/.test(next)) {
    try {
      const parsed = new URL(next, request.nextUrl.origin);
      if (parsed.origin === request.nextUrl.origin) destination = parsed;
    } catch {
      // Invalid destinations always fall back to the admin landing page.
    }
  }
  if (code) {
    const supabase = await createSupabaseServerClient();
    await supabase?.auth.exchangeCodeForSession(code);
  }
  return NextResponse.redirect(destination);
}
