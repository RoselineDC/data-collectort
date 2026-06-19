import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/dashboard";

  console.log("🔵 Callback hit:", { code: !!code, token_hash: !!token_hash, type, origin });

  const supabase = await createClient();

  // ── OAuth flow (Google, GitHub) ─────────────────────────────────────────
  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    console.log("🔵 exchangeCodeForSession:", { user: data?.user?.email, error: error?.message });
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    console.error("❌ OAuth error:", error.message);
  }

  // ── Email confirmation / magic link flow ────────────────────────────────
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as "email" | "signup" | "recovery",
    });
    if (!error) {
      return NextResponse.redirect(`${origin}/auth/signin?confirmed=true`);
    }
    console.error("❌ OTP error:", error.message);
  }

  console.error("❌ Callback failed — redirecting to signin");
  return NextResponse.redirect(`${origin}/auth/signin?error=auth_failed`);
}