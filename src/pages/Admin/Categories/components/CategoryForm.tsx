import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useRef } from "react";
import Button from "../../../../components/ui/Button";
import type { Category } from "../../../../types/category.types";

const schema = Yup.object({
  nameEn: Yup.string().min(2).required("Required"),
  nameAr: Yup.string().min(2).required("Required"),
  description: Yup.string().nullable(),
});

interface CategoryFormProps {
  category?: Category;
  onSubmit: (formData: FormData) => Promise<void>;
  loading?: boolean;
}

export default function CategoryForm({
  category,
  onSubmit,
  loading,
}: CategoryFormProps) {
  const [preview, setPreview] = useState<string | null>(
    category?.imageUrl ?? null,
  );

  const fileRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      nameEn: category ? category.nameEn : "",
      nameAr: category ? category.nameAr : "",
      description: category ? category.description : "",
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
      if (!category) formik.resetForm();
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="bg-dark2 border border-dark3 rounded p-5 mb-8">
      <h2 className="font-ui text-sm font-semibold text-text mb-4">
        {category ? "Edit Category" : "Add New Category"}
      </h2>
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
        <div className="md:col-span-2">
          <label className="font-ui text-xs text-text3 mb-1 block">
            <span className="font-arabic">Description</span> | Description
          </label>
          <textarea
            name="description"
            rows={3}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full bg-dark border border-dark3 focus:border-yellow-400
              text-text text-sm rounded px-3 py-2.5 outline-none
              transition-colors resize-none"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red text-xs mt-1">{formik.errors.description}</p>
          )}
        </div>
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
        <div className="md:col-span-2 flex justify-end gap-3 pt-2 border-t border-dark3">
          <Button type="submit" loading={loading}>
            {loading ? "Saving..." : category ? "Update" : "Add"}
          </Button>
        </div>
      </form>
    </div>
  );
}
