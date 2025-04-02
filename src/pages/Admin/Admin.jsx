import { motion } from "framer-motion";
import Aside from "../../modules/Admin/Aside";

export default function Admin() {

    return (
        <div className="bg-zinc-900 flex h-screen overflow-hidden text-white">
            {/* ASIDE */}
            <Aside />

            {/* MAIN CONTENT */}
            <motion.div
                className="flex flex-col flex-1 bg-zinc-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="h-15 flex items-center border-b border-zinc-700 px-4">
                    Search
                </div>
            </motion.div>
        </div>
    );
}