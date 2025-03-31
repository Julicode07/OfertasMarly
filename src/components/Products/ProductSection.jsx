import React, { useState, useEffect } from "react";
import CardProduct from "./CardProduct";

export default function ProductSection() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(import.meta.env.VITE_BACKEND_API_URL + "/products");
                if (!response.ok) throw new Error("Error al obtener productos");

                const data = await response.json();
                setProducts(data.products || []);
                console.log("Productos obtenidos:", products);
            } catch (err) {
                console.error("Error al obtener productos:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section id="productos" className="py-8 bg-gray-100">
            <div className="container mx-auto px-4 text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Productos Destacados</h3>

                {loading ? (
                    <div className="text-xl text-gray-600">Cargando...</div>
                ) : error ? (
                    <div className="text-xl text-red-600">Error: {error}</div>
                ) : products.length === 0 ? (
                    <div className="text-xl text-gray-600">No hay productos disponibles.</div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {products.slice(0, 10).map(product => (
                            <CardProduct key={product._id} product={product} />
                        ))}
                    </div>
                )}

                <a href="/productos"
                    className="w-full md:w-auto mt-6 flex items-center justify-center gap-2 bg-blue-700 text-white hover:shadow-xl font-semibold px-4 py-3 rounded-lg cursor-pointer group text-nowrap transition-all duration-300">
                    <span>Ver todos los productos</span>
                    <i className="ri-arrow-right-line text-xl transition-transform duration-300 ease-in-out group-hover:scale-110"></i>
                </a>
            </div>
        </section>
    );
}
