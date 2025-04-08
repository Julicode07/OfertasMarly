import { motion } from "framer-motion";
import {
    Menu,
    Logs,
    LayoutDashboard,
    Package,
    CirclePlus,
    LogOutIcon,
} from "lucide-react";
import { useState } from "react";
import LinkItems from "./components/LinkItems";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutAuthButton from "./components/LogoutAuthButton";

export default function Aside({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_AUTH_BACKEND_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
            });

            if (res.ok) {
                navigate("/");
            } else {
                console.error("Error cerrando sesión");
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

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
                        <div className={`space-y-2 py-2 h-full ${isOpen ? "m-1" : "my-1 mx-2"}`}>
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    <LinkItems title="Inicio" isOpen={isOpen} icon={"LayoutDashboard"} href="/admin" />
                                    <LinkItems title="Productos" isOpen={isOpen} icon={"Package"} href="/admin/products" />
                                    <LinkItems title="Añadir Productos" isOpen={isOpen} icon={"CirclePlus"} href="/admin/products/add" />
                                </div>
                                <div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 w-full hover:bg-zinc-800 text-red-500 transition-all duration-200 rounded-lg px-2 py-1 cursor-pointer"
                                    >
                                        <LogOutIcon className="w-7 h-7" />
                                        {isOpen && <span className="text-sm font-medium">Cerrar Sesión</span>}
                                    </button>
                                </div>
                            </div>
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

            {/* MOBILE NAV */}
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

                <button
                    onClick={handleLogout}
                    className="flex flex-col items-center text-red-700 gap-1 px-3 py-2 rounded-2xl transition-all duration-200"
                >
                    <LogOutIcon className="h-6 w-6" />
                    <span className="text-xs font-medium">Cerrar</span>
                </button>
            </nav>
        </>
    );
}
