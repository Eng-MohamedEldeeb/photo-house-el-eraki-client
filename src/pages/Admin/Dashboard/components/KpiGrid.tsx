import KpiCard from "./KpiCard";

interface Kpi {
  label: string;
  labelAr: string;
  value: number;
  color: string;
}

interface KpiGridProps {
  kpis: Kpi[];
}

export default function KpiGrid({ kpis }: KpiGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
      {kpis.map((k) => (
        <KpiCard key={k.label} {...k} />
      ))}
    </div>
  );
}
