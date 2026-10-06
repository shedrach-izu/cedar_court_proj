function SummaryRow({
  label,
  value,
  plain = false,
}: {
  label: string;
  value?: any;
  plain?: boolean;
}) {
  if (value === undefined || value === null) {
    return null;
  }

  return (
    <div className="flex justify-between">
      <span className="font-['Jost'] text-sm text-[#8a7d6a]">
        {label}
      </span>

      <span className="font-['DM_Mono'] text-sm text-[#ede4d4]">
        {plain
          ? value
          : `₦${Number(value).toLocaleString()}`}
      </span>
    </div>
  );
}

export default SummaryRow