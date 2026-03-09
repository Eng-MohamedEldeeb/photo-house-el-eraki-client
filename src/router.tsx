import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import { ProtectedRoute } from "./components/layout/ProtectedRoute";

import AdminLayout from "./components/layout/AdminLayout";
import { PublicLayout } from "./components/layout/PublicLayout";

const Landing = lazy(() => import("./pages/Landing"));
const Store = lazy(() => import("./pages/Store"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const AdminLogin = lazy(() => import("./pages/Admin/Login"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const AdminProducts = lazy(() => import("./pages/Admin/Products"));
const AdminCategories = lazy(() => import("./pages/Admin/Categories"));

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/store", element: <Store /> },
      { path: "/products/:id", element: <ProductDetail /> },
    ],
  },
  { path: "/admin/login", element: <AdminLogin /> },
  {
    // ProtectedRoute → AdminLayout → admin pages
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: "/admin", element: <Dashboard /> },
          { path: "/admin/products", element: <AdminProducts /> },
          { path: "/admin/products/new", element: <AdminProducts /> },
          { path: "/admin/products/:id/edit", element: <AdminProducts /> },
          { path: "/admin/categories", element: <AdminCategories /> },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
