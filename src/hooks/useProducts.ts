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
export function useProduct(id: string) {
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
    mutationFn: (id: string) => productsApi.delete(id),
    // 1. Snapshot current cache before mutation
    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: [PRODUCTS_KEY] });
      const prev = qc.getQueriesData({ queryKey: [PRODUCTS_KEY] });
      // 2. Remove item from every cached list immediately
      qc.setQueriesData({ queryKey: [PRODUCTS_KEY] }, (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.filter((p: any) => p.id !== id),
          meta: { ...old.meta, total: old.meta.total - 1 },
        };
      });
      return { prev }; // return snapshot for rollback
    },
    // 3. On error: rollback to snapshot
    onError: (_err, _id, context: any) => {
      if (context?.prev) {
        context.prev.forEach(([key, data]: any) => {
          qc.setQueryData(key, data);
        });
      }
    },
    // 4. Always refetch after settle to stay in sync
    onSettled: () => {
      qc.invalidateQueries({ queryKey: [PRODUCTS_KEY] });
    },
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
export function useUpdateProduct(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => productsApi.update(id, formData),
    onSuccess: () => qc.invalidateQueries({ queryKey: [PRODUCTS_KEY] }),
  });
}
