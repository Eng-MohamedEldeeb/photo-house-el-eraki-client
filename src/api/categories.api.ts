import api from "./axios";

import type { Category } from "../types/category.types";
export const categoriesApi = {
  getAll: () => api.get<Category[]>("/categories").then((r) => r.data),

  getById: (id: string) =>
    api
      .get<Category>(`/categories/${id}`)
      .then((r) => r.data)
      .catch((e) => {
        console.error("Get category error:", e.response?.data || e);
      }),

  // Admin routes — JWT added in Phase 2
  create: (formData: FormData) =>
    api
      .post<Category>("/admin/categories", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data)
      .catch((e) => {
        console.error("Create category error:", e.response?.data || e);
      }),

  update: (id: string, formData: FormData) =>
    api
      .patch<Category>(`/admin/categories/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data)
      .catch((e) => {
        console.error("Update category error:", e.response?.data || e);
      }),

  delete: (id: string) =>
    api
      .delete(`/admin/categories/${id}`)
      .then((r) => r.data)
      .catch((e) => {
        console.error("Delete category error:", e.response?.data || e);
      }),
};
