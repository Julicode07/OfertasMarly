import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";

export default function CardProduct({ product }) {
    if (!product) return null;

    const { image, name, description, price, isNew } = product;
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-shadow hover:shadow-lg duration-300">
            <div className="relative px-5 pt-12">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-72 sm:h-72 object-cover rounded-3xl transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                />
                {/* Contenedor de etiquetas */}
                <div className="absolute top-4 left-2 right-2 flex justify-between items-center px-2">
                    {isNew && (
                        <span className="bg-blue-600 text-white font-semibold px-3 py-1 text-xs rounded-full shadow-md">
                            Nuevo
                        </span>
                    )}
                    <button
                        onClick={() => setIsFavorite(!isFavorite)}
                        className="absolute top-0 right-2 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full p-1 shadow transition cursor-pointer"
                        aria-label="Marcar como favorito"
                        title="Marcar como favorito"
                    >
                        <Heart className={`w-5 h-5 transition-colors ${isFavorite ? "text-blue-500 fill-blue-600" : "text-gray-400"}`} />
                    </button>
                </div>
            </div>
            <div className="px-5 py-3 text-left">
                <span className="text-sm text-gray-600">Electrónica</span>
                <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{description}</p>
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-lg text-gray-900">${price.toFixed(2)}</span>
                    </div>

                    <button className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-1 px-3 rounded-lg cursor-pointer">
                        <ShoppingCart className="w-5 h-5" />
                        <span>Añadir</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
