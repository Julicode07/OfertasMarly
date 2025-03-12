import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../../components/Products/utils/products";
import Navbar from "../../components/Navbar/Navbar";

export default function ProductView() {
    const { id } = useParams();
    const product = products.find((p) => p.id === Number(id));

    if (!product) {
        return (
            <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
                Producto no encontrado
            </div>
        );
    }

    const { image, name, description, price, category, isNew } = product;

    const phoneNumber = "573028543435";

    const productUrl = window.location.href;

    const message = `👋 Hola Marly, estoy interesado en este producto:
📌 *Nombre:* ${name}
📖 *Descripción:* ${description}
💰 *Precio:* $${price.toFixed(3)}
🏷️ *Categoría:* ${category || "General"}
🔗 *Enlace del producto:* ${productUrl}

¿Podrías darme más información?`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    return (
        <main className="bg-white h-screen w-screen">
            <Navbar />
            <div className="max-w-full h-[90vh] mx-auto px-4 pt-4 md:p-8 rounded-lg md:flex md:items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative flex justify-center">
                        <img
                            src={image || "/placeholder.svg"}
                            alt={name}
                            className="w-full max-h-[300px] md:max-h-[500px] rounded-lg object-contain"
                            loading="lazy"
                        />
                        {isNew && (
                            <span className="absolute top-2 left-2 bg-blue-500 text-white font-semibold px-3 py-1 text-sm rounded-full shadow-md">
                                Nuevo
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col justify-between">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{name}</h1>
                            <p className="text-gray-600 text-base md:text-lg leading-relaxed">{description}</p>
                            <span className="text-gray-500 text-sm uppercase font-semibold block mt-3">
                                {category || "General"}
                            </span>
                        </div>

                        <div className="mt-6 flex flex-col md:flex-row items-start sm:items-center md:justify-between gap-4">
                            <span className="text-3xl font-bold text-gray-900">${price.toFixed(3) + " COP"}</span>
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full md:w-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all text-lg"
                            >
                                <span>Comprar</span>
                                <i className="ri-shopping-bag-4-fill flex items-center justify-center w-6 h-6"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
