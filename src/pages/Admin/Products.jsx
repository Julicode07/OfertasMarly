import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Aside from "../../modules/Admin/Aside";
import { CirclePlus } from "lucide-react";
import CardProduct from "../../modules/Admin/components/CardProduct";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState(12);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const loaderRef = useRef(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/products`);
                if (!response.ok) throw new Error("Error al obtener productos");

                const data = await response.json();
                setProducts(data.products || []);
            } catch (err) {
                console.error("Error al obtener productos:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setVisibleProducts((prev) => Math.min(prev + 12, products.length));
        }
    }, [products.length]);

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, { threshold: 1 });
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [handleObserver]);

    return (
        <Aside>
            <div className="flex flex-col mr-6 pb-5">
                <h1 className="text-3xl font-black">Productos</h1>
                <div className="flex items-center justify-between gap-2">
                    <div className="pt-0.5">
                        {error ? (
                            <p className="text-red-500">Error: {error}</p>
                        ) : (
                            <p className="text-zinc-400">
                                Total de productos:{" "}
                                {loading ? (
                                    <span className="h-4 w-6 bg-gray-300 animate-pulse inline-block rounded"></span>
                                ) : (
                                    products.length
                                )}
                            </p>
                        )}
                    </div>
                    <motion.a
                        href="/admin/product/add"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-black flex items-center gap-2 px-2 py-1 md:px-4 rounded-lg font-semibold shadow-md hover:bg-zinc-200 transition-all"
                    >
                        <CirclePlus className="w-4 h-4" />
                        <span className="text-sm md:text-base">Añadir Producto</span>
                    </motion.a>
                </div>
            </div>

            <section
                className="flex-1 overflow-y-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pr-4"
                style={{ maxHeight: "calc(100vh - 160px)" }}
            >
                {loading
                    ? [...Array(12)].map((_, index) => (
                        <div key={index} className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 animate-pulse">
                            {/* Imagen Skeleton */}
                            <div className="bg-gray-700 h-40 w-full rounded-md"></div>

                            {/* Texto Skeleton */}
                            <div className="mt-2 h-5 bg-gray-600 rounded w-3/4"></div>
                            <div className="mt-2 h-4 bg-gray-700 rounded w-full"></div>
                            <div className="mt-2 h-4 bg-gray-700 rounded w-1/2"></div>

                            {/* Botones Skeleton */}
                            <div className="flex gap-2 mt-2">
                                <div className="h-8 bg-gray-600 rounded w-full"></div>
                                <div className="h-8 bg-gray-600 rounded w-10"></div>
                            </div>
                        </div>
                    ))
                    : products.slice(0, visibleProducts).map((product) => (
                        <CardProduct key={product.id} product={product} />
                    ))}

                {/* Loader de carga infinita */}
                {visibleProducts < products.length && !loading && (
                    <div ref={loaderRef} className="col-span-full flex justify-center py-4">
                        <span className="h-6 w-6 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin"></span>
                    </div>
                )}
            </section>

        </Aside>
    );
}
