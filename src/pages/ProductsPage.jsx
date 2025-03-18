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
        <main className="pb-18 md:pb-0 h-screen flex flex-col overflow-hidden">
            <Navbar />
            <div className=" flex flex-1 md:flex-row max-h-[calc(100vh-65px)]">
                {sidebarOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 md:hidden"
                        onClick={() => setSidebarOpen(false)}></div>
                )}

                <aside
                    ref={sidebarRef}
                    className={`absolute md:relative top-10 md:top-0 left-0 px-3 md:pl-3 md:w-60 2xl:w-72 bg-white shadow-md md:shadow-none 
    transition-transform duration-300 ease-in-out md:translate-x-0 
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    z-30 md:h-auto p-4 md:p-0 flex flex-col h-full 
    md:max-h-[95vh] md:overflow-y-auto`}
                    style={{ willChange: "transform" }}
                >
                    <h2 className="text-2xl font-extrabold mb-0 sticky top-0 bg-white p-4 z-10">
                        Filtrar productos
                    </h2>

                    <div className="mb-4">
                        <h3 className="font-bold mb-2 sticky top-14 bg-white p-2 z-10">
                            Categoría
                        </h3>
                        <ul className="space-y-2 overflow-y-auto max-h-[40vh] md:max-h-[45vh] pr-2">
                            <li>
                                <button onClick={() => handleCategorySelect("todos")}
                                    className={`block w-full text-left px-4 py-2 rounded-xl cursor-pointer ${selectedCategory === "todos" ? "bg-blue-600 text-white font-bold" : "hover:bg-gray-200"}`}>
                                    Todos los productos
                                </button>
                            </li>
                            {uniqueCategories.map(cat => (
                                <li key={cat}>
                                    <button onClick={() => handleCategorySelect(cat)}
                                        className={`block w-full text-left px-4 py-2 rounded-xl cursor-pointer ${selectedCategory === cat ? "bg-blue-600 text-white font-bold" : "hover:bg-gray-200"}`}>
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-semibold mb-2 sticky top-[30vh] bg-white p-2 z-10">
                            Estado
                        </h3>
                        <div className="space-y-2">
                            <button onClick={() => handleConditionSelect("todos")}
                                className={`block w-full text-left px-4 py-2 rounded-xl cursor-pointer ${condition === "todos" ? "bg-blue-600 text-white font-bold" : "hover:bg-gray-200"}`}>
                                Todos
                            </button>
                            <button onClick={() => handleConditionSelect("true")}
                                className={`block w-full text-left px-4 py-2 rounded-xl cursor-pointer ${condition === "true" ? "bg-blue-600 text-white font-bold" : "hover:bg-gray-200"}`}>
                                Nuevos
                            </button>
                        </div>
                    </div>
                </aside>

                <div className="flex-1 w-full px-4 pb-16 sm:pb-4 md:pr-3 md:pl-0 md:ml-8 overflow-auto max-h-[90vh]">

                    <div className="sticky top-0 bg-white py-3 z-10 flex justify-between items-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            {selectedCategory === "todos" ? "Todos los Productos" : `Productos en ${selectedCategory}`}
                        </h1>
                        <button onClick={toggleSidebar} className="md:hidden px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-gray-400 text-nowrap">
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
