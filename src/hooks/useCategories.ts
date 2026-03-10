import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { categoriesApi } from "../api/categories.api";

export const CATEGORIES_KEY = "categories";

export function useCategories() {
  return useQuery({
    queryKey: [CATEGORIES_KEY],
    queryFn: () => categoriesApi.getAll(),
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: [CATEGORIES_KEY, id],
    queryFn: () => categoriesApi.getById(id),
    enabled: !!id,
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => categoriesApi.create(formData),
    onSuccess: () => qc.invalidateQueries({ queryKey: [CATEGORIES_KEY] }),
  });
}

export function useUpdateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      categoriesApi.update(id, formData),
    onSuccess: () => qc.invalidateQueries({ queryKey: [CATEGORIES_KEY] }),
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => categoriesApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [CATEGORIES_KEY] }),
  });
}
