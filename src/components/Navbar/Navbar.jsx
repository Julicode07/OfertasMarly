import React, { useState, useRef, useEffect } from "react";
import { ShoppingCart, Home, Tag, List, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Link } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import LogoutButton from "../../modules/Auth/LogoutButton";

export default function Navbar() {
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState(null); // <-- Autenticación real
    const dropdownRef = useRef(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_AUTH_BACKEND_URL}/api/auth/check-auth`, {
                    method: "GET",
                    credentials: "include",
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error("Error verificando autenticación:", err);
                setUser(null);
            }
        };

        checkAuth();
    }, []);

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
            {/* HEADER DESKTOP */}
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

                    <nav className="hidden md:flex items-center space-x-6 text-base font-bold pr-6">
                        <Link href="/" className={location.pathname === "/" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}>Inicio</Link>
                        <Link href="/categorias" className={location.pathname.startsWith("/categorias") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}>Categorías</Link>
                        <Link href="/productos" className={location.pathname.startsWith("/productos") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"}>Productos</Link>
                    </nav>

                    <div className="flex items-center justify-end gap-8 pr-3">
                        {user ? (
                            <div className="relative hidden md:flex items-center" ref={dropdownRef}>
                                <button onClick={() => setIsDropdownOpen(prev => !prev)} className="flex items-center gap-2 cursor-pointer">
                                    <i className="ri-user-3-line text-base"></i>
                                    <span className="text-sm text-gray-800 hover:text-blue-600 font-bold">
                                        {user.name}
                                    </span>
                                </button>
                                <AnimatePresence>
                                    {isDropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-10 right-0 w-52 bg-white shadow-lg rounded-lg border border-gray-200"
                                        >
                                            <div className="px-4 py-2 text-sm text-gray-600 border-b">
                                                {user.name}
                                            </div>
                                            <a href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Administrador
                                            </a>
                                            <LogoutButton
                                                onLogout={() => {
                                                    setUser(null);
                                                    setIsDropdownOpen(false);
                                                }}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link href="/auth" className="relative hidden md:flex items-center justify-center gap-2">
                                <i className="ri-user-3-line text-base"></i>
                                <span className="text-sm text-gray-800 hover:text-blue-600 font-bold">Cuenta</span>
                            </Link>
                        )}

                        <button className="px-2 py-2 rounded-xl relative outline-none border-none cursor-pointer bg-slate-200 hover:bg-blue-200">
                            <ShoppingCart className="h-5 w-5 text-gray-700" />
                            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                3
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* BOTTOM NAVBAR MOBILE */}
            <nav className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t border-gray-300 md:hidden flex justify-between px-4 py-2 z-50 h-18">
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

                <div className="relative" ref={dropdownRef}>
                    {user ? (
                        <>
                            <button onClick={() => setIsDropdownOpen(prev => !prev)} className="flex flex-col items-center gap-1 px-3 py-2 rounded-2xl text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none transition-all duration-200">
                                <User className="h-6 w-6" />
                                <span className="text-xs font-medium">{user.name}</span>
                            </button>
                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute bottom-14 right-0 w-52 bg-white shadow-lg rounded-lg border border-gray-200"
                                    >
                                        <div className="px-4 py-2 text-sm text-gray-600 border-b">
                                            {user.name}
                                        </div>
                                        <a href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            Administrador
                                        </a>
                                        <LogoutButton
                                            onLogout={() => {
                                                setUser(null);
                                                setIsDropdownOpen(false);
                                            }}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </>
                    ) : (
                        <a href="/auth" className="flex flex-col items-center gap-1 px-3 py-2 rounded-2xl text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none transition-all duration-200">
                            <User className="h-6 w-6" />
                            <span className="text-xs font-medium">Cuenta</span>
                        </a>
                    )}
                </div>
            </nav>
        </>
    );
}
