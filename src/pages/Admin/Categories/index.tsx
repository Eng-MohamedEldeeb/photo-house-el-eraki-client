import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "../../../hooks/useCategories";
import Button from "../../../components/ui/Button";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import type { Category } from "../../../types/category.types";

const schema = Yup.object({
  nameEn: Yup.string().min(2).required("Required"),
  nameAr: Yup.string().min(2).required("Required"),
});

export default function AdminCategories() {
  const { data: categories } = useCategories();

  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();
  const [editItem, setEditItem] = useState<Category | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const addFormik = useFormik({
    initialValues: { nameEn: "", nameAr: "", description: "" },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      await createMutation.mutateAsync(values);
      resetForm();
    },
  });

  const editFormik = useFormik({
    initialValues: {
      nameEn: editItem?.nameEn ?? "",
      nameAr: editItem?.nameAr ?? "",
      description: editItem?.description ?? "",
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: async (values) => {
      if (!editItem) return;
      await updateMutation.mutateAsync({ id: editItem.id, dto: values });
      setEditItem(null);
    },
  });

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl text-ivory mb-6">Categories</h1>
      {/* Add form */}
      <div className="bg-dark2 border border-dark3 rounded p-5 mb-8">
        <h2 className="font-ui text-sm font-semibold text-text mb-4">
          Add New Category
        </h2>
        <form
          onSubmit={addFormik.handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            ["nameEn", "Name EN"],
            ["nameAr", "Name (AR)"],
            ["description", "Description"],
          ].map(([name, lbl]) => (
            <input
              key={name}
              name={name}
              placeholder={lbl}
              value={addFormik.values[name as keyof typeof addFormik.values]}
              onChange={addFormik.handleChange}
              className="bg-dark border border-dark3 focus:border-gold
                text-text text-sm rounded px-3 py-2.5 outline-none
                transition-colors"
            />
          ))}
          <Button type="submit" size="sm" loading={createMutation.isPending}>
            Add
          </Button>
        </form>
      </div>
      {/* List */}
      <div className="bg-dark2 border border-dark3 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-dark3">
            <tr>
              {["EN", "AR", "Description", "Actions"].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3
                  font-ui text-text3 text-xs"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories?.map((cat, i) =>
              editItem?.id === cat.id ? (
                // inline edit row
                <tr key={cat.id} className="bg-dark/50">
                  <td className="px-3 py-2" colSpan={3}>
                    <form
                      onSubmit={editFormik.handleSubmit}
                      className="flex gap-2"
                    >
                      {(["nameEn", "nameAr", "description"] as const).map(
                        (f) => (
                          <input
                            key={f}
                            name={f}
                            value={
                              editFormik.values[
                                f as keyof typeof editFormik.values
                              ]
                            }
                            onChange={editFormik.handleChange}
                            className="flex-1 bg-dark border border-gold/40
                            text-text text-xs rounded px-2 py-1.5
                            outline-none"
                          />
                        ),
                      )}
                    </form>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => editFormik.submitForm()}
                        loading={updateMutation.isPending}
                      >
                        Save
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditItem(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr
                  key={cat.id}
                  className={i % 2 === 0 ? "bg-dark2" : "bg-dark"}
                >
                  <td className="px-4 py-3 font-ui text-text2">{cat.nameEn}</td>
                  <td className="px-4 py-3 font-arabic text-text">
                    {cat.nameAr}
                  </td>
                  <td className="px-4 py-3 font-ui text-text3 text-xs">
                    {cat.description ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditItem(cat)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => setDeleteId(cat.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
      <ConfirmModal
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => {
          await deleteMutation.mutateAsync(deleteId!);
          setDeleteId(null);
        }}
        loading={deleteMutation.isPending}
        title="Delete Category"
        message="All products in this category will be unlinked (not deleted)."
      />
    </div>
  );
}
