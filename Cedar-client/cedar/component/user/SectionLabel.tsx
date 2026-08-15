import React from "react";
import { DM_Mono } from "next/font/google";

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="h-px w-8 bg-[#c4954a]" />
      <span className={`${dmMono.className} text-xs text-[#c4954a] tracking-[0.3em] uppercase`}>
        {text}
      </span>
    </div>
  );
}

export default SectionLabel;