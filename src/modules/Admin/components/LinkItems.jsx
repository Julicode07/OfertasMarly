import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react"; // Importa todos los íconos dinámicamente
import { useLocation } from "react-router-dom";

export default function LinkItems({ title, isOpen, icon, href }) {
    const location = useLocation();
    const IconComponent = LucideIcons[icon] || LucideIcons.Menu;

    return (
        <motion.a
            href={href}
            className={`flex items-center px-2 py-1 text-base font-medium rounded-lg text-white hover:bg-zinc-800 hover:text-white ${location.pathname === href ? "bg-zinc-800 text-white" : ""}`}
        >
            <div className="flex items-center space-x-2" title={title}>
                {/* Contenedor para el ícono */}
                <motion.div
                    className="flex justify-center items-center pl-0.5 w-5 h-5"
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <IconComponent className="w-5 h-5" />
                </motion.div>

                {/* Texto con animación de opacidad */}
                <motion.span
                    className="text-base font-bold whitespace-nowrap overflow-hidden"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? "auto" : 0 }}
                    transition={{ duration: 0.3, delay: isOpen ? 0.3 : 0 }}
                >
                    {title}
                </motion.span>
            </div>
        </motion.a>
    );
}