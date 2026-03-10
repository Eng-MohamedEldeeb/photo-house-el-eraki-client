import { useSearchParams } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";

const STOCK_FILTERS = [
  { value: "", labelAr: "All", label: "All" },
  { value: "in_stock", labelAr: "In Stock", label: "In Stock" },
  { value: "low_stock", labelAr: "Low Stock", label: "Low Stock" },
  { value: "out_of_stock", labelAr: "Out of Stock", label: "Out of Stock" },
];

export default function FilterBar() {
  const [params, setParams] = useSearchParams();
  const { data: categories } = useCategories();
  const set = (key: string, value: string) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      if (value) next.set(key, value);
      else next.delete(key);
      next.delete("page"); // reset to page 1 on filter change
      return next;
    });
  };
  const search = params.get("search") ?? "";
  const categoryId = params.get("categoryId") ?? "";
  const stockStatus = params.get("stockStatus") ?? "";
  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Search input */}
      <div className="relative">
        <span
          className="absolute left-3 top-1/2 -translate-y-1/2
          text-text3 text-sm"
        >
          x
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => set("search", e.target.value)}
          placeholder="Search products..."
          className="w-full bg-dark2 border border-dark3 focus:border-yellow-400
            text-text text-sm rounded px-9 py-2.5 outline-none transition-colors"
        />
      </div>
      {/* Category + Stock filter row */}
      <div className="flex flex-wrap gap-2">
        {/* Category pills */}
        <button
          onClick={() => set("categoryId", "")}
          className={`font-ui text-xs px-3 py-1.5 rounded-full border
            transition-colors ${
              !categoryId
                ? "bg-yellow-400 text-dark border-yellow-400"
                : "border-dark3 text-text3 hover:border-yellow-400/50"
            }`}
        >
          All
        </button>
        {categories?.map((c) => (
          <button
            key={c.id}
            onClick={() => set("categoryId", String(c.id))}
            className={`font-ui text-xs px-3 py-1.5 rounded-full border
              transition-colors ${
                categoryId === String(c.id)
                  ? "bg-yellow-400 text-dark border-yellow-400"
                  : "border-dark3 text-text3 hover:border-yellow-400/50"
              }`}
          >
            {c.nameAr}
          </button>
        ))}
        {/* Divider */}
        <div className="w-px bg-dark3 mx-1" />
        {/* Stock status pills */}
        {STOCK_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => set("stockStatus", f.value)}
            className={`font-ui text-xs px-3 py-1.5 rounded-full border
              transition-colors ${
                stockStatus === f.value
                  ? "bg-yellow-400 text-dark border-yellow-400"
                  : "border-dark3 text-text3 hover:border-yellow-400/50"
              }`}
          >
            <span className="font-arabic">{f.labelAr}</span>
            <span className="mx-1 opacity-40">|</span>
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
