import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useRef } from "react";
import Button from "../../../components/ui/Button";
import { useCategories } from "../../../hooks/useCategories";
import type { Product } from "../../../types/product.types";

const schema = Yup.object({
  nameEn: Yup.string().min(2).required("Required"),
  nameAr: Yup.string().min(2).required("Required"),
  price: Yup.number().min(0).required("Required"),
  stockQuantity: Yup.number().min(0).required("Required"),
  categoryId: Yup.string().nullable(),
  descriptionEn: Yup.string().nullable(),
  descriptionAr: Yup.string().nullable(),
  sku: Yup.string().nullable(),
  lowStockThreshold: Yup.number().min(0).nullable(),
  // isFeatured: Yup.boolean().required("Required"),
  // isActive: Yup.boolean().required("Required"),
});

interface Props {
  product?: Product;
  onSubmit: (formData: FormData) => Promise<void>;
  loading?: boolean;
}
export default function ProductForm({ product, onSubmit, loading }: Props) {
  const { data: categories } = useCategories();
  const [preview, setPreview] = useState<string | null>(
    product?.imageUrl ?? null,
  );

  const fileRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      nameEn: product ? product.nameEn : "camera",
      nameAr: product ? product.nameAr : "كاميرا",
      descriptionEn: product ? product.descriptionEn : "description",
      descriptionAr: product ? product.descriptionAr : "ىصف المنتج",
      price: product ? product.price : 0,
      sku: product ? product.sku : "sku123",
      stockQuantity: product ? product.stockQuantity : 20,
      lowStockThreshold: product ? product.lowStockThreshold : 10,
      categoryId: product ? product.categoryId : "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const fd = new FormData();
      Object.entries(values).forEach(([k, v]) => {
        if (v !== "" && v !== null && v !== undefined) fd.append(k, String(v));
      });
      if (fileRef.current?.files?.[0])
        fd.append("image", fileRef.current.files[0]);
      await onSubmit(fd);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      <div>
        <label className="font-ui text-xs text-text3 mb-1 block">
          <span className="font-arabic">Name (EN)</span> | Name (EN)
        </label>
        <input
          name="nameEn"
          type="text"
          value={formik.values.nameEn}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full bg-dark border border-dark3 focus:border-yellow-400
          text-text text-sm rounded px-3 py-2.5 outline-none transition-colors"
        />
        {formik.touched.nameEn && formik.errors.nameEn && (
          <p className="text-red text-xs mt-1">{formik.errors.nameEn}</p>
        )}
      </div>
      <div>
        <label className="font-ui text-xs text-text3 mb-1 block">
          <span className="font-arabic">Name (AR)</span> | Name (AR)
        </label>
        <input
          name="nameAr"
          type="text"
          value={formik.values.nameAr}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full bg-dark border border-dark3 focus:border-yellow-400
          text-text text-sm rounded px-3 py-2.5 outline-none transition-colors"
        />
        {formik.touched.nameAr && formik.errors.nameAr && (
          <p className="text-red text-xs mt-1">{formik.errors.nameAr}</p>
        )}
      </div>
      <div>
        <label className="font-ui text-xs text-text3 mb-1 block">
          <span className="font-arabic">Description (EN)</span> | Description
          (EN)
        </label>
        <textarea
          name="descriptionEn"
          rows={3}
          value={formik.values.descriptionEn}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full bg-dark border border-dark3 focus:border-yellow-400
            text-text text-sm rounded px-3 py-2.5 outline-none
            transition-colors resize-none"
        />
        {formik.touched.descriptionEn && formik.errors.descriptionEn && (
          <p className="text-red text-xs mt-1">{formik.errors.descriptionEn}</p>
        )}
      </div>
      <div>
        <label className="font-ui text-xs text-text3 mb-1 block">
          <span className="font-arabic">Description (AR)</span> | Description
          (AR)
        </label>
        <textarea
          name="descriptionAr"
          rows={3}
          value={formik.values.descriptionAr}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full bg-dark border border-dark3 focus:border-yellow-400
            text-text text-sm rounded px-3 py-2.5 outline-none
            transition-colors resize-none"
        />
        {formik.touched.descriptionAr && formik.errors.descriptionAr && (
          <p className="text-red text-xs mt-1">{formik.errors.descriptionAr}</p>
        )}
      </div>
      <div>
        <label className="font-ui text-xs text-text3 mb-1 block">
          <span className="font-arabic">Price</span> | Price (EGP)
        </label>
        <input
          name="price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full bg-dark border border-dark3 focus:border-yellow-400
            text-text text-sm rounded px-3 py-2.5 outline-none transition-colors"
        />
        {formik.touched.price && formik.errors.price && (
          <p className="text-red text-xs mt-1">{formik.errors.price}</p>
        )}
      </div>
      <div>
        <label className="font-ui text-xs text-text3 mb-1 block">
          <span className="font-arabic">SKU</span> | SKU
        </label>
        <input
          name="sku"
          type="text"
          value={formik.values.sku}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full bg-dark border border-dark3 focus:border-yellow-400
            text-text text-sm rounded px-3 py-2.5 outline-none transition-colors"
        />
        {formik.touched.sku && formik.errors.sku && (
          <p className="text-red text-xs mt-1">{formik.errors.sku}</p>
        )}
      </div>
      <div>
        <label className="font-ui text-xs text-text3 mb-1 block">
          <span className="font-arabic">Quantity</span> | Stock Qty
        </label>
        <input
          name="stockQuantity"
          type="text"
          value={formik.values.stockQuantity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full bg-dark border border-dark3 focus:border-yellow-400
            text-text text-sm rounded px-3 py-2.5 outline-none transition-colors"
        />
        {formik.touched.stockQuantity && formik.errors.stockQuantity && (
          <p className="text-red text-xs mt-1">{formik.errors.stockQuantity}</p>
        )}
      </div>
      <div>
        <label className="font-ui text-xs text-text3 mb-1 block">
          <span className="font-arabic">Low Stock Threshold</span> | Low Stock
          Threshold
        </label>
        <input
          name="lowStockThreshold"
          type="number"
          value={formik.values.lowStockThreshold}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full bg-dark border border-dark3 focus:border-yellow-400
            text-text text-sm rounded px-3 py-2.5 outline-none transition-colors"
        />
        {formik.touched.lowStockThreshold &&
          formik.errors.lowStockThreshold && (
            <p className="text-red text-xs mt-1">
              {formik.errors.lowStockThreshold}
            </p>
          )}
      </div>
      {/* Category select */}
      <div>
        <label className="font-ui text-xs text-text3 mb-1 block">
          Category
        </label>
        <select
          name="categoryId"
          value={formik.values.categoryId}
          onChange={formik.handleChange}
          className="w-full bg-dark border border-dark3 focus:border-yellow-400
            text-text text-sm rounded px-3 py-2.5 outline-none transition-colors"
        >
          <option value="">— No Category</option>
          {categories?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nameAr} | {c.nameEn}
            </option>
          ))}
        </select>
      </div>
      {/* Image upload */}
      <div>
        <label className="font-ui text-xs text-text3 mb-1 block">Image</label>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full bg-dark border border-dark3 text-text3
            text-xs rounded px-3 py-2.5 file:mr-3 file:bg-yellow-400
            file:text-dark file:border-0 file:px-3 file:py-1
            file:rounded file:font-ui file:text-xs cursor-pointer"
        />
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="mt-2 w-24 h-24 object-cover rounded border
              border-dark3"
          />
        )}
      </div>
      {/* Checkboxes
      <div className="col-span-full flex items-center gap-6">
        {[
          ["isFeatured", "Featured"],
          ["isActive", "Active"],
        ].map(([name, lbl]) => (
          <label
            key={name}
            className="flex items-center gap-2
            font-ui text-sm text-text2 cursor-pointer"
          >
            <input
              type="checkbox"
              name={name}
              checked={
                formik.values[name as keyof typeof formik.values] as boolean
              }
              onChange={formik.handleChange}
              className="accent-yellow-400 w-4 h-4"
            />
            {lbl}
          </label>
        ))}
      </div> */}
      <div
        className="col-span-full flex justify-end gap-3 pt-2
        border-t border-dark3"
      >
        <Button type="submit" loading={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
