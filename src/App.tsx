import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Spinner from "./components/ui/Spinner";
// Lazy load pages for better performance
const Landing = lazy(() => import("./pages/Landing"));
const Store = lazy(() => import("./pages/Store"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const AdminLogin = lazy(() => import("./pages/Admin/Login"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const AdminProducts = lazy(() => import("./pages/Admin/Products"));
const AdminCategories = lazy(() => import("./pages/Admin/Categories"));

// Phase 2: ProtectedRoute will be imported here
export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner fullScreen />}>
        <Routes>
          {/* Public routes — with Navbar + Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/store" element={<Store />} />
            <Route path="/products/:id" element={<ProductDetail />} />
          </Route>
          {/* Admin routes — no Navbar/Footer */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/new" element={<AdminProducts />} />
          <Route path="/admin/products/:id/edit" element={<AdminProducts />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          Photo House El Eraki — Backend Phase 1: Core Setup Page 14
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
// Layout wrapper for public pages
function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
