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
  categoryId?: string;
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
  admin: { id: string; username: string };
}
