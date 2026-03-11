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
      .then((r) => r.data)
      .catch((e) => {
        console.error("Get products error:", e.response?.data || e);
      }),
  getById: (id: string) =>
    api
      .get<Product>(`/products/single/${id}`)
      .then((r) => r.data)
      .catch((e) => {
        console.error("Get product error:", e.response?.data || e);
      }),
  getFeatured: () =>
    api
      .get<Product>("/products/featured")
      .then((r) => r.data)
      .catch((e) => {
        console.error("Get featured products error:", e.response?.data || e);
      }),
  // Admin routes
  getAllAdmin: (query?: ProductQuery) =>
    api
      .get<PaginatedResponse<Product>>("/admin/products", { params: query })
      .then((r) => r.data)
      .catch((e) => {
        console.error("Get admin products error:", e.response?.data || e);
      }),
  getStockSummary: () =>
    api
      .get<StockSummary>("/admin/products/stock-summary")
      .then((r) => r.data)
      .catch((e) => {
        console.error("Get stock summary error:", e.response?.data || e);
      }),
  create: (formData: FormData) =>
    api
      .post<Product>("/admin/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data)
      .catch((e) => {
        throw e.response?.data || e;
      }),
  update: (id: string, formData: FormData) =>
    api
      .patch<Product>(`/admin/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data)
      .catch((e) => {
        console.error("Update product error:", e.response?.data || e);
      }),
  updateStock: (id: string, dto: UpdateStockDto) =>
    api
      .patch<Product>(`/admin/products/${id}/stock`, dto)
      .then((r) => r.data)
      .catch((e) => {
        console.error("Update stock error:", e.response?.data || e);
      }),
  delete: (id: string) =>
    api
      .delete(`/admin/products/${id}`)
      .then((r) => r.data)
      .catch((e) => {
        console.error("Delete product error:", e.response?.data || e);
      }),
};
