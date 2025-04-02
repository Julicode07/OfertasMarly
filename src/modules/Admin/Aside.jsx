import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";

export default function Aside() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ width: "0px" }}
            animate={{ width: isOpen ? "256px" : "" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="hidden md:block bg-zinc-950 border-r border-zinc-700 h-screen overflow-hidden"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-screen"
            >
                <motion.div
                    className="h-15 flex items-center justify-between p-3 border-b border-zinc-700"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <div className="flex items-center space-x-2">
                        <motion.img
                            src="/BagIcon2.webp"
                            alt="Logo"
                            className="h-7 w-7"
                            loading="lazy"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                        <motion.a
                            href="/admin"
                            className={`text-xl font-black ${isOpen ? "block" : "hidden"}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isOpen ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            Ofertas Marly
                        </motion.a>
                    </div>
                    <button
                        className="bg-zinc-800 p-1 rounded-lg cursor-pointer"
                    >
                        <motion.div
                            initial={{ rotate: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {isOpen ? (
                                <ChevronLeft className="w-5 h-5" onClick={() => setIsOpen(false)} />
                            ) : (
                                <ChevronRight className="w-5 h-5" onClick={() => setIsOpen(true)} />
                            )}
                        </motion.div>
                    </button>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}