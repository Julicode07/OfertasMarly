import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";

export default function CategoriesPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_BACKEND_API_URL + "/products");
                if (!response.ok) throw new Error("Error al obtener productos");

                const data = await response.json();
                setProducts(Array.isArray(data.products) ? data.products : []);
            } catch (err) {
                console.error("Error al obtener productos:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const categories = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = 0;
        }
        acc[product.category]++;
        return acc;
    }, {});

    const categoryList = Object.keys(categories).map(category => ({
        name: category,
        count: categories[category],
        image: `/images/Categories/${category.toLowerCase()}.webp`
    }));

    return (
        <div>
            <Navbar />

            <section id="categorias" className="py-4 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">Todas las Categorías</h2>

                    {loading ? (
                        <div className="text-center text-gray-600">Cargando categorías...</div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                            {categoryList.length > 0 ? (
                                categoryList.map(({ name, image, count }) => (
                                    <a key={name} href={`/productos?categoria=${name}`} className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all">
                                        <div className="aspect-square overflow-hidden">
                                            <img alt={name} className="object-cover w-full h-full transition-transform group-hover:scale-105" src={image} loading="lazy" />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4 text-white">
                                            <h3 className="font-bold text-xl">{name}</h3>
                                            <p className="font-semibold text-sm text-white/80">{count} productos</p>
                                        </div>
                                    </a>
                                ))
                            ) : (
                                <div className="text-center text-gray-600">No se encontraron categorías</div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
