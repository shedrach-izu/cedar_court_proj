// import React from "react";

// const CTA = () => {
//   const BTN_PRIMARY =
//     "bg-[#c4954a] text-[#0c0a08] font-['Jost'] font-semibold text-sm tracking-widest uppercase hover:bg-[#d4a55a] transition-colors";

//   return (
//     <div className="bg-[#0c0a08]">
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
//         <div className="bg-[#161310] border border-[rgba(196,149,74,0.15)] p-5 sm:p-8 md:p-10 lg:p-12 text-center">
          
//           {/* Section label */}
//           <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
//             <div className="h-px w-5 sm:w-8 bg-[#c4954a]" />

//             <span className="text-[10px] sm:text-xs font-['DM_Mono'] text-[#c4954a] tracking-[0.2em] sm:tracking-[0.3em] uppercase">
//               The Cedar Circle
//             </span>

//             <div className="h-px w-5 sm:w-8 bg-[#c4954a]" />
//           </div>

//           {/* Heading */}
//           <h2 className="font-['Fraunces'] text-2xl sm:text-3xl md:text-4xl text-[#ede4d4] mb-3">
//             Stay in Our World
//           </h2>

//           {/* Description */}
//           <p className="font-['Jost'] text-[#8a7d6a] mb-7 sm:mb-8 max-w-md mx-auto text-sm sm:text-base font-light leading-relaxed">
//             Exclusive offers, seasonal menus, and curated experiences for our
//             most discerning guests.
//           </p>

//           {/* Subscription form */}
//           <form
            
//             className="flex flex-col sm:flex-row max-w-md mx-auto gap-3 sm:gap-0"
//           >
//             <input
//               type="email"
//               name="email"
//               required
//               placeholder="your@email.com"
//               className="w-full min-w-0 flex-1 bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] sm:border-r-0 px-4 py-3.5 text-sm font-['Jost'] text-[#ede4d4] placeholder-[#8a7d6a]/40 focus:outline-none focus:border-[#c4954a]"
//             />

//             <button
//               type="submit"
//               className={`w-full sm:w-auto px-6 py-3.5 ${BTN_PRIMARY} whitespace-nowrap`}
//             >
//               Subscribe
//             </button>
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default CTA;












"use client";

import React, { useState } from "react";
import api from "@/lib/api";
import { toast } from "react-hot-toast";

const CTA = () => {
  const BTN_PRIMARY =
    "bg-[#c4954a] text-[#0c0a08] font-['Jost'] font-semibold text-sm tracking-widest uppercase hover:bg-[#d4a55a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post("/newsletter/subscribe", {
        email: normalizedEmail,
      });

      toast.success(
        response.data.message ||
          "Welcome to the Cedar Circle!"
      );

      setEmail("");
    } catch (error: any) {
      console.error("Newsletter subscription error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to subscribe right now. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0c0a08]">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="bg-[#161310] border border-[rgba(196,149,74,0.15)] p-5 sm:p-8 md:p-10 lg:p-12 text-center">
          {/* Section label */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
            <div className="h-px w-5 sm:w-8 bg-[#c4954a]" />

            <span className="text-[10px] sm:text-xs font-['DM_Mono'] text-[#c4954a] tracking-[0.2em] sm:tracking-[0.3em] uppercase">
              The Cedar Circle
            </span>

            <div className="h-px w-5 sm:w-8 bg-[#c4954a]" />
          </div>

          {/* Heading */}
          <h2 className="font-['Fraunces'] text-2xl sm:text-3xl md:text-4xl text-[#ede4d4] mb-3">
            Stay in Our World
          </h2>

          {/* Description */}
          <p className="font-['Jost'] text-[#8a7d6a] mb-7 sm:mb-8 max-w-md mx-auto text-sm sm:text-base font-light leading-relaxed">
            Exclusive offers, seasonal menus, and curated experiences for our
            most discerning guests.
          </p>

          {/* Subscription form */}
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row max-w-md mx-auto gap-3 sm:gap-0"
          >
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              maxLength={254}
              autoComplete="email"
              placeholder="your@email.com"
              disabled={isSubmitting}
              className="w-full min-w-0 flex-1 bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] sm:border-r-0 px-4 py-3.5 text-sm font-['Jost'] text-[#ede4d4] placeholder-[#8a7d6a]/40 focus:outline-none focus:border-[#c4954a] disabled:opacity-60"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto px-6 py-3.5 ${BTN_PRIMARY} whitespace-nowrap`}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          <p className="mt-4 text-xs font-['Jost'] text-[#8a7d6a]">
            By subscribing, you agree to receive Cedar Court updates. You can
            unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CTA;
