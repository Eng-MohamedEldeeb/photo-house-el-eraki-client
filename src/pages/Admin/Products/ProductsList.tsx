import { Link } from "react-router-dom";
import { useState } from "react";
import {
  useAdminProducts,
  useDeleteProduct,
  useUpdateProductStatus,
} from "../../../hooks/useProducts";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import Spinner from "../../../components/ui/Spinner";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import ToastContainer from "../../../components/ui/ToastContainer";
import { useToast } from "../../../hooks/useToast";
import TableRowSkeleton from "../../../components/ui/TableRowSkeleton";

export default function ProductsList() {
  const { toasts, show } = useToast();
  const { data, isLoading } = useAdminProducts();

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const deleteMutation = useDeleteProduct();
  const updateStatusMutation = useUpdateProductStatus();

  // Patch a single boolean field without opening the form
  const handleToggle = async (
    id: string,
    field: "isActive" | "isFeatured",
    current: boolean,
  ) => {
    setTogglingId(id);
    console.log({ id, field, current });
    try {
      await updateStatusMutation.mutateAsync({
        id: togglingId || id,
        data: { [field]: !current },
      });
      show("Updated successfully", "success");
      setTogglingId(null);
    } catch {
      show("Failed to update", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteMutation.mutateAsync(deleteId);
      show("Product deleted successfully", "success");
    } catch {
      show("Failed to delete product", "error");
    }
    setDeleteId(null);
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="font-display text-xl sm:text-2xl text-ivory">
              Products
            </h1>
            <p className="font-ui text-text3 text-sm mt-1">
              {data?.meta.total ?? 0} products
            </p>
          </div>
          <Link to="/admin/products/new">
            <Button size="sm">+ Add Product</Button>
          </Link>
        </div>

        {/* Mobile Card Layout */}
        <div className="block sm:hidden space-y-4">
          {isLoading ? (
            <div className="bg-dark2 border border-dark3 rounded p-4">
              <div className="animate-pulse">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-dark3 rounded"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-dark3 rounded mb-2"></div>
                    <div className="h-3 bg-dark3 rounded"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="h-3 bg-dark3 rounded"></div>
                  <div className="h-3 bg-dark3 rounded"></div>
                  <div className="h-3 bg-dark3 rounded"></div>
                  <div className="h-3 bg-dark3 rounded"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-8 bg-dark3 rounded w-16"></div>
                  <div className="h-8 bg-dark3 rounded w-16"></div>
                </div>
              </div>
            </div>
          ) : (
            data?.data.map((p) => (
              <div
                key={p.id}
                className="bg-dark2 border border-dark3 rounded p-4"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-dark3 rounded overflow-hidden flex-shrink-0">
                    {p.imageUrl ? (
                      <img
                        src={p.imageUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-ui text-text text-base font-medium truncate">
                      {p.nameEn}
                    </p>
                    <p className="font-ui text-text3 text-sm truncate">
                      {p.nameAr}
                    </p>
                    <p className="font-ui text-gold text-sm mt-1">
                      {p.price} EGP
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="font-ui text-text3 text-xs">Category</p>
                    <p className="font-ui text-text">{p.category?.nameEn}</p>
                    <p className="font-ui text-text3 text-xs">
                      {p.category?.nameAr}
                    </p>
                  </div>
                  <div>
                    <p className="font-ui text-text3 text-xs">Stock</p>
                    <p className="font-ui text-text2">{p.stockQuantity}</p>
                    <Badge status={p.stockStatus} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-center">
                      <span className="font-ui text-text3 text-xs mb-1">
                        Active
                      </span>
                      <button
                        onClick={() =>
                          handleToggle(p.id, "isActive", p.isActive)
                        }
                        className={`cursor-pointer relative inline-flex w-8 h-4 rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-40 ${
                          p.isActive ? "bg-gold" : "bg-dark3"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform duration-200 ${
                            p.isActive ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-ui text-text3 text-xs mb-1">
                        Featured
                      </span>
                      <button
                        onClick={() =>
                          handleToggle(p.id, "isFeatured", p.isFeatured)
                        }
                        className={`cursor-pointer relative inline-flex w-8 h-4 rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-40 ${
                          p.isFeatured ? "bg-gold" : "bg-dark3"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform duration-200 ${
                            p.isFeatured ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link to={`/admin/products/${p.id}/edit`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => setDeleteId(p.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden sm:block bg-dark2 border border-dark3 rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-dark3">
              <tr>
                {[
                  "Image",
                  "Product",
                  "Category",
                  "Price",
                  "Stock",
                  "Status",
                  "Active",
                  "Featured",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 font-ui text-text3 text-xs tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <TableRowSkeleton cols={9} />
              ) : (
                data?.data.map((p, i) => (
                  <tr
                    key={p.id}
                    className={i % 2 === 0 ? "bg-dark2" : "bg-dark"}
                  >
                    {/* Image */}
                    <td className="px-4 py-3">
                      <div className="w-10 h-10 bg-dark3 rounded overflow-hidden">
                        {p.imageUrl ? (
                          <img
                            src={p.imageUrl}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full" />
                        )}
                      </div>
                    </td>

                    {/* Name */}
                    <td className="px-4 py-3">
                      <p className="font-ui text-text text-sm">{p.nameEn}</p>
                      <p className="font-ui text-text3 text-xs">{p.nameAr}</p>
                    </td>
                    {/* Category */}
                    <td className="px-4 py-3">
                      <p className="font-ui text-text text-sm">
                        {p.category?.nameEn}
                      </p>
                      <p className="font-ui text-text3 text-xs">
                        {p.category?.nameAr}
                      </p>
                    </td>

                    <td className="px-4 py-3 font-ui text-gold">
                      {p.price} EGP
                    </td>
                    <td className="px-4 py-3 font-ui text-text2">
                      {p.stockQuantity}
                    </td>
                    <td className="px-4 py-3">
                      <Badge status={p.stockStatus} />
                    </td>

                    {/* Active toggle */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() =>
                          handleToggle(p.id, "isActive", p.isActive)
                        }
                        className={`cursor-pointer relative inline-flex w-9 h-5 rounded-full transition-colors
        duration-200 focus:outline-none disabled:opacity-40
        ${p.isActive ? "bg-gold" : "bg-dark3"}`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full
          shadow transition-transform duration-200
          ${p.isActive ? "translate-x-4" : "translate-x-0"}`}
                        />
                      </button>
                    </td>

                    {/* Featured toggle */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() =>
                          handleToggle(p.id, "isFeatured", p.isFeatured)
                        }
                        className={`cursor-pointer relative inline-flex w-9 h-5 rounded-full transition-colors
        duration-200 focus:outline-none disabled:opacity-40
        ${p.isFeatured ? "bg-gold" : "bg-dark3"}`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full
          shadow transition-transform duration-200
          ${p.isFeatured ? "translate-x-4" : "translate-x-0"}`}
                        />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link to={`/admin/products/${p.id}/edit`}>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => setDeleteId(p.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <ConfirmModal
          open={deleteId !== null}
          onClose={() => setDeleteId(null)}
          onConfirm={handleDelete}
          loading={deleteMutation.isPending}
          title="Delete Product"
          message="Are you sure? The image will also be removed from Cloudinary."
        />
      </div>
      <ToastContainer toasts={toasts} />
    </>
  );
}
