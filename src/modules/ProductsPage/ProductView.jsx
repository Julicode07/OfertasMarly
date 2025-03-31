import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

export default function ProductView() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(import.meta.env.VITE_BACKEND_API_URL + "/products");
                if (!response.ok) throw new Error("Error al obtener productos");

                const data = await response.json();
                setProducts(data.products || []);
                console.log("Productos obtenidos:", products);

            } catch (err) {
                console.error("Error al obtener productos:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        console.log("Producto encontrado:", products.find((p) => p.id === Number(id)));
    }, [products, id]);

    if (loading) {
        return <div className="flex items-center justify-center h-screen text-gray-600 text-lg">Cargando...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center h-screen text-red-600 text-lg">{error}</div>;
    }

    const product = products.find((p) => p.id === Number(id));

    if (!product) {
        return <div className="flex items-center justify-center h-screen text-gray-600 text-lg">Producto no encontrado</div>;
    }

    const { image, name, description, price, category, isNew } = product;
    const formattedPrice = price ? price.toFixed(3) + " COP" : "Precio no disponible";

    const phoneNumber = "573028167960";
    const productUrl = window.location.href;

    const message = `👋 Hola Marly, estoy interesado en este producto:
📌 *Nombre:* ${name}
📖 *Descripción:* ${description}
💰 *Precio:* ${formattedPrice}
🏷️ *Categoría:* ${category || "General"}
🔗 *Enlace del producto:* ${productUrl}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    return (
        <main className="bg-white max-w-full max-h-full h-[calc(100vh-206px)] sm:h-[100vh] flex flex-col">
            <Navbar />
            <div className="flex-1 overflow-auto max-w-full mx-auto px-4 pt-4 md:p-8 rounded-lg md:flex md:items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative flex justify-center">
                        <img
                            src={import.meta.env.VITE_BACKEND_URL + image || "/placeholder.svg"}
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

                    <div className="flex flex-col justify-between mb-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{name}</h1>
                            <p className="text-gray-600 text-base md:text-lg leading-relaxed">{description}</p>
                            <span className="text-gray-500 text-sm uppercase font-semibold block mt-3">
                                {category || "General"}
                            </span>

                            <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-md">
                                <strong>📢 Ten en cuenta:</strong>
                                <ul className="list-disc list-inside mt-2">
                                    <li>📦 Los tiempos de entrega pueden variar según la disponibilidad del producto.</li>
                                    <li>⏳ Te avisaré cuando tu pedido esté listo.</li>
                                    <li>💰 El pago se realiza al momento de la entrega.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="hidden sm:flex mt-6 flex-col md:flex-row items-start sm:items-center md:justify-between gap-4">
                            <span className="text-3xl font-bold text-gray-900">{formattedPrice}</span>
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
            <div className="sm:hidden fixed bottom-18 left-0 w-full bg-slate-100 shadow-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <span className="text-3xl font-bold text-gray-900">{formattedPrice}</span>
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
        </main>
    );
}
