import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";

export default function CardProduct({ product }) {
    if (!product) return null;

    const { id, image, name, description, price, category, isNew } = product;
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <a href={`/producto/${id}`} className="group bg-white rounded-lg border border-gray-200 overflow-hidden transition-all hover:shadow-md">
            {/* Imagen del producto */}
            <div className="relative">
                <div className="aspect-square overflow-hidden">
                    <img
                        src={image || "/placeholder.svg"}
                        alt={name}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                </div>

                {/* Botón de favorito */}
                <button
                    className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full p-1 shadow transition cursor-pointer"
                    onClick={() => setIsFavorite(!isFavorite)}
                    aria-label="Marcar como favorito"
                    title="Marcar como favorito"
                >
                    <Heart className={`h-5 w-5 transition-colors ${isFavorite ? "fill-blue-500 text-blue-500" : "text-gray-600"}`} />
                </button>

                {/* Etiqueta de "Nuevo" */}
                {isNew && (
                    <span className="absolute top-2 left-2 bg-blue-500 text-white font-semibold px-2 py-1 text-xs rounded-full shadow-md">
                        Nuevo
                    </span>
                )}
            </div>

            {/* Contenido del producto */}
            <div className="px-4 pt-4 pb-2 text-left">
                <div className="text-xs font-semibold text-gray-500 mb-1">{category || "General"}</div>
                <h3 className="font-semibold text-black mb-1 line-clamp-1">{name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{description}</p>

                {/* Precio y botón de compra */}
                <div className="mt-3">
                    <span className="font-bold text-base text-gray-900">${price.toFixed(2)}</span>
                </div>
                {/* 
                <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all mt-2">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Añadir</span>
                </button> */}
            </div>
        </a>
    );
}
