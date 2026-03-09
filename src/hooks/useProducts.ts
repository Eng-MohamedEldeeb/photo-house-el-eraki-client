import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productsApi } from "../api/products.api";
import type { ProductQuery } from "../types/api.types";

export const PRODUCTS_KEY = "products";
// Fetch paginated products list (public)
export function useProducts(query?: ProductQuery) {
  return useQuery({
    queryKey: [PRODUCTS_KEY, query],
    queryFn: () => productsApi.getAll(query),
  });
}

// Fetch single product by id
export function useProduct(id: number) {
  return useQuery({
    queryKey: [PRODUCTS_KEY, id],
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  });
}

// Admin: fetch all products (incl. inactive)
export function useAdminProducts(query?: ProductQuery) {
  return useQuery({
    queryKey: [PRODUCTS_KEY, "admin", query],
    queryFn: () => productsApi.getAllAdmin(query),
  });
}

// Admin: stock summary for dashboard
export function useStockSummary() {
  return useQuery({
    queryKey: [PRODUCTS_KEY, "stock-summary"],
    queryFn: () => productsApi.getStockSummary(),
  });
}

// Admin: delete product + invalidate list
export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => productsApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [PRODUCTS_KEY] }),
  });
}

// Admin: create product
export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => productsApi.create(formData),
    onSuccess: () => qc.invalidateQueries({ queryKey: [PRODUCTS_KEY] }),
  });
}

// Admin: update product
export function useUpdateProduct(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => productsApi.update(id, formData),
    onSuccess: () => qc.invalidateQueries({ queryKey: [PRODUCTS_KEY] }),
  });
}
