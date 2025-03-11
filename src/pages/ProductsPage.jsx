import React from "react";
import { useLocation } from "react-router-dom";
import { products } from "../components/Products/utils/products"; // Asegúrate de importar los productos
import Navbar from "../components/Navbar/Navbar";
import CardProduct from "../components/Products/CardProduct";

export default function ViewProducts() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Obtiene el valor del parámetro "categoria" (ej: "/productos?categoria=electronica")
    const category = queryParams.get("categoria") || "todos";

    // Filtrar productos por categoría (si no se especifica, mostrar todos)
    const filteredProducts = category === "todos"
        ? products
        : products.filter(product => product.category.toLowerCase() === category.toLowerCase());

    return (
        <main>
            <Navbar />
            <div className="p-5">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    {category === "todos" ? "Todos los Productos" : `Productos en ${category}`}
                </h1>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                            <CardProduct key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No hay productos en esta categoría.</p>
                )}
            </div>
        </main>
    );
}
