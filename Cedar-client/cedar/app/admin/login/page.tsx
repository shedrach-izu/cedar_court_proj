// "use client";

// import { useState } from "react";
// import { Lock, ArrowLeft } from "lucide-react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { toast } from "react-hot-toast";

// import CedarLogo from "@/component/user/CedarLogo";

// import api from "@/lib/api";

// import { useAuth } from "@/context/AuthContext";

// const INPUT = `
//   w-full
//   bg-[#0c0a08]
//   border
//   border-[rgba(196,149,74,0.15)]
//   px-3 py-3
//   text-sm
//   font-['Jost']
//   text-[#ede4d4]
//   outline-none
//   transition-colors
//   focus:border-[rgba(196,149,74,0.5)]
//   placeholder:text-[#8a7d6a]/50
// `;

// const LABEL = `
//   block
//   mb-2
//   text-[9px]
//   font-['DM_Mono']
//   text-[#8a7d6a]
//   tracking-[0.18em]
//   uppercase
// `;

// export default function AdminLogin() {
//   const router = useRouter();

//   const [email, setEmail] = useState("admin@cedarcourt.co.uk");
//   const [password, setPassword] = useState("admin123");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { login } = useAuth();

//   const handleSubmit = async (
//     e: React.FormEvent<HTMLFormElement>
//     ) => {
//     e.preventDefault();

//     setLoading(true);
//     setError("");

//     try {
//         const result = await login({ email, password });

//         if (result?.user?.role !== "admin") {
//         setError("This account does not have administrator access.");
//         toast.error("Administrator access required.");
//         return;
//         }

//         toast.success(result.message || "Welcome back, Admin!");

//         router.replace("/admin/dashboard");
//     } catch (error: any) {
//         const message =
//         error.response?.data?.message || "Unable to login.";

//         setError(message);
//         toast.error(message);
//     } finally {
//         setLoading(false);
//     }
//     };

// //   const handleSubmit = async (
// //     e: React.FormEvent<HTMLFormElement>
// //     ) => {
// //     e.preventDefault();

// //     setLoading(true);
// //     setError("");

// //     try {
// //         const response = await api.post("/admin/login", {
// //         email,
// //         password,
// //         });

// //         toast.success(response.data.message);

// //         router.push("/admin/dashboard");

// //     } catch (error: any) {
// //         const message =
// //         error.response?.data?.message ||
// //         "Unable to login";

// //         setError(message);
// //         toast.error(message);

// //     } finally {
// //         setLoading(false);
// //     }
// //    };

//   return (
//     <main className="min-h-screen bg-[#0c0a08] flex items-center justify-center px-5 py-10">
//       <div className="w-full max-w-md">

//         {/* ========================= */}
//         {/* LOGO */}
//         {/* ========================= */}

//         <div className="flex justify-center mb-8">
//           <CedarLogo />
//         </div>

//         {/* ========================= */}
//         {/* LOGIN CARD */}
//         {/* ========================= */}

//         <div className="bg-[#161310] border border-[rgba(196,149,74,0.2)] p-6 sm:p-8">

//           {/* LABEL */}

//           <div className="mb-2">
//             <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.2em] text-[#c4954a]">
//               Administration
//             </p>
//           </div>

//           {/* TITLE */}

//           <h1 className="font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
//             Admin Sign In
//           </h1>

//           <p className="mt-2 font-['Jost'] text-sm text-[#8a7d6a]">
//             Sign in to manage Cedar Court.
//           </p>

//           {/* ========================= */}
//           {/* ERROR */}
//           {/* ========================= */}

//           {error && (
//             <div className="mt-5 bg-red-900/20 border border-red-800/40 px-3 py-3">
//               <p className="text-xs font-['DM_Mono'] text-red-400">
//                 {error}
//               </p>
//             </div>
//           )}

//           {/* ========================= */}
//           {/* FORM */}
//           {/* ========================= */}

//           <form
//             onSubmit={handleSubmit}
//             className="mt-6 space-y-5"
//           >
//             {/* EMAIL */}

//             <div>
//               <label htmlFor="admin-email" className={LABEL}>
//                 Email Address
//               </label>

//               <input
//                 id="admin-email"
//                 type="email"
//                 required
//                 autoComplete="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className={INPUT}
//                 placeholder="admin@cedarcourt.co.uk"
//               />
//             </div>

//             {/* PASSWORD */}

//             <div>
//               <label htmlFor="admin-password" className={LABEL}>
//                 Password
//               </label>

//               <input
//                 id="admin-password"
//                 type="password"
//                 required
//                 autoComplete="current-password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className={INPUT}
//                 placeholder="••••••••"
//               />
//             </div>

//             {/* SUBMIT */}

//             <button
//               type="submit"
//               disabled={loading}
//               className="
//                 w-full
//                 mt-2
//                 py-3.5
//                 px-4
//                 bg-[#c4954a]
//                 text-[#0c0a08]
//                 font-['DM_Mono']
//                 text-[9px]
//                 tracking-[0.15em]
//                 uppercase
//                 flex
//                 items-center
//                 justify-center
//                 gap-2
//                 hover:bg-[#d4a55b]
//                 disabled:opacity-60
//                 disabled:cursor-not-allowed
//                 transition-colors
//               "
//             >
//               <Lock size={14} />

//               {loading ? "Signing in..." : "Access Dashboard"}
//             </button>
//           </form>

//           {/* ========================= */}
//           {/* DEMO CREDENTIALS */}
//           {/* ========================= */}

//           <div className="mt-5 pt-4 border-t border-[rgba(196,149,74,0.08)]">
//             <p className="text-center font-['DM_Mono'] text-[9px] text-[#8a7d6a]">
//               DEMO CREDENTIALS
//             </p>

