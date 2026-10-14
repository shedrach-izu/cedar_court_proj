"use client";

import { useEffect, useState, FormEvent } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "react-hot-toast";

import api from "@/lib/api";

type ProfileUser = {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await api.get("/authentication/me");
        const currentUser = response.data.user as ProfileUser;

        setUser(currentUser);

        const nameParts = (currentUser.name || "").trim().split(/\s+/);

        setFirstName(nameParts[0] || "");
        setLastName(nameParts.slice(1).join(" "));
        setEmail(currentUser.email || "");
      } catch (error) {
        console.error("Unable to load profile:", error);
        setLoadError(true);
      } finally {
        setLoading(false);
      }
    };

    void loadProfile();
  }, []);

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      toast.error("First name, last name, and email are required.");
      return;
    }

    setSaving(true);

    try {
      const fullName = `${firstName.trim()} ${lastName.trim()}`;

      const response = await api.put("/authentication/profile", {
        name: fullName,
        email: email.trim(),
      });

      const updatedUser = response.data.user as ProfileUser;

      setUser(updatedUser);

      const nameParts = (updatedUser.name || "").trim().split(/\s+/);

      setFirstName(nameParts[0] || "");
      setLastName(nameParts.slice(1).join(" "));
      setEmail(updatedUser.email || "");

      toast.success("Profile updated successfully.");
    } catch (error: unknown) {
      console.error("Unable to update profile:", error);

      const message =
        typeof error === "object" && error !== null && "response" in error
          ? (
              error as {
                response?: { data?: { message?: string } };
              }
            ).response?.data?.message
          : undefined;

      toast.error(message || "Unable to update your profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0c0a08] px-5 pt-28 text-[#ede4d4]">
        <div className="flex items-center justify-center gap-3 py-20 text-sm text-[#8a7d6a]">
          <LoaderCircle size={18} className="animate-spin text-[#c4954a]" />
          Loading your profile...
        </div>
      </main>
    );
  }

  if (loadError || !user) {
    return (
      <main className="min-h-screen bg-[#0c0a08] px-5 pt-28 text-[#ede4d4]">
        <div className="mx-auto max-w-xl border border-[#34291c] bg-[#161310] p-8 text-center">
          <h1 className="font-['Fraunces'] text-2xl">
            Profile unavailable
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#8a7d6a]">
            We could not load your profile. Please sign in again and try once
            more.
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 bg-[#c4954a] px-6 py-3 font-['DM_Mono'] text-[10px] uppercase tracking-widest text-[#0c0a08] transition hover:bg-[#d6a85d]"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <main className="min-h-screen bg-[#0c0a08] px-5 pb-16 pt-28 text-[#ede4d4] sm:pt-28">
      <section className="mx-auto w-full max-w-[562px]">
        {/* Page heading */}
        <div className="mb-7">
          <p className="flex items-center gap-2 font-['DM_Mono'] text-[10px] uppercase tracking-[0.3em] text-[#c4954a]">
            <span className="h-px w-7 bg-[#c4954a]" />
            My Account
          </p>

          <h1 className="mt-2 font-['Fraunces'] text-3xl font-semibold tracking-tight text-[#ede4d4]">
            My Profile
          </h1>
        </div>

        {/* Profile form */}
        <form
          onSubmit={handleSave}
          className="border border-[#34291c] bg-[#161310] p-5 sm:p-[22px]"
        >
          {/* Avatar and account information */}
          <div className="flex items-center gap-4 border-b border-[#30281f] pb-4">
            <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center border border-[#5a4527] bg-[#302619] font-['Fraunces'] text-base text-[#c4954a]">
              {initials || "CC"}
            </div>

            <div className="min-w-0">
              <h2 className="truncate font-['Fraunces'] text-lg font-semibold text-[#ede4d4]">
                {user.name}
              </h2>

              <p className="mt-0.5 break-all text-xs tracking-wide text-[#8a7d6a]">
                {user.email}
              </p>
            </div>
          </div>

          {/* First name */}
          <div className="mt-4">
            <label
              htmlFor="firstName"
              className="mb-2 block font-['DM_Mono'] text-[9px] uppercase tracking-[0.16em] text-[#8a7d6a]"
            >
              First Name
            </label>

            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
              autoComplete="given-name"
              placeholder="Enter your first name"
              className="h-[41px] w-full border border-[#34291c] bg-[#0c0a08] px-3.5 text-xs text-[#ede4d4] outline-none transition-colors placeholder:text-[#5d5346] focus:border-[#c4954a]"
            />
          </div>

          {/* Last name */}
          <div className="mt-4">
            <label
              htmlFor="lastName"
              className="mb-2 block font-['DM_Mono'] text-[9px] uppercase tracking-[0.16em] text-[#8a7d6a]"
            >
              Last Name
            </label>

            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
              autoComplete="family-name"
              placeholder="Enter your last name"
              className="h-[41px] w-full border border-[#34291c] bg-[#0c0a08] px-3.5 text-xs text-[#ede4d4] outline-none transition-colors placeholder:text-[#5d5346] focus:border-[#c4954a]"
            />
          </div>

          {/* Email */}
          <div className="mt-4">
            <label
              htmlFor="email"
              className="mb-2 block font-['DM_Mono'] text-[9px] uppercase tracking-[0.16em] text-[#8a7d6a]"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              placeholder="Enter your email address"
              className="h-[41px] w-full border border-[#34291c] bg-[#0c0a08] px-3.5 text-xs text-[#ede4d4] outline-none transition-colors placeholder:text-[#5d5346] focus:border-[#c4954a]"
            />
          </div>

          {/* Save button */}
          <button
            type="submit"
            disabled={saving}
            className="mt-4 flex h-[44px] w-full items-center justify-center gap-2 bg-[#c4954a] font-['DM_Mono'] text-[11px] font-medium uppercase tracking-[0.13em] text-[#0c0a08] transition-colors hover:bg-[#d6a85d] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving && (
              <LoaderCircle size={15} className="animate-spin" />
            )}

            {saving ? "Saving Changes..." : "Save Changes"}
          </button>
        </form>
      </section>
    </main>
  );
}
