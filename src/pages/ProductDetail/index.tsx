import { useParams, Link } from "react-router-dom";
import { useProduct } from "../../hooks/useProducts";
import Badge from "../../components/ui/Badge";
import Spinner from "../../components/ui/Spinner";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useProduct(Number(id));

  if (isLoading) return <Spinner />;

  if (isError || !product)
    return (
      <div
        className="min-h-screen bg-black flex flex-col
      items-center justify-center gap-4"
      >
        <p className="font-ui text-text2 text-xl">Product not found</p>
        <Link
          to="/store"
          className="text-gold font-ui text-sm
        hover:underline"
        >
          ← Back to Store
        </Link>
      </div>
    );
  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-2 font-ui text-xs
          text-text3 mb-8"
        >
          <Link to="/" className="hover:text-gold">
            Home
          </Link>
          <span>/</span>
          <Link to="/store" className="hover:text-gold">
            Store
          </Link>
          <span>/</span>
          <span className="text-text2">{product.nameEn}</span>
        </nav>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="aspect-square bg-dark2 border border-dark3 rounded  overflow-hidden">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.nameEn}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center
                justify-center text-text3 font-arabic"
              >
                No image
              </div>
            )}
          </div>
          {/* Info */}
          <div className="flex flex-col gap-5">
            {product.category && (
              <span
                className="font-ui text-xs text-gold tracking-widest
                uppercase"
              >
                {product.category.nameEn}
              </span>
            )}
            <div>
              <h1 className="font-display text-3xl text-text leading-snug">
                {product.nameAr}
              </h1>
              <p className="font-display text-xl text-text2 mt-1">
                {product.nameEn}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-ui font-bold text-gold text-3xl">
                {product.price} EGP
              </span>
              <Badge status={product.stockStatus} />
            </div>
            {(product.descriptionAr || product.descriptionEn) && (
              <div className="border-t border-dark3 pt-4">
                {product.descriptionAr && (
                  <p
                    className="font-ui text-text2 text-base leading-loose
                    mb-2 text-right"
                  >
                    {product.descriptionAr}
                  </p>
                )}
                {product.descriptionEn && (
                  <p className="font-ui text-text3 text-sm leading-relaxed">
                    {product.descriptionEn}
                  </p>
                )}
              </div>
            )}
            {product.sku && (
              <p className="font-ui text-text3 text-xs">
                SKU: <span className="font-mono text-text2">{product.sku}</span>
              </p>
            )}
            <Link
              to="/store"
              className="font-ui text-sm text-gold hover:underline mt-2"
            >
              ← Back to Store | Back to Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