//             <p className="mt-2 text-center font-['DM_Mono'] text-[10px] text-[#8a7d6a]">
//               admin@cedarcourt.co.uk
//             </p>

//             <p className="mt-1 text-center font-['DM_Mono'] text-[10px] text-[#8a7d6a]">
//               admin123
//             </p>
//           </div>
//         </div>

//         {/* ========================= */}
//         {/* BACK TO WEBSITE */}
//         {/* ========================= */}

//         <Link
//           href="/"
//           className="
//             mt-5
//             flex
//             items-center
//             justify-center
//             gap-2
//             text-[9px]
//             font-['DM_Mono']
//             tracking-[0.15em]
//             uppercase
//             text-[#8a7d6a]
//             hover:text-[#c4954a]
//             transition-colors
//           "
//         >
//           <ArrowLeft size={13} />
//           Back to Cedar Court
//         </Link>
//       </div>
//     </main>
//   );
// }










"use client";

import { useState } from "react";
import { Lock, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";

import CedarLogo from "@/component/user/CedarLogo";
import { useAuth } from "@/context/AuthContext";

const INPUT = `
  w-full
  bg-[#0c0a08]
  border
  border-[rgba(196,149,74,0.15)]
  px-3 py-3
  text-sm
  font-['Jost']
  text-[#ede4d4]
  outline-none
  transition-colors
  focus:border-[rgba(196,149,74,0.5)]
  placeholder:text-[#8a7d6a]/50
`;

const LABEL = `
  block
  mb-2
  text-[9px]
  font-['DM_Mono']
  text-[#8a7d6a]
  tracking-[0.18em]
  uppercase
`;

export default function AdminLogin() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("admin@cedarcourt.co.uk");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      // Authenticate through the shared AuthContext.
      // This should also update authUser for AdminLayout.
      const result = await login({
        email: email.trim(),
        password,
      });

      const user = result?.user;

      // Never allow a normal user to enter the admin dashboard.
      if (user?.role !== "admin") {
        setError(
          "This account does not have administrator access."
        );

        toast.error("Administrator access required.");

        // Clear any non-admin user that may have been set.
        // The dashboard must remain inaccessible to this account.
        // Do not call logout here unless your logout endpoint and
        // session behavior are intended to sign out this user.
        return;
      }

      toast.success(result?.message || "Welcome back, Admin!");

      // Replace the login page in browser history.
      router.replace("/admin/dashboard");
    } catch (err: unknown) {
      const requestError = err as {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
      };

      const message =
        requestError.response?.data?.message ||
        requestError.message ||
        "Unable to login. Please check your credentials and try again.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0c0a08] flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-md">
        {/* LOGO */}
        <div className="flex justify-center mb-8">
          <CedarLogo />
        </div>

        {/* LOGIN CARD */}
        <div className="bg-[#161310] border border-[rgba(196,149,74,0.2)] p-6 sm:p-8">
          {/* LABEL */}
          <div className="mb-2">
            <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.2em] text-[#c4954a]">
              Administration
            </p>
          </div>

          {/* TITLE */}
          <h1 className="font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
            Admin Sign In
          </h1>

          <p className="mt-2 font-['Jost'] text-sm text-[#8a7d6a]">
            Sign in to manage Cedar Court.
          </p>

          {/* ERROR MESSAGE */}
          {error && (
            <div
              role="alert"
              className="mt-5 bg-red-900/20 border border-red-800/40 px-3 py-3"
            >
              <p className="text-xs font-['DM_Mono'] text-red-400">
                {error}
              </p>
            </div>
          )}

          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* EMAIL */}
            <div>
              <label htmlFor="admin-email" className={LABEL}>
                Email Address
              </label>

              <input
                id="admin-email"
                name="email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={INPUT}
                placeholder="admin@cedarcourt.co.uk"
                disabled={loading}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label htmlFor="admin-password" className={LABEL}>
                Password
              </label>

              <input
                id="admin-password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={INPUT}
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                mt-2
                py-3.5
                px-4
                bg-[#c4954a]
                text-[#0c0a08]
                font-['DM_Mono']
                text-[9px]
                tracking-[0.15em]
                uppercase
                flex
                items-center
                justify-center
                gap-2
                hover:bg-[#d4a55b]
                disabled:opacity-60
                disabled:cursor-not-allowed
                transition-colors
              "
            >
              <Lock size={14} />

              {loading ? "Signing in..." : "Access Dashboard"}
            </button>
          </form>

          {/* DEMO CREDENTIALS */}
          <div className="mt-5 pt-4 border-t border-[rgba(196,149,74,0.08)]">
            <p className="text-center font-['DM_Mono'] text-[9px] text-[#8a7d6a]">
              DEMO CREDENTIALS
            </p>

            <p className="mt-2 text-center font-['DM_Mono'] text-[10px] text-[#8a7d6a]">
              admin@cedarcourt.co.uk
            </p>

            <p className="mt-1 text-center font-['DM_Mono'] text-[10px] text-[#8a7d6a]">
              admin123
            </p>
          </div>
        </div>

        {/* BACK TO WEBSITE */}
        <Link
          href="/"
          className="
            mt-5
            flex
            items-center
            justify-center
            gap-2
            text-[9px]
            font-['DM_Mono']
            tracking-[0.15em]
            uppercase
            text-[#8a7d6a]
            hover:text-[#c4954a]
            transition-colors
          "
        >
          <ArrowLeft size={13} />
          Back to Cedar Court
        </Link>
      </div>
    </main>
  );
}
