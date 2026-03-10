import { useSearchParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import ProductCard from "../../components/product/ProductCard";
import ProductCardSkeleton from "../../components/product/ProductCardSkeleton";
import EmptyState from "../../components/ui/EmptyState";
import FilterBar from "./FilterBar";
import Pagination from "./Pagination";

export default function Store() {
  const [params] = useSearchParams();
  const query = {
    search: params.get("search") || undefined,
    categoryId: params.get("categoryId") || undefined,
    stockStatus: params.get("stockStatus") || undefined,
    page: Number(params.get("page") || 1),
    limit: 12,
  };

  const { data, isLoading } = useProducts(query);

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl text-ivory">Store</h1>
          <p className="font-ui text-text3 text-sm mt-1">
            {data?.meta.total ?? 0} products available
          </p>
        </div>
        <FilterBar />
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : data?.data.length === 0 ? (
          <EmptyState
            title="No products found"
            subtitle="No products found matching your filters"
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.data.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
        <Pagination
          totalPages={data?.meta.totalPages ?? 0}
          currentPage={query.page}
        />
      </div>
    </div>
  );
}
