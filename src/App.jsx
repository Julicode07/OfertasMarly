import { Analytics } from "@vercel/analytics/react";
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader/Loader";

const NotFound = React.lazy(() => import("./pages/NotFound"));
const MainPage = React.lazy(() => import("./pages/MainPage"));
const ProductsPage = React.lazy(() => import("./pages/Products/Products"));
const ProductView = React.lazy(() => import("./pages/Products/ProductView"));
const CategoriesPage = React.lazy(() => import("./pages/Categories"));

const Admin = React.lazy(() => import("./pages/Admin/Admin"));
const AdminProducts = React.lazy(() => import("./pages/Admin/Products"));
const AddProducts = React.lazy(() => import("./pages/Admin/AddProduct"));
const EditProduct = React.lazy(() => import("./pages/Admin/EditProduct"));

function App() {
  return (
    <>
      <Analytics />
      <Routes>
        <Route
          path="/*"
          element={
            <Suspense fallback={<Loader bg={"bg-white/80"} text={"text-gray-200"} fill={"fill-blue-500"} />}>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/productos" element={<ProductsPage />} />
                <Route path="/producto/:id" element={<ProductView />} />
                <Route path="/categorias" element={<CategoriesPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          }
        />

        {/* Rutas de Admin con otro loader */}
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<Loader bg={"bg-zinc-950"} text={"text-zinc-900"} fill={"fill-zinc-400"} />}>
              <Routes>
                <Route path="/" element={<Admin />} />
                <Route path="/products" element={<AdminProducts />} />
                <Route path="/products/add" element={<AddProducts />} />
                <Route path="/products/edit/:id" element={<EditProduct />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
