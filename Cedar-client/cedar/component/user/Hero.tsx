import React from 'react'
//import { BTN_PRIMARY, BTN_OUTLINE } from '@/constants';
import HeroImage from '@/public/cedar_hero.jpg';

const Hero = () => {
    const BTN_PRIMARY = "bg-[#c4954a] text-[#0c0a08] font-['Jost'] font-semibold text-sm tracking-widest uppercase hover:bg-[#d4a55a] transition-colors";
    const BTN_OUTLINE = "border border-[rgba(196,149,74,0.3)] text-[#ede4d4] font-['Jost'] text-sm tracking-widest uppercase hover:border-[#c4954a] hover:text-[#c4954a] transition-all";
  return (
    <div>
      <section className="relative h-screen min-h-[640px] flex items-center">
        <div className="absolute inset-0">
          <img src={HeroImage.src} alt="Cedar Court Hotel" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a08]/92 via-[#0c0a08]/55 to-[#0c0a08]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a08]/80 via-transparent to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6"><div className="h-px w-12 bg-[#c4954a]" /><span className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-[0.3em] uppercase">Est. 1987 &middot; Enugu, Nigeria</span></div>
            <h1 className="font-['Fraunces'] text-7xl md:text-8xl text-[#ede4d4] leading-[0.88] mb-6">Cedar<br /><em className="italic text-[#c4954a]">Court</em></h1>
            <p className="font-['Jost'] text-lg text-[#ede4d4]/70 leading-relaxed mb-10 max-w-md font-light">Where luxury finds its language. A singular retreat where every detail speaks of craft, care, and considered indulgence.</p>
            <div className="flex flex-wrap gap-4">
              <button className={`px-8 py-4 ${BTN_PRIMARY}`}>Explore Rooms</button>
              <button className={`px-8 py-4 ${BTN_OUTLINE}`}>Book a Table</button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] font-['DM_Mono'] text-[#8a7d6a] tracking-[0.4em]">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#c4954a] to-transparent" />
        </div>
      </section>
    </div>
  )
}

export default Hero