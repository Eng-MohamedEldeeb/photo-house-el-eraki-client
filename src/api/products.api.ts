import api from "./axios";
import type { Product, UpdateStockDto } from "../types/product.types";

import type {
  PaginatedResponse,
  ProductQuery,
  StockSummary,
} from "../types/api.types";
export const productsApi = {
  getAll: (query?: ProductQuery) =>
    api
      .get<PaginatedResponse<Product>>("/products", { params: query })
      .then((r) => r.data),
  getById: (id: number) =>
    api.get<Product>(`/products/${id}`).then((r) => r.data),
  // Admin routes
  getAllAdmin: (query?: ProductQuery) =>
    api
      .get<PaginatedResponse<Product>>("/admin/products", { params: query })
      .then((r) => r.data),
  getStockSummary: () =>
    api.get<StockSummary>("/admin/products/stock-summary").then((r) => r.data),
  create: (formData: FormData) =>
    api
      .post<Product>("/admin/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data),
  update: (id: number, formData: FormData) =>
    api
      .patch<Product>(`/admin/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data),
  updateStock: (id: number, dto: UpdateStockDto) =>
    api.patch<Product>(`/admin/products/${id}/stock`, dto).then((r) => r.data),
  delete: (id: number) =>
    api.delete(`/admin/products/${id}`).then((r) => r.data),
};
