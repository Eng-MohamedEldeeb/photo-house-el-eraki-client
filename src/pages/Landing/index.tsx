import HeroSection from "./HeroSection";
import Ticker from "./Ticker";
import CategoriesSection from "./CategoriesSection";
import { useEffect, useState } from "react";
import { categoriesApi } from "../../api/categories.api";
import type { Category } from "../../types/category.types";

export default function Landing() {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    categoriesApi.getAll().then(setCategories).catch(console.error);
  }, []);
  return (
    <div className="bg-black">
      <HeroSection />
      <Ticker />
      <CategoriesSection categories={categories} />
    </div>
  );
}
