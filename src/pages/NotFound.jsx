import Navbar from "../components/Navbar/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <main className="h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-grow items-center pb-10 justify-center w-screen">
                <div className="text-center">
                    <motion.h1
                        className="text-[10rem] md:text-[20rem] font-bold text-indigo-800 leading-none"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        404
                    </motion.h1>
                    <motion.p
                        className="text-black text-xl md:text-3xl font-bold  px-5 md:px-0 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        Lo sentimos, la página que buscas no existe.
                    </motion.p>
                    <motion.button
                        className="pl-3 pr-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate("/")}
                    >
                        <i className="ri-arrow-left-line"></i>   Volver al inicio
                    </motion.button>
                </div>
            </div>
        </main>
    );
}
