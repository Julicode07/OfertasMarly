import { Analytics } from "@vercel/analytics/react";
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const MainPage = React.lazy(() => import("./pages/MainPage"));
const ProductsPage = React.lazy(() => import("./pages/ProductsPage"));
const ProductView = React.lazy(() => import("./modules/ProductsPage/ProductView"));
import Loader from "./components/Loader/Loader";
import CategoriesPage from "./pages/CategoriesPage";
import DragAndDrop from "./pages/Admin/DragAndDrop/DragAndDrop";
import EditProducts from "./pages/Admin/EditProducts/EditProducts";
import DeleteProducts from "./pages/Admin/DeleteProducts/DeleteProducts";

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
          <Route path="/admin/upload-images" element={<DragAndDrop />} />
          <Route path="/admin/edit-products" element={<EditProducts />} />
          <Route path="/admin/delete-products" element={<DeleteProducts />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
