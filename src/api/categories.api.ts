import api from "./axios";

import type {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "../types/category.types";
export const categoriesApi = {
  getAll: () => api.get<Category[]>("/categories").then((r) => r.data),

  getById: (id: number) =>
    api.get<Category>(`/categories/${id}`).then((r) => r.data),

  // Admin routes — JWT added in Phase 2
  create: (dto: CreateCategoryDto) =>
    api.post<Category>("/admin/categories", dto).then((r) => r.data),

  update: (id: number, dto: UpdateCategoryDto) =>
    api.patch<Category>(`/admin/categories/${id}`, dto).then((r) => r.data),

  delete: (id: number) =>
    api.delete(`/admin/categories/${id}`).then((r) => r.data),
};
