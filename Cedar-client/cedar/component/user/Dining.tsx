import React from 'react'
import SectionLabel from './SectionLabel'

const Dining = () => {
    const BTN_PRIMARY = "bg-[#c4954a] text-[#0c0a08] font-['Jost'] font-semibold text-sm tracking-widest uppercase hover:bg-[#d4a55a] transition-colors";
    const BTN_OUTLINE = "border border-[rgba(196,149,74,0.3)] text-[#ede4d4] font-['Jost'] text-sm tracking-widest uppercase hover:border-[#c4954a] hover:text-[#c4954a] transition-all";
  return (
    <div>
        <section className="bg-[#161310] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionLabel text="The Restaurant" />
              <h2 className="font-['Fraunces'] text-4xl md:text-5xl text-[#ede4d4] mb-6">Dining as an<br /><em className="italic">Art Form</em></h2>
              <p className="font-['Jost'] text-[#8a7d6a] leading-relaxed mb-4 font-light">Our restaurant holds two Michelin stars and offers an intimate dining experience. Executive Chef Isabelle Moreau transforms the finest seasonal produce into compositions of remarkable beauty and complexity.</p>
              <p className="font-['Jost'] text-[#8a7d6a] leading-relaxed mb-8 font-light">The seven-course tasting menu changes with the seasons, while our a la carte offering spans breakfast through late-night dining.</p>
              <div className="flex flex-wrap gap-4 mb-8">
                <button className={`px-6 py-3.5 ${BTN_PRIMARY}`}>View Menu</button>
                <button className={`px-6 py-3.5 ${BTN_OUTLINE}`}>Reserve a Table</button>
              </div>
              <div className="flex items-center gap-8">{[["2","Michelin Stars"],["#3","Best Hotel Restaurant"],["Open","7 Days a Week"]].map(([val,label]) => (<div key={label}><div className="font-['Fraunces'] text-xl text-[#c4954a]">{val}</div><div className="text-[10px] font-['DM_Mono'] text-[#8a7d6a]">{label}</div></div>))}</div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1776993298456-98c71c0e177e?w=800&h=700&fit=crop&auto=format" alt="Cedar Court Restaurant" className="w-full h-[500px] object-cover" />
              <div className="absolute -bottom-5 -left-5 w-48 bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] p-4 hidden lg:block">
                <div className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase mb-2">Open Daily</div>
                {["Breakfast 7–11am","Lunch 12–3pm","Dinner 6–11pm"].map(t => <div key={t} className="text-sm font-['Jost'] text-[#ede4d4]/80">{t}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dining