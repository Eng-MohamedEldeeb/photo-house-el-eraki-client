import type { ImportResultDto } from "../types/product.types";
import api from "./axios";

export const importExportApi = {
  // ── Excel Export ─────────────────────────────────────────────────────────
  // Returns a Blob — caller triggers browser download

  exportProducts: async (): Promise<void> => {
    const res = await api.get("/admin/export/products", {
      responseType: "blob",
    });
    downloadBlob(res.data, `products-${Date.now()}.xlsx`);
  },

  exportCategories: async (): Promise<void> => {
    const res = await api.get("/admin/export/categories", {
      responseType: "blob",
    });
    downloadBlob(res.data, `categories-${Date.now()}.xlsx`);
  },

  // ── Excel Import ──────────────────────────────────────────────────────────
  // Sends multipart/form-data with the .xlsx file

  importProducts: (file: File): Promise<ImportResultDto> =>
    api
      .post("/admin/import/products", toFormData(file), {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data),

  importCategories: (file: File): Promise<ImportResultDto> =>
    api
      .post("/admin/import/categories", toFormData(file), {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data),
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function toFormData(file: File): FormData {
  const fd = new FormData();
  fd.append("file", file);
  return fd;
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
