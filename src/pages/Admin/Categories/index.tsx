import { useRef, useState } from "react";
import * as Yup from "yup";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "../../../hooks/useCategories";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import type { Category } from "../../../types/category.types";
import { useToast } from "../../../hooks/useToast";
import { useFormik } from "formik";
import type { ImportResultDto } from "../../../types/product.types";
import Button from "../../../components/ui/Button";
import { importExportApi } from "../../../api/importExport.api";
import ImportResultModal from "./components/ImportResultModal";
import ToastContainer from "../../../components/ui/ToastContainer";

export default function AdminCategories() {
  const { toasts, show } = useToast();
  const { data: categories } = useCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const [editItem, setEditItem] = useState<Category | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResultDto | null>(
    null,
  );

  const schema = Yup.object({
    nameEn: Yup.string().min(2).required("Required"),
    nameAr: Yup.string().min(2).required("Required"),
    description: Yup.string().min(2).required("Required"),
  });

  const addFormik = useFormik({
    initialValues: { nameEn: "", nameAr: "", description: "" },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      const fd = new FormData();
      Object.entries(values).forEach(([k, v]) => {
        if (v !== "" && v !== null && v !== undefined) fd.append(k, String(v));
      });
      await createMutation.mutateAsync(fd);
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
      const fd = new FormData();

      Object.entries(values).forEach(([k, v]) => {
        if (v !== "" && v !== null && v !== undefined) fd.append(k, String(v));
      });
      await updateMutation.mutateAsync({ id: editItem.id, formData: fd });
      setEditItem(null);
    },
  });

  const handleExport = async () => {
    setExporting(true);
    try {
      await importExportApi.exportCategories();
      show("Export downloaded", "success");
    } catch {
      show("Export failed", "error");
    }
    setExporting(false);
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    setImporting(true);
    try {
      const result = await importExportApi.importCategories(file);
      setImportResult(result);
    } catch {
      show("Import failed", "error");
    }
    setImporting(false);
  };

  return (
    <>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl text-ivory">Categories</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              loading={exporting}
              onClick={handleExport}
            >
              ↓ Export
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={handleImportFile}
            />
            <Button
              variant="outline"
              size="sm"
              loading={importing}
              onClick={() => fileRef.current?.click()}
            >
              ↑ Import
            </Button>
          </div>
        </div>

        {/* Add form */}
        <div className="bg-dark2 border border-dark3 rounded p-5 mb-8">
          <h2 className="font-ui text-sm font-semibold text-text mb-4">
            Add New Category
          </h2>
          <form
            onSubmit={addFormik.handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {(
              [
                ["nameEn", "Name EN"],
                ["nameAr", "Name (AR)"],
                ["description", "Description"],
              ] as const
            ).map(([name, lbl]) => (
              <input
                key={name}
                name={name}
                placeholder={lbl}
                value={(addFormik.values as Record<string, string>)[name]}
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

        {/* Table */}
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
                  // Inline edit row
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
                                (editFormik.values as Record<string, string>)[f]
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
                    <td className="px-4 py-3 font-ui text-text2">
                      {cat.nameEn}
                    </td>
                    <td className="px-4 py-3 font-ui text-text">
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

      {importResult && (
        <ImportResultModal
          result={importResult}
          onClose={() => setImportResult(null)}
        />
      )}
      <ToastContainer toasts={toasts} />
    </>
  );
}
