import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { logout, selectAdmin } from "../../store/slices/authSlice";

const links = [
  { to: "/admin", label: "Dashboard", labelAr: "Dashboard" },
  { to: "/admin/products", label: "Products", labelAr: "Products" },
  { to: "/admin/categories", label: "Categories", labelAr: "Categories" },
];

export default function AdminSidebar({ onClose }: { onClose: () => void }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const admin = useAppSelector(selectAdmin);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <aside
      className="w-60 shrink-0 bg-dark border-r border-dark3
      flex flex-col h-screen sticky top-0"
    >
      {/* Close button for mobile */}
      {onClose && (
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 text-text3
            hover:text-gold text-lg"
        >
          X
        </button>
      )}

      {/* Logo */}
      <div className="px-6 py-5 border-b border-dark3">
        <p className="font-display text-gold text-base tracking-widest">
          PHOTO HOUSE
        </p>
        <p className="font-arabic text-text3 text-xs mt-0.5">Dashboard</p>
      </div>
      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {links.map(({ to, label, labelAr }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/admin"}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded
              font-ui text-sm transition-colors
              ${
                isActive
                  ? "bg-gold/10 text-gold border-l-2 border-gold"
                  : "text-text2 hover:bg-dark2 hover:text-text"
              }`
            }
          >
            <span>{label}</span>
            <span className="font-ui text-xs opacity-60">{labelAr}</span>
          </NavLink>
        ))}
      </nav>
      {/* Admin info + logout */}
      <div className="px-4 py-4 border-t border-dark3">
        <p className="font-ui text-xs text-text3 mb-3">
          Welcome <span className="text-text2">{admin?.username}</span>
        </p>
        <button
          onClick={handleLogout}
          className="w-full text-left font-ui text-xs text-text3
            hover:text-red transition-colors py-1"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
