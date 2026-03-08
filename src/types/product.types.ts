export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";
export interface Product {
  id: number;
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
  category?: { id: number; nameEn: string; nameAr: string };
  categoryId?: number;
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
