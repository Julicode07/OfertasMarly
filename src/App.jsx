import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ViewProducts from "./pages/ProductsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/productos" element={<ViewProducts />} />
    </Routes>
  );
}

export default App;
