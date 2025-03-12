import React, { useEffect, useRef, useState } from "react";
import { products } from "../components/Products/utils/products";
import Navbar from "../components/Navbar/Navbar";
import CardProduct from "../components/Products/CardProduct";

export default function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState("todos");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    const uniqueCategories = [...new Set(products.map(product => product.category))];

    const filteredProducts = selectedCategory === "todos"
        ? products
        : products.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase());

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    };

    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
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

    return (
        <main className="pb-18 md:pb-0">
            <Navbar />
            <div className="sm:p-5 flex flex-col md:flex-row">
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}

                <aside
                    ref={sidebarRef}
                    className={`fixed md:static md:w-72 md:block bg-white shadow-md md:shadow-none transition-transform md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} z-20 h-screen md:h-auto p-4`}
                >
                    <h2 className="text-2xl font-semibold mb-4">Filtrar por categoría</h2>
                    <ul className="space-y-2">
                        <li>
                            <button
                                onClick={() => handleCategorySelect("todos")}
                                className={`block w-full text-left p-2 rounded-xl cursor-pointer ${selectedCategory === "todos" ? "bg-blue-600 text-white font-bold" : "hover:bg-gray-200"}`}
                            >
                                Todos los productos
                            </button>
                        </li>
                        {uniqueCategories.map(cat => (
                            <li key={cat}>
                                <button
                                    onClick={() => handleCategorySelect(cat)}
                                    className={`block w-full text-left p-2 rounded-xl cursor-pointer ${selectedCategory === cat ? "bg-blue-600 text-white font-bold" : "hover:bg-gray-200"}`}
                                >
                                    {cat}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                <div className="p-5 flex-1 md:ml-8">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            {selectedCategory === "todos" ? "Todos los Productos" : `Productos en ${selectedCategory}`}
                        </h1>
                        <button
                            onClick={toggleSidebar}
                            className="md:hidden p-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-nowrap"
                        >
                            ☰ Filtrar
                        </button>
                    </div>
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 md:gap-8 lg:grid-cols-5 lg:gap-12">
                            {filteredProducts.map((product) => (
                                <CardProduct key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No hay productos en esta categoría.</p>
                    )}
                </div>
            </div>
        </main>
    );
}
