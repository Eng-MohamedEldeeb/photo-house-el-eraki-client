import { useStockSummary, useAdminProducts } from "../../../hooks/useProducts";
import Spinner from "../../../components/ui/Spinner";
import Badge from "../../../components/ui/Badge";
import { Link } from "react-router-dom";

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
      color: "text-gold",
    },
  ];
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl text-ivory">Dashboard</h1>
        <p className="font-ui text-text3 text-sm mt-1">Dashboard</p>
      </div>
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </div>
      {/* Low stock alert */}
      {(summary?.lowStock ?? 0) > 0 && (
        <div className="mb-8 p-4 bg-amber/5 border border-amber/30 rounded">
          <p className="font-ui text-amber text-sm mb-3">
            Warning: {summary?.lowStock} products are low on stock
          </p>
          <Link
            to="/admin/products?stockStatus=low_stock"
            className="font-ui text-xs text-amber hover:underline"
          >
            View low stock products →
          </Link>
        </div>
      )}
      {/* Recent products */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2
            className="font-ui font-semibold text-text text-sm
            tracking-wider"
          >
            Recent Products
          </h2>
          <Link
            to="/admin/products"
            className="font-ui text-xs text-gold hover:underline"
          >
            View all →
          </Link>
        </div>
        <div className="bg-dark2 border border-dark3 rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-dark3">
              <tr>
                {["Product", "Price", "Stock"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 font-ui
                    text-text3 text-xs tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products?.data.map((p, i) => (
                <tr key={p.id} className={i % 2 === 0 ? "bg-dark2" : "bg-dark"}>
                  <td className="px-4 py-3">
                    <p className="font-arabic text-text text-sm">{p.nameAr}</p>
                    <p className="font-ui text-text3 text-xs">{p.nameEn}</p>
                  </td>
                  <td className="px-4 py-3 font-ui text-gold text-sm">
                    {p.price} EGP
                  </td>
                  <td className="px-4 py-3">
                    <Badge status={p.stockStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
