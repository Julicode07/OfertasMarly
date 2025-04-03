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
                {/* SIDEBAR */}
                <motion.div
                    initial={{ width: "55px" }}
                    animate={{ width: isOpen ? "230px" : "55px" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="hidden md:block bg-zinc-950 border-r border-zinc-700 h-screen overflow-hidden"
                >
                    <div className="flex flex-col h-screen">
                        {/* Header */}
                        <div className="h-15 flex items-center p-3 border-b border-zinc-700">
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
                    className="flex flex-col flex-1 bg-zinc-900"
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
                    {/* CONTENT */}
                    <div className="p-4">
                        {children}
                    </div>
                </motion.div>
            </div>
            <nav className="fixed bottom-0 left-0 w-full bg-zinc-900 shadow-lg border-t border-zinc-700 md:hidden flex justify-between py-2 z-50 h-16">
                {[
                    { href: "/", icon: <LayoutDashboard className="h-5 w-5" />, label: "Inicio" },
                    { href: "/categorias", icon: <Package className="h-5 w-5" />, label: "Categorías" },
                    { href: "/productos", icon: <CirclePlus className="h-5 w-5" />, label: "Productos" }
                ].map(({ href, icon, label }) => (
                    <a
                        key={href}
                        href={href}
                        className={`flex flex-col items-center justify-center gap-1 w-24 h-14 px-3 pt-1 pb-4 rounded-xl transition-all duration-200 ${location.pathname === href ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                            }`}
                    >
                        {icon}
                        <span className="text-xs font-medium leading-none">{label}</span>
                    </a>
                ))}

                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex flex-col items-center justify-center gap-1 w-24 h-14 px-3 pt-1 pb-4 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none transition-all duration-200"
                    >
                        <User className="h-5 w-5" />
                        <span className="text-xs font-medium leading-none">Cuenta</span>
                    </button>

                    {isDropdownOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-14 right-0 w-48 bg-zinc-800 shadow-lg rounded-lg border border-zinc-700"
                        >
                            <p className="p-4 text-zinc-300">Próximamente</p>
                        </motion.div>
                    )}
                </div>
            </nav>


        </>
    );
}
