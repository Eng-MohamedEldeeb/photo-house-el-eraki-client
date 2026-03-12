import { Link } from "react-router-dom";
import type { Category } from "../../types/category.types";

export default function CategoriesSection({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <section className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="font-ui text-yellow-400 text-sm tracking-widest mb-2">
            Browse by Category
          </p>
          <h2 className="font-display text-3xl text-ivory">Shop by Category</h2>
          <div className="w-12 h-px bg-yellow-400 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/store?categoryId=${cat.id}`}
              className="group bg-dark2 border border-dark3
                hover:border-yellow-400/50 rounded overflow-hidden
                transition-all duration-300"
            >
              {/* Image */}
              <div className="relative w-full aspect-4/3 overflow-hidden bg-dark3">
                {cat.imageUrl ? (
                  <img
                    src={cat.imageUrl}
                    alt={cat.nameEn}
                    className="w-full h-full object-cover
                      transition-transform duration-500
                      group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-dark3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
                {/* Gold overlay on hover */}
                <div
                  className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10
                  transition-colors duration-300"
                />
              </div>

              {/* Text */}
              <div className="p-4 text-center">
                <p
                  className="font-ui text-text text-sm font-medium mb-0.5
                  group-hover:text-yellow-400 transition-colors"
                >
                  {cat.nameEn}
                </p>
                {cat.nameAr && (
                  <p className="font-ui text-text3 text-xs tracking-wider">
                    {cat.nameAr}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
