import { Link } from "react-router-dom";
import { useState } from "react";
import { useAdminProducts, useDeleteProduct } from "../../../hooks/useProducts";
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
  const deleteMutation = useDeleteProduct();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(deleteId!);
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
        </div>{" "}
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
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 font-ui
                  text-text3 text-xs tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <TableRowSkeleton cols={6} />
              ) : (
                data?.data.map((p, i) => (
                  <tr
                    key={p.id}
                    className={i % 2 === 0 ? "bg-dark2" : "bg-dark"}
                  >
                    {/* Image thumbnail */}
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
                      <p className="font-arabic text-text text-sm">
                        {p.nameAr}
                      </p>
                      <p className="font-ui text-text3 text-xs">{p.nameEn}</p>
                    </td>
                    <td className="px-4 py-3 font-ui text-yellow-400">
                      {p.price} EGP
                    </td>
                    <td className="px-4 py-3 font-ui text-text2">
                      {p.stockQuantity}
                    </td>
                    <td className="px-4 py-3">
                      <Badge status={p.stockStatus} />
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
