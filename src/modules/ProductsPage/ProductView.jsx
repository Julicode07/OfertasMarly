import React from "react";
import { useParams } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { products } from "../../components/Products/utils/products";

export default function ProductView() {
    const { id } = useParams();
    const product = products.find((p) => p.id === Number(id));

    if (!product) {
        return <div className="text-center text-gray-600 mt-10">Producto no encontrado</div>;
    }

    const { image, name, description, price, category, isNew } = product;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 bg-white rounded-lg shadow-lg mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Imagen del producto */}
                <div className="relative">
                    <img
                        src={image || "/placeholder.svg"}
                        alt={name}
                        className="w-full h-auto rounded-lg object-cover"
                    />
                    {isNew && (
                        <span className="absolute top-2 left-2 bg-blue-500 text-white font-semibold px-3 py-1 text-sm rounded-full shadow-md">
                            Nuevo
                        </span>
                    )}
                </div>

                {/* Información del producto */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{name}</h1>
                        <p className="text-gray-600 text-lg mb-4">{description}</p>
                        <span className="text-gray-500 text-sm uppercase font-semibold">{category || "General"}</span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900">${price.toFixed(2)}</span>
                        <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all">
                            <ShoppingCart className="h-5 w-5" />
                            <span>Añadir al carrito</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
