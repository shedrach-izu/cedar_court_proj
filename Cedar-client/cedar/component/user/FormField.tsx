function FormField({ label, children }: { label: string; children: React.ReactNode }) {
    const INPUT = "w-full bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] px-4 py-3 text-sm font-['Jost'] text-[#ede4d4] focus:outline-none focus:border-[#c4954a] placeholder-[#8a7d6a]/40 transition-colors";
    const LABEL = "text-[10px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase block mb-1.5";
  return (
    <div>
      <label className={LABEL}>{label}</label>
      {children}
    </div>
  );
}

export default FormField