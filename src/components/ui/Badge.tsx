import type { StockStatus } from "../../types/product.types";

const config: Record<
  StockStatus,
  { label: string; labelAr: string; cls: string }
> = {
  in_stock: {
    label: "In Stock",
    labelAr: "In Stock",
    cls: "text-green border-green/30 bg-green/10",
  },
  low_stock: {
    label: "Low Stock",
    labelAr: "Low Stock",
    cls: "text-amber border-amber/30 bg-amber/10",
  },
  out_of_stock: {
    label: "Out of Stock",
    labelAr: "Out of Stock",
    cls: "text-red   border-red/30   bg-red/10",
  },
};

export default function Badge({ status }: { status: StockStatus }) {
  const { label, cls } = config[status];
  return (
    <span
      className={`text-xs font-ui font-semibold px-2 py-0.5
      border rounded-full tracking-wide ${cls}`}
    >
      {label}
    </span>
  );
}
