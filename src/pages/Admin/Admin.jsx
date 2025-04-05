import { motion } from "framer-motion";
import Aside from "../../modules/Admin/Aside";
import DashboardCard from "../../modules/Admin/components/DashboardCard";
import { CirclePlus } from "lucide-react";

export default function Admin() {
    return (
        <Aside>
            <div className="flex flex-col gap-4 pt-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0">
                    <div>
                        <h1 className="text-4xl font-black text-left">Panel de Administración</h1>
                        <p className="text-zinc-400 font-medium text-left">Gestiona todos tus productos desde un solo lugar.</p>
                    </div>

                    <motion.a
                        href="/admin/products/add"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-black flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-zinc-200 transition-all"
                        onClick={() => console.log("Añadir producto")}
                    >
                        <CirclePlus className="w-4 h-4" />
                        <span>Añadir Producto</span>
                    </motion.a>
                </div>

                <DashboardCard title="Productos" href={"/admin/products"} />
            </div>
        </Aside>
    );
}
