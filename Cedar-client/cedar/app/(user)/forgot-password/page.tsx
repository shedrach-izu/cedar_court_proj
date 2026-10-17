"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/authentication/forgot-password", {
        email: email.trim(),
      });

      toast.success(
        response.data?.message ||
          "If an account exists for that email, password reset instructions will be sent."
      );

      setSubmitted(true);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Unable to process your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0c0a08] px-5 py-16 text-[#ede4d4] flex items-center justify-center">
      <div className="w-full max-w-md">
        <Link
          href="/login"
          className="mb-10 inline-flex items-center gap-2 text-sm text-[#8a7d6a] hover:text-[#c4954a] transition"
        >
          <ArrowLeft size={16} />
          Back to login
        </Link>

        <div className="mb-8">
          <p className="mb-3 font-['DM_Mono'] text-xs uppercase tracking-[0.3em] text-[#c4954a]">
            Cedar Court
          </p>

          <h1 className="mb-4 font-['Fraunces'] text-4xl">
            Forgot your password?
          </h1>

          <p className="text-sm leading-7 text-[#8a7d6a]">
            No worries. Enter the email address associated with your account
            and we&apos;ll send you instructions to reset your password.
          </p>
        </div>

        {submitted ? (
          <div className="border border-[#c4954a]/30 bg-[#161310] p-6">
            <Mail className="mb-4 text-[#c4954a]" size={28} />

            <h2 className="mb-3 font-['Fraunces'] text-xl">
              Check your email
            </h2>

            <p className="mb-6 text-sm leading-6 text-[#8a7d6a]">
              If an account exists for {email}, you should receive password
              reset instructions shortly. Check your spam folder too.
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="text-sm text-[#c4954a] underline underline-offset-4"
            >
              Try another email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs uppercase tracking-widest text-[#8a7d6a]"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-[#30281f] bg-[#161310] px-4 py-4 text-sm text-[#ede4d4] outline-none transition placeholder:text-[#625747] focus:border-[#c4954a]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 bg-[#c4954a] px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#0c0a08] transition hover:bg-[#d4a55a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        )}

        <p className="mt-8 text-center text-sm text-[#8a7d6a]">
          Remember your password?{" "}
          <Link
            href="/login"
            className="text-[#c4954a] hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}