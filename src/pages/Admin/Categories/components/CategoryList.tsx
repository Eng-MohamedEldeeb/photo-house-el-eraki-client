import CategoryRow from "./CategoryRow";
import type { Category } from "../../../../types/category.types";

interface CategoryListProps {
  categories: Category[] | undefined;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

export default function CategoryList({
  categories,
  onEdit,
  onDelete,
}: CategoryListProps) {
  return (
    <div className="bg-dark2 border border-dark3 rounded overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-dark3">
          <tr>
            {["Image", "EN", "AR", "Description", "Actions"].map((h) => (
              <th
                key={h}
                className="text-left px-4 py-3 font-ui text-text3 text-xs"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories?.map((cat, i) => (
            <CategoryRow
              key={cat.id}
              category={cat}
              onEdit={() => onEdit(cat)}
              onDelete={() => onDelete(cat.id)}
              isEven={i % 2 === 0}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
