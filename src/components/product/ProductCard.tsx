import { Link } from "react-router-dom";
import Badge from "../ui/Badge";
import type { Product } from "../../types/product.types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-dark2 border border-dark3 rounded
        hover:border-yellow-400/50 transition-all duration-300 overflow-hidden
        flex flex-col"
    >
      {/* Image */}
      <div className="aspect-square bg-dark3 overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.nameEn}
            className="w-full h-full object-cover
              group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center
            text-text3 text-xs"
          >
            No image
          </div>
        )}
      </div>
      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <p
          className="font-ui text-text text-base leading-snug
          group-hover:text-yellow-400 transition-colors"
        >
          {product.nameAr}
        </p>
        <p className="font-ui text-text3 text-xs tracking-wide">
          {product.nameEn}
        </p>
        <div
          className="flex items-center justify-between mt-auto pt-2
          border-t border-dark3"
        >
          <span className="font-ui font-semibold text-yellow-400 text-sm">
            {product.price} EGP
          </span>
          <Badge status={product.stockStatus} />
        </div>
      </div>
    </Link>
  );
}
