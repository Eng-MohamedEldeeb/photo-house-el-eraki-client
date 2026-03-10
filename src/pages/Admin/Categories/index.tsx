import { useState } from "react";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "../../../hooks/useCategories";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import CategoryForm from "./components/CategoryForm";
import CategoryList from "./components/CategoryList";
import type { Category } from "../../../types/category.types";

export default function AdminCategories() {
  const { data: categories } = useCategories();

  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const [editItem, setEditItem] = useState<Category | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  return (
    <div className="p-8">
      <h1 className="font-display text-2xl text-ivory mb-6">Categories</h1>
      <CategoryForm
        onSubmit={async (fd) => {
          await createMutation.mutateAsync(fd);
        }}
        loading={createMutation.isPending}
      />

      {editItem && (
        <CategoryForm
          category={editItem}
          onSubmit={async (fd) => {
            await updateMutation.mutateAsync({ id: editItem.id, formData: fd });
            setEditItem(null);
          }}
          loading={updateMutation.isPending}
        />
      )}

      <CategoryList
        categories={categories}
        onEdit={setEditItem}
        onDelete={setDeleteId}
      />
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
