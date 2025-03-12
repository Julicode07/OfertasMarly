import React, { useState, useRef, useEffect } from "react";
import { ShoppingCart, Home, Tag, List, Phone, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Link } from "@heroui/react";
import { motion } from "framer-motion";

export default function Navbar() {
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <header className="sticky top-0 z-50 bg-white border-b-2 border-gray-200">
                <div className="mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4 pl-1">
                        <Link href="/" className="flex items-center">
                            <img src="/BagIcon2.webp" alt="Logo" className="h-8 w-8 mr-2 mb-1" loading="lazy" />
                            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 text-transparent bg-clip-text drop-shadow-lg transition-transform duration-200 hover:scale-105">
                                Ofertas Marly
                            </h1>
                        </Link>
                    </div>

                    <nav className="hidden md:flex items-center space-x-6 text-sm font-bold pr-6">
                        <Link href="/" className={location.pathname === "/" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}>
                            Inicio
                        </Link>
                        <Link href="/categorias" className={location.pathname.startsWith("/categorias") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}>
                            Categorías
                        </Link>
                        <Link href="/productos" className={location.pathname.startsWith("/productos") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}>
                            Productos
                        </Link>
                        <Link href="/ofertas" className={location.pathname === "/ofertas" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}>
                            Ofertas
                        </Link>
                        <Link href="/contacto" className={location.pathname === "/contacto" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}>
                            Contacto
                        </Link>
                    </nav>

                    <div className="flex items-center justify-end gap-8 pr-3">
                        <Link href="/cuenta" className="relative hidden md:flex items-center justify-center gap-2">
                            <i className="ri-user-3-line text-base"></i>
                            <span className="text-sm text-gray-800 hover:text-blue-600 font-bold">Cuenta</span>
                        </Link>
                        <button className="px-2 py-2 rounded-xl relative outline-none border-none cursor-pointer bg-slate-200 hover:bg-blue-200">
                            <ShoppingCart className="h-5 w-5 text-gray-700" />
                            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                3
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            <nav className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t border-gray-300 md:hidden flex justify-between px-4 py-2 z-50">
                <a href="/" className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-200 ${location.pathname === "/" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"}`}>
                    <Home className="h-6 w-6" />
                    <span className="text-xs font-medium">Inicio</span>
                </a>

                <a href="/categorias" className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-200 ${location.pathname === "/categorias" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"}`}>
                    <List className="h-6 w-6" />
                    <span className="text-xs font-medium">Categorías</span>
                </a>

                <a href="/productos" className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-200 ${location.pathname === "/productos" || location.pathname === "/producto/" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"}`}>
                    <Tag className="h-6 w-6" />
                    <span className="text-xs font-medium">Productos</span>
                </a>

                <a href="/contacto" className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-200 ${location.pathname === "/contacto" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:text-blue-600 hover:bg-gray-100"}`}>
                    <Phone className="h-6 w-6" />
                    <span className="text-xs font-medium">Contacto</span>
                </a>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex flex-col items-center gap-1 px-3 py-2 rounded-2xl text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none transition-all duration-200"
                    >
                        <User className="h-6 w-6" />
                        <span className="text-xs font-medium">Cuenta</span>
                    </button>

                    {isDropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-14 right-0 w-52 bg-white shadow-lg rounded-lg border border-gray-200"
                        >
                            <p className="px-4 py-2 text-sm text-gray-800 font-semibold border-b">Signed in as</p>
                            <p className="px-4 py-2 text-sm text-gray-600 border-b">zoey@example.com</p>
                            <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Configuración</a>
                            <a href="/pedidos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mis Pedidos</a>
                            <a href="/favoritos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Favoritos</a>
                            <button className="bg-red-100 rounded-b-lg block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                Cerrar Sesión
                            </button>
                        </motion.div>
                    )}
                </div>
            </nav>
        </>
    );
}
