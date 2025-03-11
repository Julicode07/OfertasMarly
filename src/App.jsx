import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ViewProducts from "./pages/ProductsPage";
import ProductView from "./modules/ProductsPage/ProductView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/productos" element={<ViewProducts />} />
      <Route path="/producto/:id" element={<ProductView />} />
    </Routes>
  );
}

export default App;
