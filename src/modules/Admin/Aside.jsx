import { motion } from "framer-motion";
import { Menu, Logs } from "lucide-react";
import { useState } from "react";
import LinkItems from "./components/LinkItems";

export default function Aside({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
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
    );
}
