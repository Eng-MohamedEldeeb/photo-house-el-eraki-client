import { useParams, useLocation, useNavigate } from "react-router-dom";
import ProductsList from "./ProductsList";
import ProductForm from "./ProductForm";
import { useProduct } from "../../../hooks/useProducts";
import { useCreateProduct, useUpdateProduct } from "../../../hooks/useProducts";
import Spinner from "../../../components/ui/Spinner";

export default function AdminProducts() {
  const { id } = useParams<{ id?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const isNew = location.pathname.endsWith("/new");
  const isEdit = !!id;

  // Edit: fetch existing product
  const { data: product, isLoading } = useProduct(Number(id));
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct(Number(id));
  const handleSubmit = async (formData: FormData) => {
    if (isNew) {
      await createMutation.mutateAsync(formData);
    } else {
      await updateMutation.mutateAsync(formData);
    }
    navigate("/admin/products");
  };

  // List view
  if (!isNew && !isEdit) return <ProductsList />;

  // Add/Edit form view
  if (isEdit && isLoading) return <Spinner />;
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-display text-2xl text-ivory">
          {isNew ? "Add Product" : "Edit Product"}
        </h1>
      </div>
      <div className="bg-dark2 border border-dark3 rounded p-6">
        <ProductForm
          product={isEdit ? product : undefined}
          onSubmit={handleSubmit}
          loading={createMutation.isPending || updateMutation.isPending}
        />
      </div>
    </div>
  );
}
