import Link from "next/link";
import { Mail } from "lucide-react";

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-[#7ac943]/10 rounded-full p-3">
              <Mail className="h-6 w-6 text-[#7ac943]" />
            </div>
          </div>

          <h1 className="text-xl font-bold text-gray-900">
            Check your email
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            We&apos;ve sent you a confirmation link. Click it to activate your account.
          </p>

          <Link
            href="/auth/signin"
            className="inline-block mt-6 text-[#7ac943] font-semibold hover:underline text-sm"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}