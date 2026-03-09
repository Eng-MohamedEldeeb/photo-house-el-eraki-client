import { useFormik, useFormikContext } from "formik";
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
  categoryId: Yup.number().nullable(),
});

// typed form values to avoid `any` usage in Formik context
interface FormValues {
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  sku: string;
  stockQuantity: number;
  lowStockThreshold: number;
  categoryId: string;
  isFeatured: boolean;
  isActive: boolean;
}

interface Props {
  product?: Product;
  onSubmit: (formData: FormData) => Promise<void>;
  loading?: boolean;
}

// -------------------------------------------------------
// reusable form field component declared outside render
// uses Formik context to access form state/actions
// -------------------------------------------------------
interface FieldProps {
  name: keyof FormValues;
  label: string;
  labelAr: string;
  type?: string;
  as?: string;
}

function Field({ name, label, labelAr, type = "text", as }: FieldProps) {
  const { values, handleChange, handleBlur, touched, errors } =
    useFormikContext<FormValues>();

  const value = values[name] as string | number | boolean;
  const error = errors[name] as string | undefined;
  const isTouched = touched[name] as boolean | undefined;

  return (
    <div>
      <label className="font-ui text-xs text-text3 mb-1 block">
        <span className="font-arabic">{labelAr}</span> | {label}
      </label>
      {as === "textarea" ? (
        <textarea
          name={name}
          rows={3}
          value={value as string}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full bg-dark border border-dark3 focus:border-gold
            text-text text-sm rounded px-3 py-2.5 outline-none
            transition-colors resize-none"
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value as string}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full bg-dark border border-dark3 focus:border-gold
            text-text text-sm rounded px-3 py-2.5 outline-none transition-colors"
        />
      )}
      {isTouched && error && <p className="text-red text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function ProductForm({ product, onSubmit, loading }: Props) {
  const { data: categories } = useCategories();
  const [preview, setPreview] = useState<string | null>(
    product?.imageUrl ?? null,
  );
  const fileRef = useRef<HTMLInputElement>(null);

  const formik = useFormik<FormValues>({
    initialValues: {
      nameEn: product?.nameEn ?? "",
      nameAr: product?.nameAr ?? "",
      descriptionEn: product?.descriptionEn ?? "",
      descriptionAr: product?.descriptionAr ?? "",
      price: product?.price ?? 0,
      sku: product?.sku ?? "",
      stockQuantity: product?.stockQuantity ?? 0,
      lowStockThreshold: product?.lowStockThreshold ?? 10,
      categoryId: product?.categoryId != null ? String(product.categoryId) : "",
      isFeatured: product?.isFeatured ?? false,
      isActive: product?.isActive ?? true,
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
      <Field name="nameEn" label="Name (EN)" labelAr="Name (EN)" />
      <Field name="nameAr" label="Name (AR)" labelAr="Name (AR)" />
      <Field
        name="descriptionEn"
        label="Description (EN)"
        labelAr="Description (EN)"
        as="textarea"
      />
      <Field
        name="descriptionAr"
        label="Description (AR)"
        labelAr="Description (AR)"
        as="textarea"
      />
      <Field name="price" label="Price (EGP)" labelAr="Price" type="number" />
      <Field name="sku" label="SKU" labelAr="SKU" />
      <Field
        name="stockQuantity"
        label="Stock Qty"
        labelAr="Quantity"
        type="number"
      />
      <Field
        name="lowStockThreshold"
        label="Low Stock Threshold"
        labelAr="Low Stock Threshold"
        type="number"
      />
      {/* Category select */}
      <div>
        <label className="font-ui text-xs text-text3 mb-1 block">
          Category
        </label>
        <select
          name="categoryId"
          value={formik.values.categoryId}
          onChange={formik.handleChange}
          className="w-full bg-dark border border-dark3 focus:border-gold
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
            text-xs rounded px-3 py-2.5 file:mr-3 file:bg-gold
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
      {/* Checkboxes */}
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
              className="accent-gold w-4 h-4"
            />
            {lbl}
          </label>
        ))}
      </div>
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
