import { Link } from "react-router-dom";
import Badge from "../../../../components/ui/Badge";

interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  price: number;
  stockStatus: string;
}

interface RecentProductsProps {
  products: Product[] | undefined;
}

export default function RecentProducts({ products }: RecentProductsProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-ui font-semibold text-text text-sm tracking-wider">
          Recent Products
        </h2>
        <Link
          to="/admin/products"
          className="font-ui text-xs text-yellow-400 hover:underline"
        >
          View all →
        </Link>
      </div>
      <div className="bg-dark2 border border-dark3 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-dark3">
            <tr>
              {["Product", "Price", "Stock"].map((h) => (
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
            {products?.map((p, i) => (
              <tr key={p.id} className={i % 2 === 0 ? "bg-dark2" : "bg-dark"}>
                <td className="px-4 py-3">
                  <p className="font-arabic text-text text-sm">{p.nameAr}</p>
                  <p className="font-ui text-text3 text-xs">{p.nameEn}</p>
                </td>
                <td className="px-4 py-3 font-ui text-yellow-400 text-sm">
                  {p.price} EGP
                </td>
                <td className="px-4 py-3">
                  <Badge
                    status={
                      p.stockStatus as "in_stock" | "low_stock" | "out_of_stock"
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
