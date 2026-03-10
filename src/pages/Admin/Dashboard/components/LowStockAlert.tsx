import { Link } from "react-router-dom";

interface LowStockAlertProps {
  lowStock: number;
}

export default function LowStockAlert({ lowStock }: LowStockAlertProps) {
  if (lowStock <= 0) return null;

  return (
    <div className="mb-8 p-4 bg-amber/5 border border-amber/30 rounded">
      <p className="font-ui text-amber text-sm mb-3">
        Warning: {lowStock} products are low on stock
      </p>
      <Link
        to="/admin/products?stockStatus=low_stock"
        className="font-ui text-xs text-amber hover:underline"
      >
        View low stock products →
      </Link>
    </div>
  );
}
