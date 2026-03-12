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

// ── Inline toggle switch ─────────────────────────────────────────────────────
function Toggle({
  value,
  onChange,
  disabled,
}: {
  value: boolean;
  onChange: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex w-9 h-5 rounded-full transition-colors
        duration-200 focus:outline-none disabled:opacity-40
        ${value ? "bg-gold" : "bg-dark3"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full
          shadow transition-transform duration-200
          ${value ? "translate-x-4" : "translate-x-0"}`}
      />
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ProductsList() {
  const { toasts, show } = useToast();
  const { data, isLoading } = useAdminProducts();
  const deleteMutation = useDeleteProduct();
  const updateStatusMutation = useUpdateProductStatus();

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // Patch a single boolean field without opening the form
  const handleToggle = async (
    id: string,
    field: "isActive" | "isFeatured",
    current: boolean,
  ) => {
    setTogglingId(id);
    try {
      await updateStatusMutation.mutateAsync({
        id,
        data: { [field]: !current },
      });
      show("Updated successfully", "success");
    } catch {
      show("Failed to update", "error");
    }
    setTogglingId(null);
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
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl text-ivory">Products</h1>
            <p className="font-ui text-text3 text-sm mt-1">
              {data?.meta.total ?? 0} products
            </p>
          </div>
          <Link to="/admin/products/new">
            <Button size="sm">+ Add Product</Button>
          </Link>
        </div>

        <div className="bg-dark2 border border-dark3 rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-dark3">
              <tr>
                {[
                  "Image",
                  "Product",
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
                <TableRowSkeleton cols={8} />
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
                      <Toggle
                        value={p.isActive}
                        disabled={togglingId === p.id}
                        onChange={() =>
                          handleToggle(p.id, "isActive", p.isActive)
                        }
                      />
                    </td>

                    {/* Featured toggle */}
                    <td className="px-4 py-3">
                      <Toggle
                        value={p.isFeatured}
                        disabled={togglingId === p.id}
                        onChange={() =>
                          handleToggle(p.id, "isFeatured", p.isFeatured)
                        }
                      />
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
