'use client'

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import CedarLogo from "./CedarLogo";
import { toast } from "react-hot-toast";
import { DM_Mono } from "next/font/google";

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

function Footer({ setPage, setView }: { setPage: (p: string) => void; setView: (v: string) => void }) {
  return (
    <footer className="bg-[#0a0806] border-t border-[rgba(196,149,74,0.12)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-5"><CedarLogo /></div>
            <p className="text-sm font-['Jost'] text-[#8a7d6a] leading-relaxed mb-6 font-light">Where luxury finds its language. Cedar Court has been welcoming distinguished guests since 1987.</p>
            <div className="flex gap-3">
              {[FaInstagram, FaTwitter, FaFacebookF].map((Icon, i) => (
                <button key={i} className="w-9 h-9 border border-[rgba(196,149,74,0.2)] flex items-center justify-center text-[#8a7d6a] hover:border-[#c4954a] hover:text-[#c4954a] transition-all"><Icon size={15} /></button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-['DM_Mono'] text-[#c4954a] text-xs tracking-widest uppercase mb-5">Explore</h4>
            <div className="flex flex-col gap-2.5">
              {["home","rooms","menu","gallery","about","contact"].map(p => (
                <button key={p} onClick={() => setPage(p)} className="text-sm font-['Jost'] text-[#8a7d6a] hover:text-[#ede4d4] transition-colors text-left capitalize">{p}</button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-['DM_Mono'] text-[#c4954a] text-xs tracking-widest uppercase mb-5">Services</h4>
            <div className="flex flex-col gap-2.5">
              {["Room Service","Spa & Wellness","Fine Dining","Event Spaces","Airport Transfer","Concierge"].map(s => (
                <button key={s} className="text-sm font-['Jost'] text-[#8a7d6a] hover:text-[#ede4d4] transition-colors text-left">{s}</button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-['DM_Mono'] text-[#c4954a] text-xs tracking-widest uppercase mb-5">Contact</h4>
            <div className="flex flex-col gap-3">
              {[
                { Icon: MapPin, text: "12 Cedar Court Lane\nMayfair, London W1K 4HF" },
                { Icon: Phone, text: "+44 20 7946 0312" },
                { Icon: Mail, text: "hello@cedarcourt.co.uk" },
                { Icon: Clock, text: "Concierge: 24 hours, 7 days" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-start gap-3 text-sm font-['Jost'] text-[#8a7d6a]"><Icon size={14} className="text-[#c4954a] mt-0.5 shrink-0" /><span className="whitespace-pre-line">{text}</span></div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-[rgba(196,149,74,0.08)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-['DM_Mono'] text-[#8a7d6a]">&copy; {new Date().getFullYear()} Cedar Court Hotel &amp; Restaurant. All rights reserved.</p>
          <div className="flex gap-6">
            <button className="text-xs font-['DM_Mono'] text-[#8a7d6a] hover:text-[#c4954a] transition-colors">Privacy Policy</button>
            <button className="text-xs font-['DM_Mono'] text-[#8a7d6a] hover:text-[#c4954a] transition-colors">Terms of Use</button>
            <button className="text-xs font-['DM_Mono'] text-[#8a7d6a]/30 hover:text-[#8a7d6a] transition-colors">Admin Portal</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;