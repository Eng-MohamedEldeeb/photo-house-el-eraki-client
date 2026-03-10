import Button from "../../../../components/ui/Button";
import type { Category } from "../../../../types/category.types";

interface CategoryRowProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
  isEven: boolean;
}

export default function CategoryRow({
  category,
  onEdit,
  onDelete,
  isEven,
}: CategoryRowProps) {
  return (
    <tr className={isEven ? "bg-dark2" : "bg-dark"}>
      <td className="px-4 py-3">
        <div className="w-10 h-10 bg-dark3 rounded overflow-hidden">
          {category.imageUrl ? (
            <img
              src={category.imageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full" />
          )}
        </div>
      </td>
      <td className="px-4 py-3 font-ui text-text2">{category.nameEn}</td>
      <td className="px-4 py-3 font-arabic text-text">{category.nameAr}</td>
      <td className="px-4 py-3 font-ui text-text3 text-xs">
        {category.description ?? "—"}
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(category)}>
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(category.id)}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );
}
