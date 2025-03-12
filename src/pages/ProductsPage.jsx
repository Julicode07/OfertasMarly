import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "../components/Products/utils/products";
import Navbar from "../components/Navbar/Navbar";
import CardProduct from "../components/Products/CardProduct";

export default function ProductsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialCategory = searchParams.get("categoria") || "todos";
    const initialCondition = searchParams.get("estado") || "todos";

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [condition, setCondition] = useState(initialCondition);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    const uniqueCategories = useMemo(() => [...new Set(products.map(product => product.category))], []);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const handleCategorySelect = useCallback((category) => {
        setSelectedCategory(category);
        setSearchParams({ categoria: category, estado: condition });
        closeSidebarIfMobile();
    }, [condition, setSearchParams]);

    const handleConditionSelect = useCallback((value) => {
        setCondition(value);
        setSearchParams({ categoria: selectedCategory, estado: value });
        closeSidebarIfMobile();
    }, [selectedCategory, setSearchParams]);

    const closeSidebarIfMobile = () => {
        if (window.innerWidth < 768) setSidebarOpen(false);
    };

    useEffect(() => {
        document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
        return () => { document.body.style.overflow = "auto"; };
    }, [sidebarOpen]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setSidebarOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Filtrado optimizado con `useMemo`
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesCategory = selectedCategory === "todos" || product.category.toLowerCase() === selectedCategory.toLowerCase();
            const matchesCondition = condition === "todos" || product.isNew.toString() === condition;
            return matchesCategory && matchesCondition;
        });
    }, [selectedCategory, condition]);

    return (
        <main className="pb-18 md:pb-0">
            <Navbar />
            <div className="sm:p-5 flex flex-col md:flex-row">
                {sidebarOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10 md:hidden"
                        onClick={() => setSidebarOpen(false)}></div>
                )}

                <aside ref={sidebarRef}
                    className={`fixed md:static md:w-60 2xl:w-72 md:block bg-white shadow-md md:shadow-none transition-transform md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} z-20 h-screen md:h-auto p-4 sm:p-0`}>
                    <h2 className="text-2xl font-semibold mb-4">Filtrar productos</h2>

                    {/* Filtro por categoría */}
                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">Categoría</h3>
                        <ul className="space-y-2">
                            <li>
                                <button onClick={() => handleCategorySelect("todos")}
                                    className={`block w-full text-left p-2 rounded-xl cursor-pointer ${selectedCategory === "todos" ? "bg-blue-600 text-white font-bold" : "hover:bg-gray-200"}`}>
                                    Todos los productos
                                </button>
                            </li>
                            {uniqueCategories.map(cat => (
                                <li key={cat}>
                                    <button onClick={() => handleCategorySelect(cat)}
                                        className={`block w-full text-left p-2 rounded-xl cursor-pointer ${selectedCategory === cat ? "bg-blue-600 text-white font-bold" : "hover:bg-gray-200"}`}>
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Filtro por estado */}
                    <div className="mb-4">
                        <h3 className="font-semibold mb-2">Estado</h3>
                        <div className="space-y-2">
                            <button onClick={() => handleConditionSelect("todos")}
                                className={`block w-full text-left p-2 rounded-xl cursor-pointer ${condition === "todos" ? "bg-blue-600 text-white font-bold" : "hover:bg-gray-200"}`}>
                                Todos
                            </button>
                            <button onClick={() => handleConditionSelect("true")}
                                className={`block w-full text-left p-2 rounded-xl cursor-pointer ${condition === "true" ? "bg-blue-600 text-white font-bold" : "hover:bg-gray-200"}`}>
                                Nuevos
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Contenido de Productos */}
                <div className="p-4 sm:p-0 flex-1 md:ml-8">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            {selectedCategory === "todos" ? "Todos los Productos" : `Productos en ${selectedCategory}`}
                        </h1>
                        <button onClick={toggleSidebar} className="md:hidden p-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-nowrap">
                            ☰ Filtrar
                        </button>
                    </div>
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-2 lg:grid-cols-5 lg:gap-4">
                            {filteredProducts.map((product) => (
                                <CardProduct key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No hay productos que coincidan con los filtros.</p>
                    )}
                </div>
            </div>
        </main>
    );
}
