import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
            <div className="flex flex-col py-4">
                <h1 className="text-4xl font-black">Productos</h1>
                <div className="flex items-center justify-between gap-2">
                    <div className="pt-0.5">
                        {error ? (
                            <p className="text-red-500">Error: {error}</p>
                        ) : (
                            <p className="text-zinc-400 flex items-center gap-1">
                                <span>Total de productos:</span>
                                {loading ? (
                                    <motion.span
                                        className="h-4 w-6 bg-gray-300 animate-pulse inline-block rounded"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                    />
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
                className="flex-1 overflow-y-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-3 md:pb-2 scrollbar-product-hide"
                style={{ maxHeight: "calc(100vh - 160px)" }}
            >
                <AnimatePresence mode="sync">
                    {loading
                        ? [...Array(18)].map((_, index) => (
                            <motion.div
                                key={index}
                                className="bg-zinc-800 border border-zinc-700 rounded-lg"
                                initial={{ opacity: 1 }}
                                animate={{ opacity: 0 }}
                                exit={{ opacity: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <div className="bg-zinc-700 h-40 w-full rounded-t-md"></div>
                                <div className="p-3">
                                    <div className="mt-2 h-5 bg-zinc-600 rounded w-3/4"></div>
                                    <div className="mt-2 h-[50px] bg-zinc-700 rounded w-full"></div>
                                    <div className="mt-2 h-4 bg-zinc-700 rounded w-1/4"></div>
                                    <div className="flex gap-2 mt-2">
                                        <div className="h-9 bg-zinc-600 rounded w-full"></div>
                                        <div className="h-9 bg-zinc-600 rounded w-10"></div>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                        : products.slice(0, visibleProducts).map((product) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <CardProduct product={product} />
                            </motion.div>
                        ))}

                </AnimatePresence>

                {visibleProducts < products.length && !loading && (
                    <div ref={loaderRef} className="col-span-full flex justify-center py-4">
                        <motion.span
                            className="h-6 w-6 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        />
                    </div>
                )}
            </section>

        </Aside>
    );
}
