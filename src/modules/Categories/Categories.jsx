import React, { useState, useEffect } from "react";

export default function Categories() {
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

    const categoryData = [
        { name: "Cocina", image: "cocina.webp" },
        { name: "Belleza", image: "belleza.webp" },
        { name: "Iluminacion", image: "iluminacion.webp" },
        { name: "Accesorios", image: "accesorios.webp" },
    ];

    return (
        <section id="categorias" className="py-8 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Explora por Categorías</h2>
                {loading ? (
                    <div className="text-center text-gray-600">Cargando categorías...</div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {categoryData.slice(0, 4).map(({ name, image }) => (
                            <a key={name} href={`/productos?categoria=${name}`} className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all">
                                <div className="aspect-square overflow-hidden">
                                    <img alt={name} className="object-cover w-full h-full transition-transform group-hover:scale-105" src={`/images/Categories/${image}`} loading="lazy" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4 text-white">
                                    <h3 className="font-bold text-xl">{name}</h3>
                                    <p className="font-semibold text-sm text-white/80">{categories[name] || 0} productos</p>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
                <a href="/categorias"
                    className="w-full md:w-auto mt-6 flex items-center justify-center gap-2 bg-blue-700 shadow-lg text-white hover:shadow-xl font-semibold px-4 py-3 rounded-lg cursor-pointer group text-nowrap transition-all duration-300">
                    <span>Ver todas las categorías</span>
                    <i className="ri-arrow-right-line text-xl transition-transform duration-300 ease-in-out group-hover:scale-110"></i>
                </a>
            </div>
        </section>
    );
}
