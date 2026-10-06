"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { toast } from "react-hot-toast";

import CedarLogo from "@/component/user/CedarLogo";
import { useAuth } from "@/context/AuthContext";

interface AuthModalProps {
  mode: "login" | "register";
  setMode: (mode: "login" | "register") => void;
  onClose: () => void;
  onSuccess: () => void;
}

const INPUT =
  "w-full bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] px-3 py-3 text-sm text-[#ede4d4] outline-none focus:border-[#c4954a] transition-colors";

const BTN_PRIMARY =
  "w-full py-3.5 bg-[#c4954a] text-[#0c0a08] font-semibold hover:bg-[#d4a65a] transition-colors";

const AuthModal = ({
  mode,
  setMode,
  onClose,
  onSuccess
}: AuthModalProps) => {
  const { login, register } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /*
    Reset the form when switching between
    login and register.
  */
  useEffect(() => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm: "",
    });

    setError("");
  }, [mode]);

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));

      setError("");
    };

  /*
    LOGIN
  */
  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login({
        email: form.email,
        password: form.password,
      });

      toast.success("Welcome back!");

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Login error:", error);

      setError(
        error?.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
    REGISTER
  */
  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    setLoading(true);

    try {
      await register({
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        password: form.password,
    });

      toast.success(
        `Welcome to Cedar Court, ${form.firstName}!`
      );

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Registration error:", error);

      setError(
        error?.response?.data?.message ||
          "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/75 z-50"
        onClick={onClose}
      />

      {/* Modal wrapper */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-[#161310] border border-[rgba(196,149,74,0.2)] w-full max-w-md pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(196,149,74,0.12)]">
            <CedarLogo size="sm" />

            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-[#8a7d6a] hover:text-[#ede4d4] transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Login / Register tabs */}
          <div className="flex border-b border-[rgba(196,149,74,0.12)]">
            <button
              onClick={() => {
                setMode("login");
                setError("");
              }}
              className={`flex-1 py-3 text-xs font-['DM_Mono'] tracking-widest uppercase transition-colors ${
                mode === "login"
                  ? "text-[#c4954a] border-b-2 border-[#c4954a]"
                  : "text-[#8a7d6a] hover:text-[#ede4d4]"
              }`}
            >
              Sign In
            </button>

            <button
              onClick={() => {
                setMode("register");
                setError("");
              }}
              className={`flex-1 py-3 text-xs font-['DM_Mono'] tracking-widest uppercase transition-colors ${
                mode === "register"
                  ? "text-[#c4954a] border-b-2 border-[#c4954a]"
                  : "text-[#8a7d6a] hover:text-[#ede4d4]"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <div className="p-6">

            {/* Error */}
            {error && (
              <div className="bg-red-900/20 border border-red-800/50 text-red-400 text-xs font-['DM_Mono'] p-3 mb-4">
                {error}
              </div>
            )}

            {/* LOGIN */}
            {mode === "login" ? (
              <form
                onSubmit={handleLogin}
                className="space-y-4"
              >
                {/* Email */}
                <div>
                  <label className="block text-xs text-[#8a7d6a] mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={set("email")}
                    className={INPUT}
                    placeholder="you@example.com"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs text-[#8a7d6a] mb-2">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={
                        showPass
                          ? "text"
                          : "password"
                      }
                      required
                      value={form.password}
                      onChange={set("password")}
                      className={`${INPUT} pr-10`}
                      placeholder="••••••••"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPass((prev) => !prev)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a7d6a] hover:text-[#c4954a]"
                    >
                      {showPass ? (
                        <EyeOff size={14} />
                      ) : (
                        <Eye size={14} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember / Forgot */}
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-[#8a7d6a] cursor-pointer">
                    <input
                      type="checkbox"
                      className="accent-[#c4954a]"
                    />
                    Remember me
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      toast.info(
                        "Password reset coming soon."
                      )
                    }
                    className="text-[#c4954a] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`${BTN_PRIMARY} ${
                    loading
                      ? "opacity-60 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {loading
                    ? "Signing in..."
                    : "Sign In"}
                </button>
              </form>
            ) : (
              /* REGISTER */
              <form
                onSubmit={handleRegister}
                className="space-y-4"
              >
                {/* Names */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#8a7d6a] mb-2">
                      First Name
                    </label>

                    <input
                      type="text"
                      required
                      value={form.firstName}
                      onChange={set("firstName")}
                      className={INPUT}
                      placeholder="Victoria"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#8a7d6a] mb-2">
                      Last Name
                    </label>

                    <input
                      type="text"
                      required
                      value={form.lastName}
                      onChange={set("lastName")}
                      className={INPUT}
                      placeholder="Ashworth"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs text-[#8a7d6a] mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={set("email")}
                    className={INPUT}
                    placeholder="you@example.com"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs text-[#8a7d6a] mb-2">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={
                        showPass
                          ? "text"
                          : "password"
                      }
                      required
                      value={form.password}
                      onChange={set("password")}
                      className={`${INPUT} pr-10`}
                      placeholder="Min. 6 characters"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPass((prev) => !prev)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a7d6a] hover:text-[#c4954a]"
                    >
                      {showPass ? (
                        <EyeOff size={14} />
                      ) : (
                        <Eye size={14} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm password */}
                <div>
                  <label className="block text-xs text-[#8a7d6a] mb-2">
                    Confirm Password
                  </label>

                  <div className="relative">
                    <input
                      type={
                        showConfirmPass
                          ? "text"
                          : "password"
                      }
                      required
                      value={form.confirm}
                      onChange={set("confirm")}
                      className={`${INPUT} pr-10`}
                      placeholder="Repeat password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPass(
                          (prev) => !prev
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a7d6a] hover:text-[#c4954a]"
                    >
                      {showConfirmPass ? (
                        <EyeOff size={14} />
                      ) : (
                        <Eye size={14} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`${BTN_PRIMARY} ${
                    loading
                      ? "opacity-60 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {loading
                    ? "Creating account..."
                    : "Create Account"}
                </button>
              </form>
            )}

            {/* Switch mode */}
            <p className="text-center text-xs text-[#8a7d6a] mt-5">
              {mode === "login"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setMode(
                    mode === "login"
                      ? "register"
                      : "login"
                  );
                  setError("");
                }}
                className="text-[#c4954a] hover:underline"
              >
                {mode === "login"
                  ? "Create one"
                  : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal;