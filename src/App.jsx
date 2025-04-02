import { Analytics } from "@vercel/analytics/react";
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader/Loader";
const MainPage = React.lazy(() => import("./pages/MainPage"));
const ProductsPage = React.lazy(() => import("./pages/Products/Products"));
const ProductView = React.lazy(() => import("./pages/Products/ProductView"));
const CategoriesPage = React.lazy(() => import("./pages/Categories"));
const UploadProducts = React.lazy(() => import("./pages/Admin/UploadProducts/UploadProducts"));
const EditProducts = React.lazy(() => import("./pages/Admin/EditProducts/EditProducts"));
const DeleteProducts = React.lazy(() => import("./pages/Admin/DeleteProducts/DeleteProducts"));

function App() {
  return (
    <>
      <Analytics />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/producto/:id" element={<ProductView />} />
          <Route path="/categorias" element={<CategoriesPage />} />
          <Route path="/admin/upload-images" element={<UploadProducts />} />
          <Route path="/admin/edit-products" element={<EditProducts />} />
          <Route path="/admin/delete-products" element={<DeleteProducts />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
