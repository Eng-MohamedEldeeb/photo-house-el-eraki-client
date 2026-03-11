import { Suspense } from "react";
import Navbar from "./Navbar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Spinner from "../ui/Spinner";
import Footer from "./Footer";

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<Spinner fullScreen />}>
          <Outlet />
          <ScrollRestoration />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};
