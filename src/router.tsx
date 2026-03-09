import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import { PublicLayout } from "./components/layout/PublicLayout";
// Lazy load all pages
const Landing = lazy(() => import("./pages/Landing"));
const Store = lazy(() => import("./pages/Store"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const AdminLogin = lazy(() => import("./pages/Admin/Login"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const AdminProducts = lazy(() => import("./pages/Admin/Products"));
const AdminCategories = lazy(() => import("./pages/Admin/Categories"));

// Public layout — Navbar + Footer wrapper

export const router = createBrowserRouter([
  {
    // Public routes — wrapped with Navbar + Footer
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/store", element: <Store /> },
      { path: "/products/:id", element: <ProductDetail /> },
    ],
  },
  {
    // Admin login — standalone, no layout
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    // Admin routes — no public layout (Phase 2: add ProtectedRoute here)
    path: "/admin",
    element: <Dashboard />,
  },
  { path: "/admin/products", element: <AdminProducts /> },
  { path: "/admin/products/new", element: <AdminProducts /> },
  { path: "/admin/products/:id/edit", element: <AdminProducts /> },
  { path: "/admin/categories", element: <AdminCategories /> },
  {
    // Catch-all redirect
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
