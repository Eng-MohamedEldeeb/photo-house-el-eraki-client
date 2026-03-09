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
          <p className="font-ui text-gold text-sm tracking-widest mb-2">
            Browse by Category
          </p>
          <h2 className="font-display text-3xl text-ivory">Shop by Category</h2>
          <div className="w-12 h-px bg-gold mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/store?categoryId=${cat.id}`}
              className="group bg-dark2 border border-dark3
                hover:border-gold/50 rounded p-6 text-center
                transition-all duration-300"
            >
              <p
                className="font-ui text-text text-lg mb-1
                group-hover:text-gold transition-colors"
              >
                {cat.nameAr}
              </p>
              <p
                className="font-ui text-text3 text-xs tracking-wider
                group-hover:text-gold-l transition-colors"
              >
                {cat.nameEn}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
