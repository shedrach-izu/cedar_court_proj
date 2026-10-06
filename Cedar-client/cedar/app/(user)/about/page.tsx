import { Award } from "lucide-react";
import SectionLabel from "@/component/user/SectionLabel";
//import { BTN_PRIMARY, BTN_OUTLINE } from "@/lib/constants";
import { toast } from "react-hot-toast";

function AboutPage({ setPage }: { setPage: (p: string) => void }) {
    const BTN_PRIMARY = "bg-[#c4954a] text-[#0c0a08] font-['Jost'] font-semibold text-sm tracking-widest uppercase hover:bg-[#d4a55a] transition-colors";
    const BTN_OUTLINE = "border border-[rgba(196,149,74,0.3)] text-[#ede4d4] font-['Jost'] text-sm tracking-widest uppercase hover:border-[#c4954a] hover:text-[#c4954a] transition-all";
  return (
    <div className="pt-20 bg-[#0c0a08]">
      <div className="relative h-80">
        <img src="https://images.unsplash.com/photo-1730367019960-9906d9cbbf05?w=1920&h=600&fit=crop&auto=format" alt="Cedar Court" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0c0a08]/70" />
        <div className="absolute inset-0 flex items-center"><div className="max-w-7xl mx-auto px-6"><SectionLabel text="Our Story" /><h1 className="font-['Fraunces'] text-5xl text-[#ede4d4]">About <em className="italic">Cedar Court</em></h1></div></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-center">
          <div>
            <h2 className="font-['Fraunces'] text-3xl text-[#ede4d4] mb-6">A Legacy of <em className="italic">Considered Luxury</em></h2>
            <p className="font-['Jost'] text-[#8a7d6a] leading-relaxed mb-4 font-light">Cedar Court was founded in 1987 by the Ashford family, who believed that true luxury was not about opulence alone, but about the quiet mastery of every detail. That founding philosophy remains at the heart of everything we do.</p>
            <p className="font-['Jost'] text-[#8a7d6a] leading-relaxed mb-4 font-light">Located on a private estate in the heart of Mayfair, Cedar Court occupies a Grade I listed townhouse extended to house 48 rooms and suites, four event spaces, a two-Michelin-starred restaurant, and a world-class spa.</p>
            <p className="font-['Jost'] text-[#8a7d6a] leading-relaxed font-light">Today, the hotel is led by General Manager Helena Voss, who has spent seventeen years at Cedar Court refining the art of hospitality.</p>
            <div className="flex gap-4 mt-8">
              <button className={`px-6 py-3 ${BTN_PRIMARY}`}>Our Rooms</button>
              <button className={`px-6 py-3 ${BTN_OUTLINE}`}>Contact Us</button>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1702814160779-4a88cfb330c7?w=800&h=600&fit=crop&auto=format" alt="Cedar Court interior" className="w-full h-96 object-cover" />
            <div className="absolute -bottom-4 -right-4 bg-[#161310] border border-[rgba(196,149,74,0.2)] p-5 hidden lg:block"><div className="font-['Fraunces'] text-3xl text-[#c4954a]">1987</div><div className="text-[10px] font-['DM_Mono'] text-[#8a7d6a]">Founded in Mayfair</div></div>
          </div>
        </div>
        <div className="bg-[#161310] border border-[rgba(196,149,74,0.12)] p-10 mb-20">
          <div className="text-center mb-10"><div className="flex items-center justify-center gap-3 mb-3"><div className="h-px w-8 bg-[#c4954a]" /><span className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-[0.3em] uppercase">Recognition</span><div className="h-px w-8 bg-[#c4954a]" /></div><h2 className="font-['Fraunces'] text-3xl text-[#ede4d4]">Awards &amp; <em className="italic">Accolades</em></h2></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[["Forbes Travel Guide","Five Star 2026"],["Michelin Guide","Two Stars, Restaurant"],["Conde Nast Traveller","Gold List 2025"],["World Travel Awards","Best Boutique Hotel"]].map(([award,level]) => (
              <div key={award} className="text-center"><Award size={26} className="text-[#c4954a] mx-auto mb-3" strokeWidth={1.5} /><div className="font-['Fraunces'] text-[#ede4d4] mb-1 text-sm">{award}</div><div className="text-[10px] font-['DM_Mono'] text-[#c4954a]">{level}</div></div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-center mb-10"><div className="flex items-center justify-center gap-3 mb-3"><div className="h-px w-8 bg-[#c4954a]" /><span className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-[0.3em] uppercase">Leadership</span><div className="h-px w-8 bg-[#c4954a]" /></div><h2 className="font-['Fraunces'] text-3xl text-[#ede4d4]">Meet the <em className="italic">Team</em></h2></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[["Chidi Diugwu","General Manager","CD"],["Isabelle Moreau","Executive Chef","IM"],["Thomas Ashford","Director of Hospitality","TA"],["Priya Nair","Spa Director","PN"]].map(([name,role,init]) => (
              <div key={name} className="text-center group cursor-pointer">
                <div className="w-full aspect-square bg-[#161310] border border-[rgba(196,149,74,0.1)] group-hover:border-[rgba(196,149,74,0.3)] transition-all mb-4 flex items-center justify-center"><span className="font-['Fraunces'] text-5xl text-[#c4954a]/30 group-hover:text-[#c4954a]/50 transition-colors">{init}</span></div>
                <h3 className="font-['Fraunces'] text-[#ede4d4]">{name}</h3><p className="text-[10px] font-['DM_Mono'] text-[#8a7d6a] mt-1">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage