import { motion } from "framer-motion";
import Aside from "../../modules/Admin/Aside";

export default function Admin() {

    return (
        <Aside>
            <h1 className="text-4xl font-black">Panel de Administración</h1>
            <p className="text-zinc-400 font-medium">Gestiona todos tus productos desde un solo lugar.</p>
        </Aside>
    );
}