function KpiCard({
  label,
  labelAr,
  value,
  color,
}: {
  label: string;
  labelAr: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-dark2 border border-dark3 rounded p-5">
      <p className="font-ui text-text3 text-sm mb-1">{labelAr}</p>
      <p className="font-ui text-text3 text-xs mb-3">{label}</p>
      <p className={`font-ui font-bold text-3xl ${color}`}>{value}</p>
    </div>
  );
}

export default KpiCard;
