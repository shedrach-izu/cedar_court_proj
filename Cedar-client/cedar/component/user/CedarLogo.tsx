import React from 'react'

const CedarLogo = ({ size = "default" }: { size?: "default" | "sm" }) => {
  const box = size === "sm" ? "w-7 h-7" : "w-8 h-8";
  const title = size === "sm" ? "text-base" : "text-xl";
  return (
    <div className="flex items-center gap-3">
      <div className={`${box} border border-[#c4954a] rotate-45 flex items-center justify-center shrink-0`}>
        <span className="text-[#c4954a] text-[10px] font-['DM_Mono'] -rotate-45">CC</span>
      </div>
      <div>
        <div className={`font-['Fraunces'] ${title} text-[#ede4d4] tracking-wider leading-none`}>Cedar Court</div>
        <div className="text-[9px] font-['DM_Mono'] text-[#c4954a] tracking-[0.3em] uppercase">Hotel &amp; Restaurant</div>
      </div>
    </div>
  );
}

export default CedarLogo