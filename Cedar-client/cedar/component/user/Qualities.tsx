import React from 'react'
import { Fraunces, DM_Mono } from 'next/font/google'

const FrauncesFont = Fraunces({ variable: "--fraunces", subsets: ['latin'] })
const DMMonoFont = DM_Mono({ variable: "--dm-mono", subsets: ['latin'], weight: ['400'] })

const Qualities = () => {
  return (
    <div>
        {/* <section className="bg-[#161310] border-y border-[rgba(196,149,74,0.12)]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[["37","Years of Excellence"],["48","Luxury Suites & Villas"],["5★","Forbes Travel Guide"],["12k+","Distinguished Guests"]].map(([num, label]) => (
              <div key={label} className="text-center"><div className={`${FrauncesFont.className} text-4xl text-[#c4954a] mb-1`}>{num}</div><div className={`text-[10px] ${DMMonoFont.className} text-[#8a7d6a] tracking-widest uppercase`}>{label}</div></div>
            ))}
          </div>
        </div>
      </section> */}
      <section className="bg-[#161310] py-16 border-y border-[rgba(196,149,74,0.1)]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: "Est. 2019", label: "Serving Enugu" },
            { value: "12", label: "Apartments" },
            { value: "4.9★", label: "Avg. Rating Online" },
            { value: "100+", label: "Happy Guests" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-['Fraunces'] text-3xl sm:text-4xl text-[#c4954a] mb-1">{s.value}</div>
              <div className="text-xs font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Qualities