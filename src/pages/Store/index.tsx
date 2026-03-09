import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { productsApi } from "../../api/products.api";
import ProductCard from "../../components/product/ProductCard";
import Spinner from "../../components/ui/Spinner";

export default function Store() {
  const [searchParams] = useSearchParams();

  const query = {
    categoryId: searchParams.get("categoryId")
      ? Number(searchParams.get("categoryId"))
      : undefined,
    page: Number(searchParams.get("page") || 1),
    limit: 12,
  };

  const { data, isLoading } = useQuery({
    queryKey: ["products", query],
    queryFn: () => productsApi.getAll(query),
  });

  const products = data?.data || [];
  const total = data?.meta.total || 0;

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl text-ivory">Store | Store</h1>
          <p className="font-ui text-text3 text-sm mt-1">
            {total} products available
          </p>
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div
            className="grid grid-cols-2 sm:grid-cols-3
            lg:grid-cols-4 gap-4"
          >
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
        {products.length === 0 && !isLoading && (
          <p className="text-center text-text3 py-20 font-ui text-lg">
            No products found
          </p>
        )}
      </div>
    </div>
  );
}
