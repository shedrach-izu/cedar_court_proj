import React from 'react'

import { Waves, Dumbbell, Leaf, Coffee, Car, Wifi, Globe, Users } from 'lucide-react'

const Amenities = () => {
  return (
    <div className='bg-[#0c0a08]'>
        <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3"><div className="h-px w-8 bg-[#c4954a]" /><span className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-[0.3em] uppercase">Amenities</span><div className="h-px w-8 bg-[#c4954a]" /></div>
          <h2 className="font-['Fraunces'] text-4xl text-[#ede4d4]">Every <em className="italic">Comfort</em> Considered</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{Icon:Waves,title:"Infinity Pool",desc:"Heated year-round, 25m pool"},{Icon:Dumbbell,title:"Fitness Centre",desc:"State-of-the-art, open 24 hrs"},{Icon:Leaf,title:"Spa & Wellness",desc:"Six treatment rooms, hammam"},{Icon:Coffee,title:"Lobby Lounge",desc:"All-day dining, afternoon tea"},{Icon:Car,title:"Valet Parking",desc:"Secure underground with EV"},{Icon:Wifi,title:"High-Speed WiFi",desc:"Complimentary throughout"},{Icon:Globe,title:"Concierge",desc:"24-hour dedicated service"},{Icon:Users,title:"Event Spaces",desc:"Four elegant private rooms"}].map(({Icon,title,desc}) => (
            <div key={title} className="group p-6 border border-[rgba(196,149,74,0.1)] hover:border-[rgba(196,149,74,0.35)] transition-all bg-[#161310] hover:bg-[#1c1915] cursor-pointer">
              <Icon size={22} className="text-[#c4954a] mb-4" strokeWidth={1.5} />
              <h3 className="font-['Fraunces'] text-[#ede4d4] mb-1.5">{title}</h3>
              <p className="text-xs font-['Jost'] text-[#8a7d6a]">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Amenities