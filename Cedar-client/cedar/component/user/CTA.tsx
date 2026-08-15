import React from 'react'

const CTA = () => {
    const BTN_PRIMARY = "bg-[#c4954a] text-[#0c0a08] font-['Jost'] font-semibold text-sm tracking-widest uppercase hover:bg-[#d4a55a] transition-colors";
  return (
    <div className='bg-[#0c0a08]'>
        <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="bg-[#161310] border border-[rgba(196,149,74,0.15)] p-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-3"><div className="h-px w-8 bg-[#c4954a]" /><span className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-[0.3em] uppercase">The Cedar Circle</span><div className="h-px w-8 bg-[#c4954a]" /></div>
          <h2 className="font-['Fraunces'] text-3xl text-[#ede4d4] mb-3">Stay in Our World</h2>
          <p className="font-['Jost'] text-[#8a7d6a] mb-8 max-w-md mx-auto text-sm font-light">Exclusive offers, seasonal menus, and curated experiences for our most discerning guests.</p>
          <form className="flex max-w-md mx-auto">
            <input type="email" required placeholder="your@email.com" className="flex-1 bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] border-r-0 px-4 py-3 text-sm font-['Jost'] text-[#ede4d4] placeholder-[#8a7d6a]/40 focus:outline-none focus:border-[#c4954a]" />
            <button type="submit" className={`px-6 py-3 ${BTN_PRIMARY} whitespace-nowrap`}>Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default CTA