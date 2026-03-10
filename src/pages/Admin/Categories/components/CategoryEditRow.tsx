import { type FormikProps } from "formik";
import Button from "../../../../components/ui/Button";

interface CategoryFormValues {
  nameEn: string;
  nameAr: string;
  description: string;
}

interface CategoryEditRowProps {
  editFormik: FormikProps<CategoryFormValues>;
  onSave: () => void;
  onCancel: () => void;
  loading: boolean;
}

export default function CategoryEditRow({
  editFormik,
  onSave,
  onCancel,
  loading,
}: CategoryEditRowProps) {
  return (
    <tr className="bg-dark/50">
      <td className="px-4 py-3">
        {/* Placeholder for image in edit mode */}
        <div className="w-10 h-10 bg-dark3 rounded overflow-hidden"></div>
      </td>
      <td className="px-3 py-2" colSpan={3}>
        <form onSubmit={editFormik.handleSubmit} className="flex gap-2">
          {(["nameEn", "nameAr", "description"] as const).map((f) => (
            <input
              key={f}
              name={f}
              value={editFormik.values[f]}
              onChange={editFormik.handleChange}
              className="flex-1 bg-dark border border-yellow-400/40
                text-text text-xs rounded px-2 py-1.5
                outline-none"
            />
          ))}
        </form>
      </td>
      <td className="px-3 py-2">
        <div className="flex gap-2">
          <Button size="sm" onClick={onSave} loading={loading}>
            Save
          </Button>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </td>
    </tr>
  );
}
