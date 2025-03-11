import React from "react";
import CardProduct from "./CardProduct";
import { products } from "./utils/products";
export default function ProductSection() {
    return (
        <section id="productos" className="py-16 bg-gray-100">
            <div className="container mx-auto px-6 text-center">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Productos Destacados</h3>
                    <a href="/productos"
                        className="w-full md:w-auto flex items-center justify-center gap-2 bg-white text-blue-700 hover:shadow-xl font-semibold px-4 py-3 rounded-lg cursor-pointer group text-nowrap transition-all duration-300">
                        <span>Ver todos</span>
                        <i className="ri-arrow-right-line text-xl transition-transform duration-300 ease-in-out group-hover:scale-110"></i>
                    </a>
                </div>


                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.slice(0, 8).map(product => (
                        <CardProduct key={product.id} product={product} />
                    ))}

                </div>
            </div>
        </section>
    )
}