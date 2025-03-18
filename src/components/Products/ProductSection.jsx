import React from "react";
import CardProduct from "./CardProduct";
import { products } from "./utils/products";
export default function ProductSection() {
    return (
        <section id="productos" className="py-8 bg-gray-100">
            <div className="container mx-auto px-4 text-center">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Productos Destacados</h3>
                </div>


                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {products.slice(-10).map(product => (
                        <CardProduct key={product.id} product={product} />
                    ))}
                </div>

                <a href="/productos"
                    className="w-full md:w-auto mt-6 flex items-center justify-center gap-2 bg-blue-700 text-white hover:shadow-xl font-semibold px-4 py-3 rounded-lg cursor-pointer group text-nowrap transition-all duration-300">
                    <span>Ver todos los productos</span>
                    <i className="ri-arrow-right-line text-xl transition-transform duration-300 ease-in-out group-hover:scale-110"></i>
                </a>
            </div>
        </section>
    )
}