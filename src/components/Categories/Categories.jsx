import React from "react";
import { products } from "../Products/utils/products";

export default function Categories() {
    const categories = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = 0;
        }
        acc[product.category]++;
        return acc;
    }, {});

    const categoryData = [
        { name: "Cocina", image: "cocina.png" },
        { name: "Oficina", image: "oficina.png" },
        { name: "Iluminación", image: "iluminación.png" },
        { name: "Belleza", image: "belleza.png" }
    ];

    return (
        <section id="categorias" className="py-8 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Explora por Categorías</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {categoryData.map(({ name, image }) => (
                        <a key={name} href={`/productos?categoria=${name}`} className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all">
                            <div className="aspect-square overflow-hidden">
                                <img alt={name} className="object-cover w-full h-full transition-transform group-hover:scale-105" src={`/images/Categories/${image}?height=200&width=200`} loading="lazy" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-4 text-white">
                                <h3 className="font-bold text-xl">{name}</h3>
                                <p className="font-semibold text-sm text-white/80">{categories[name] || 0} productos</p>
                            </div>
                        </a>
                    ))}
                </div>
                <a href="/categorias"
                    className="w-full md:w-auto mt-6 flex items-center justify-center gap-2 bg-blue-700 shadow-lg text-white hover:shadow-xl font-semibold px-4 py-3 rounded-lg cursor-pointer group text-nowrap transition-all duration-300">
                    <span>Ver todas las categorias</span>
                    <i className="ri-arrow-right-line text-xl transition-transform duration-300 ease-in-out group-hover:scale-110"></i>
                </a>
            </div>
        </section>
    );
}
