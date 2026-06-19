"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail]       = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: call your API to send a reset email
    // await fetch("/api/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) })
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7ac943]">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <rect x="1" y="1" width="6" height="6" rx="1" fill="white"/>
                  <rect x="9" y="1" width="6" height="6" rx="1" fill="white" fillOpacity="0.6"/>
                  <rect x="1" y="9" width="6" height="6" rx="1" fill="white" fillOpacity="0.6"/>
                  <rect x="9" y="9" width="6" height="6" rx="1" fill="white"/>
                </svg>
              </span>
              <div className="flex flex-col leading-none">
                <span className="text-base font-bold tracking-tight text-gray-900">Data Collector</span>
                <span className="text-[10px] text-gray-400 tracking-wide">Data Collection</span>
              </div>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Reset your password</h1>
            <p className="text-sm text-gray-500 mt-1 text-center">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          {submitted ? (
            // Success state
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7ac943]/10">
                <svg className="h-6 w-6 text-[#7ac943]" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-900">Check your email</p>
                <p className="text-sm text-gray-500 mt-1">
                  We sent a reset link to <span className="font-medium text-gray-700">{email}</span>
                </p>
              </div>
              <Link href="/auth/signin"
                className="text-sm text-[#7ac943] font-semibold hover:underline mt-2">
                Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#7ac943] focus:ring-1 focus:ring-[#7ac943] transition-colors"
                />
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-[#7ac943] hover:bg-[#6ab535] disabled:opacity-60 transition-colors text-white text-sm font-bold tracking-wide uppercase px-6 py-3.5 rounded-lg">
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              <p className="text-center text-sm text-gray-500">
                Remember your password?{" "}
                <Link href="/auth/signin" className="text-[#7ac943] font-semibold hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}