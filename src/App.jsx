import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const MainPage = React.lazy(() => import("./pages/MainPage"));
const ProductsPage = React.lazy(() => import("./pages/ProductsPage"));
const ProductView = React.lazy(() => import("./modules/ProductsPage/ProductView"));
import Loader from "./components/Loader/Loader";
import CategoriesPage from "./pages/CategoriesPage";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/productos" element={<ProductsPage />} />
        <Route path="/producto/:id" element={<ProductView />} />
        <Route path="/categorias" element={<CategoriesPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
