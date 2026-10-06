function DetailItem({
  label,
  value,
}: {
  label: string;
  value?: any;
}) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  return (
    <div>
      <p className="text-[10px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-wider mb-1">
        {label}
      </p>

      <p className="font-['Jost'] text-sm text-[#ede4d4]">
        {value}
      </p>
    </div>
  );
}

export default DetailItem