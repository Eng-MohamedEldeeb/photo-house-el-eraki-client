import { useParams, Link } from "react-router-dom";
import { useProduct } from "../../hooks/useProducts";
import Badge from "../../components/ui/Badge";
import Spinner from "../../components/ui/Spinner";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useProduct(id as string);

  if (isLoading) return <Spinner />;

  if (isError || !product)
    return (
      <div className="min-h-screen bg-linear-to-b from-black to-neutral-900 flex flex-col items-center justify-center gap-4">
        <p className="font-ui text-text2 text-xl">Product not found</p>

        <Link
          to="/store"
          className="text-yellow-400 font-ui text-sm hover:underline"
        >
          ← Back to Store
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-b from-black via-neutral-950 to-black py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-ui text-xs text-text3 mb-10">
          <Link to="/" className="hover:text-yellow-400 transition">
            Home
          </Link>

          <span>/</span>

          <Link to="/store" className="hover:text-yellow-400 transition">
            Store
          </Link>

          <span>/</span>

          <span className="text-text2">{product.nameEn}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          {/* Image */}
          <div className="relative group">
            <div className="aspect-square bg-dark2 border border-dark3 rounded-xl overflow-hidden shadow-xl">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.nameEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text3">
                  No image
                </div>
              )}
            </div>
          </div>

          {/* Info Card */}
          <div className="flex flex-col gap-6 bg-dark2/40 backdrop-blur-md border border-dark3 rounded-xl p-8 shadow-lg">
            {product.category && (
              <span className="font-ui text-xs text-yellow-400 tracking-widest uppercase">
                {product.category.nameEn}
              </span>
            )}

            {/* Title */}
            <div>
              <h1 className="font-display text-4xl text-text leading-snug">
                {product.nameAr}
              </h1>

              <p className="font-display text-lg text-text3 mt-1">
                {product.nameEn}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="font-ui font-bold text-yellow-400 text-4xl">
                {product.price} EGP
              </span>

              <Badge status={product.stockStatus} />
            </div>

            {/* Description */}
            {(product.descriptionAr || product.descriptionEn) && (
              <div className="border-t border-dark3 pt-5 space-y-3">
                {/* {product.descriptionAr && (
                  <p className="font-ui text-text2 leading-loose text-right">
                    {product.descriptionAr}
                  </p>
                )} */}

                {product.descriptionEn && (
                  <p className="font-ui text-text3 text-sm leading-relaxed">
                    <span className="text-white">Description: </span>
                    {product.descriptionEn.length
                      ? product.descriptionEn
                      : "No description available."}
                  </p>
                )}
              </div>
            )}

            {/* SKU */}
            {product.sku && (
              <p className="font-ui text-text3 text-xs">
                SKU: <span className="font-mono text-text2">{product.sku}</span>
              </p>
            )}

            {/* Back Button */}
            <Link
              to="/store"
              className="mt-4 text-sm text-yellow-400 hover:underline font-ui"
            >
              ← Back to Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
