import { Package } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DashboardCard({ title, href }) {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/products`);
                if (!response.ok) throw new Error("Error al obtener productos");

                const data = await response.json();
                setProducts(data.products.length);
            } catch (err) {
                console.error("Error al obtener productos:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <motion.a
            href={href}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="w-full md:w-1/3 cursor-pointer"
        >
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border border-zinc-800 rounded-lg shadow-md p-6 flex flex-col gap-3 bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 ease-in-out"
            >
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold">{title}</h2>
                    <Package className="w-4 h-4 text-zinc-400" />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-2xl font-bold">
                        {loading ? (
                            <motion.span
                                className="block h-6 w-16 bg-zinc-700 rounded-md"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                            />
                        ) : error ? (
                            "Error"
                        ) : (
                            <span>Total de productos: {products}</span>
                        )}
                    </p>
                    <p className="text-zinc-400 text-sm font-medium">Gestiona tu catálogo de productos</p>
                </div>
            </motion.div>
        </motion.a>
    );
}
