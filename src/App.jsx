import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const MainPage = React.lazy(() => import("./pages/MainPage"));
const ViewProducts = React.lazy(() => import("./pages/ProductsPage"));
const ProductView = React.lazy(() => import("./modules/ProductsPage/ProductView"));
import Loader from "./components/Loader/Loader";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/productos" element={<ViewProducts />} />
        <Route path="/producto/:id" element={<ProductView />} />
      </Routes>
    </Suspense>
  );
}

export default App;
