import { useStockSummary, useAdminProducts } from "../../../hooks/useProducts";
import Spinner from "../../../components/ui/Spinner";
import KpiGrid from "./components/KpiGrid";
import LowStockAlert from "./components/LowStockAlert";
import RecentProducts from "./components/RecentProducts";

export default function Dashboard() {
  const { data: summary, isLoading } = useStockSummary();
  const { data: products } = useAdminProducts({ limit: 5, page: 1 });

  if (isLoading) return <Spinner />;

  const kpis = [
    {
      label: "Total Products",
      labelAr: "Total Products",
      value: summary?.total ?? 0,
      color: "text-text",
    },
    {
      label: "In Stock",
      labelAr: "In Stock",
      value: summary?.inStock ?? 0,
      color: "text-green",
    },
    {
      label: "Low Stock",
      labelAr: "Low Stock",
      value: summary?.lowStock ?? 0,
      color: "text-amber",
    },
    {
      label: "Out of Stock",
      labelAr: "Out of Stock",
      value: summary?.outOfStock ?? 0,
      color: "text-red",
    },
    {
      label: "Total Sold",
      labelAr: "Total Sold",
      value: summary?.totalSold ?? 0,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl text-ivory">Dashboard</h1>
        <p className="font-ui text-text3 text-sm mt-1">Dashboard</p>
      </div>
      <KpiGrid kpis={kpis} />
      <LowStockAlert lowStock={summary?.lowStock ?? 0} />
      <RecentProducts products={products?.data} />
    </div>
  );
}
