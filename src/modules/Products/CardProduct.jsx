import React from "react";
export default function CardProduct({ product }) {
    if (!product) return null;

    const { id, image, name, description, price, category, isNew, availability } = product;

    return (
        <a href={`/producto/${id}`} className="group bg-white rounded-lg border border-gray-200 overflow-hidden transition-all hover:shadow-md">
            <div className="relative">
                <div className="aspect-square overflow-hidden">
                    <img
                        src={image || "/placeholder.svg"}
                        alt={name}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                </div>

                {availability === 0 ? (
                    <span className="absolute top-2 right-2 bg-red-600 text-white font-semibold px-2 py-1 text-xs rounded-full shadow-md">
                        Agotado
                    </span>
                ) :
                    isNew && (
                        <span className="absolute top-2 left-2 bg-blue-600 text-white font-semibold px-2 py-1 text-xs rounded-full shadow-md">
                            Nuevo
                        </span>
                    )
                }
            </div>

            <div className="px-4 pt-4 pb-2 text-left">
                <div className="text-xs font-semibold text-gray-500 mb-1">{category || "General"}</div>
                <h3 className="font-semibold text-black mb-1 line-clamp-1">{name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{description}</p>

                <div className="mt-3">
                    <span className="font-bold text-base text-gray-900">${price.toFixed(3)}</span>
                </div>
            </div>
        </a>
    );
}
