export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface Product {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  price: number;
  sku?: string;
  stockQuantity: number;
  soldQuantity: number;
  lowStockThreshold: number;
  stockStatus: StockStatus;
  imageUrl?: string;
  isFeatured: boolean;
  isActive: boolean;
  category?: { id: string; nameEn: string; nameAr: string };
  categoryId?: number;
  viewCount?: number;
  createdAt: string;
  updatedAt: string;
}
export interface CreateProductDto {
  nameEn: string;
  nameAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  price: number;
  sku?: string;
  stockQuantity?: number;
  lowStockThreshold?: number;
  categoryId?: number;
  isFeatured?: boolean;
}

export type UpdateProductDto = Partial<CreateProductDto> & {
  isActive?: boolean;
};

export interface UpdateStockDto {
  stockQuantity: number;
  soldQuantity?: number;
}

export interface UpdateProductStatusDto {
  isActive?: boolean;
  isFeatured?: boolean;
}

// Paginated response shape from Phase 3 backend
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ProductQuery {
  search?: string;
  categoryId?: number;
  stockStatus?: string;
  page?: number;
  limit?: number;
}

export interface StockSummary {
  total: number;
  inStock: number;
  lowStock: number;
  outOfStock: number;
  totalSold: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  admin: { id: number; username: string };
}

// Returned by all import endpoints (Excel + Google Sheets pull)
export interface ImportResultDto {
  inserted: number;
  updated: number;
  skipped: number;
  errors: { row: number; message: string }[];
}
