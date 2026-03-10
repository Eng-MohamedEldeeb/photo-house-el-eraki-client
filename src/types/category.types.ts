export interface Category {
  id: string;
  nameEn: string;
  nameAr: string;
  imageUrl?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryDto {
  nameEn: string;
  nameAr: string;
  description?: string;
}

export type UpdateCategoryDto = Partial<CreateCategoryDto>;
