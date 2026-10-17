// import React from 'react'
// //import { BTN_PRIMARY, BTN_OUTLINE } from '@/constants';
// import HeroImage from '@/public/cedar_hero.jpg';
// import SectionLabel from './SectionLabel';
// import Link from "next/link";
// const Hero = () => {
//     const BTN_PRIMARY = "bg-[#c4954a] text-[#0c0a08] font-['Jost'] font-semibold text-sm tracking-widest uppercase hover:bg-[#d4a55a] transition-colors";
//     const BTN_OUTLINE = "border border-[rgba(196,149,74,0.3)] text-[#ede4d4] font-['Jost'] text-sm tracking-widest uppercase hover:border-[#c4954a] hover:text-[#c4954a] transition-all";
//   return (
//     <div>
//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//         <div className="absolute inset-0">
//           <img src={HeroImage.src} alt="Cedar Court" className="w-full h-full object-cover" />
//           <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a08]/92 via-[#0c0a08]/55 to-[#0c0a08]/20" />
//           <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a08]/80 via-transparent to-transparent" />
//         </div>
//         <div className="relative max-w-4xl mx-auto px-6 text-center">
//           <SectionLabel text="Welcome to Cedar Court" />
//           <h1 className="font-['Fraunces'] text-5xl sm:text-6xl lg:text-7xl text-[#ede4d4] leading-tight mb-6">
//             Premium Serviced<br /><em className="text-[#c4954a] not-italic">Apartments</em> in Enugu
//           </h1>
//           <p className="text-lg font-['Jost'] text-[#ede4d4]/70 max-w-2xl mx-auto mb-10 leading-relaxed">
//             Three en-suite bedrooms, fully equipped kitchens, and all the comforts of home — in the heart of Nsukka.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link className={`px-8 py-4 ${BTN_PRIMARY}`} href="/apartments">
//               View Apartments
//             </Link>
//             <Link className={`px-8 py-4 ${BTN_OUTLINE}`} href="/menu">
//               Explore Menu
//             </Link>
//           </div>
//         </div>
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
//           <div className="w-px h-12 bg-[#c4954a]/50" />
//           <span className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest">SCROLL</span>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default Hero











import React from "react";
import HeroImage from "@/public/cedar_hero.jpg";
import SectionLabel from "./SectionLabel";
import Link from "next/link";

const Hero = () => {
  const BTN_PRIMARY =
    "bg-[#c4954a] text-[#0c0a08] font-['Jost'] font-semibold text-sm tracking-widest uppercase hover:bg-[#d4a55a] transition-colors";

  const BTN_OUTLINE =
    "border border-[rgba(196,149,74,0.3)] text-[#ede4d4] font-['Jost'] text-sm tracking-widest uppercase hover:border-[#c4954a] hover:text-[#c4954a] transition-all";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image and overlays */}
      <div className="absolute inset-0">
        <img
          src={HeroImage.src}
          alt="Cedar Court"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a08]/92 via-[#0c0a08]/55 to-[#0c0a08]/20" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a08]/80 via-transparent to-transparent" />
      </div>

      {/* Hero content */}
      <div
        className="
          relative z-10 w-full max-w-4xl mx-auto
          px-5 sm:px-6
          pt-20 pb-24
          sm:pt-16 sm:pb-20
          md:py-0
          text-center
        "
      >
        <SectionLabel text="Welcome to Cedar Court" />

        <h1
          className="
            font-['Fraunces']
            text-4xl sm:text-5xl lg:text-7xl
            text-[#ede4d4]
            leading-tight
            mb-5 sm:mb-6
          "
        >
          Premium Serviced
          <br />
          <em className="text-[#c4954a] not-italic">Apartments</em> in Enugu
        </h1>

        <p
          className="
            text-base sm:text-lg
            font-['Jost']
            text-[#ede4d4]/80
            max-w-2xl mx-auto
            mb-7 sm:mb-10
            leading-relaxed
          "
        >
          Three en-suite bedrooms, fully equipped kitchens, and all the
          comforts of home — in the heart of Nsukka.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            className={`${BTN_PRIMARY} px-8 py-4`}
            href="/apartments"
          >
            View Apartments
          </Link>

          <Link
            className={`${BTN_OUTLINE} px-8 py-4`}
            href="/menu"
          >
            Explore Menu
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 pointer-events-none">
        <div className="w-px h-8 sm:h-12 bg-[#c4954a]/50" />

        <span className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest">
          SCROLL
        </span>
      </div>
    </section>
  );
};

export default Hero;
