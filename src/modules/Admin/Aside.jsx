import { motion } from "framer-motion";
import { Menu, Logs, User, Tag, List, Home, LayoutDashboard, Package, CirclePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import LinkItems from "./components/LinkItems";
import { useLocation } from "react-router-dom";

export default function Aside({ children }) {
    const [isOpen, setIsOpen] = useState(false);

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
            <div className="bg-zinc-900 flex h-screen overflow-hidden text-white select-none">
                <motion.div
                    initial={{ width: "55px" }}
                    animate={{ width: isOpen ? "230px" : "55px" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="hidden md:block bg-zinc-950 border-r border-zinc-700 h-screen overflow-hidden"
                >
                    <div className="flex flex-col h-screen">
                        <div className="h-14 flex items-center p-3">
                            <div className="flex items-center space-x-2">
                                <motion.img
                                    src="/BagIcon2.webp"
                                    alt="Logo"
                                    className="h-7 w-7"
                                    loading="lazy"
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                />
                                <motion.a
                                    href="/admin"
                                    className="text-lg font-black whitespace-nowrap overflow-hidden"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isOpen ? 1 : 0 }}
                                    transition={{ duration: 0.3, delay: isOpen ? 0.3 : 0 }}
                                >
                                    Ofertas Marly
                                </motion.a>
                            </div>
                        </div>
                        <div className={`space-y-2 py-2 ${isOpen ? "m-1" : "my-1 mx-2"}`}>
                            <LinkItems title="Inicio" isOpen={isOpen} icon={"LayoutDashboard"} href="/admin" />
                            <LinkItems title="Productos" isOpen={isOpen} icon={"Package"} href="/admin/products" />
                            <LinkItems title="Añadir Productos" isOpen={isOpen} icon={"CirclePlus"} href="/admin/products/add" />
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="flex flex-col flex-1 bg-zinc-900 h-screen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="bg-zinc-950 h-15 hidden md:flex items-center gap-5 border-b border-zinc-700 px-2">
                        <button
                            className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {isOpen ? <Logs className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </motion.div>
                        </button>
                    </div>
                    <div className="px-4 h-full">
                        {children}
                    </div>
                </motion.div>
            </div>


            <nav className="fixed bottom-0 left-0 w-full bg-zinc-800 shadow-lg md:hidden flex justify-between px-4 py-2 z-50 h-18">
                <a
                    href="/admin"
                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-200 ${location.pathname === "/admin"
                        ? "bg-zinc-700 text-blue-400"
                        : "text-zinc-300 hover:text-blue-400 hover:bg-zinc-800"
                        }`}
                >
                    <LayoutDashboard className="h-6 w-6" />
                    <span className="text-xs font-medium">Inicio</span>
                </a>

                <a
                    href="/admin/products"
                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-200 ${location.pathname === "/admin/products"
                        ? "bg-zinc-700 text-blue-400"
                        : "text-zinc-300 hover:text-blue-400 hover:bg-zinc-800"
                        }`}
                >
                    <Package className="h-6 w-6" />
                    <span className="text-xs font-medium">Productos</span>
                </a>

                <a
                    href="/admin/products/add"
                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all duration-200 ${location.pathname === "/admin/products/add" || location.pathname === "/producto/"
                        ? "bg-zinc-700 text-blue-400"
                        : "text-zinc-300 hover:text-blue-400 hover:bg-zinc-800"
                        }`}
                >
                    <CirclePlus className="h-6 w-6" />
                    <span className="text-xs font-medium">Añadir</span>
                </a>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex flex-col items-center gap-1 px-3 py-2 rounded-2xl text-zinc-300 hover:text-blue-400 hover:bg-zinc-800 transition-all duration-200"
                    >
                        <User className="h-5 w-5" />
                        <span className="text-xs font-medium">Cuenta</span>
                    </button>

                    {isDropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-18 right-0 w-52 bg-zinc-800 text-zinc-100 shadow-xl rounded-lg border border-zinc-700"
                        >
                            <p className="px-4 py-2 text-sm font-semibold border-b border-zinc-700">Marly Damaris</p>
                            {/*                             <a href="/settings" className="block px-4 py-2 text-sm hover:bg-zinc-700 rounded transition">Configuración</a>
                            <a href="/pedidos" className="block px-4 py-2 text-sm hover:bg-zinc-700 rounded transition">Mis Pedidos</a>
                            <a href="/favoritos" className="block px-4 py-2 text-sm hover:bg-zinc-700 rounded transition">Favoritos</a> */}
                            <a href="/" className="inline-block bg-zinc-700 hover:bg-red-500 hover:text-white text-red-400 w-full text-left px-4 py-2 text-sm rounded-b-lg transition">
                                Cerrar Sesión
                            </a>
                        </motion.div>
                    )}
                </div>
            </nav>

        </>
    );
}
