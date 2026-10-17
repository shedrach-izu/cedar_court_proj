"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Loader2, LockKeyhole } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "@/lib/api";

export default function ResetPasswordPage() {
  const params = useParams<{ token: string }>();
  const router = useRouter();

  const token = params.token;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("Your password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Your passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        `/authentication/reset-password/${encodeURIComponent(token)}`,
        { password }
      );

      toast.success(
        response.data?.message || "Your password has been reset successfully."
      );

      router.push("/login");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "The reset link may have expired. Please request a new one."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0c0a08] px-5 py-16 text-[#ede4d4]">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-[#8a7d6a] transition hover:text-[#c4954a]"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="mb-8">
          <p className="mb-3 font-['DM_Mono'] text-xs uppercase tracking-[0.3em] text-[#c4954a]">
            Cedar Court
          </p>

          <h1 className="mb-4 font-['Fraunces'] text-4xl">
            Create a new password
          </h1>

          <p className="text-sm leading-7 text-[#8a7d6a]">
            Choose a strong password for your account. Use at least 8
            characters.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-xs uppercase tracking-widest text-[#8a7d6a]"
            >
              New Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full border border-[#30281f] bg-[#161310] py-4 pl-11 pr-12 text-sm outline-none placeholder:text-[#625747] focus:border-[#c4954a]"
              />

              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8a7d6a] hover:text-[#c4954a]"
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-xs uppercase tracking-widest text-[#8a7d6a]"
            >
              Confirm New Password
            </label>

            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full border border-[#30281f] bg-[#161310] px-4 py-4 text-sm outline-none placeholder:text-[#625747] focus:border-[#c4954a]"
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
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-xs leading-6 text-[#8a7d6a]">
          For your security, only use a valid, unexpired reset link.
        </p>
      </div>
    </main>
  );
}