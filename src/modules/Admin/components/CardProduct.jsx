import { Pencil, Trash2 } from "lucide-react";

export default function CardProduct({ product }) {
    if (!product) {
        return (
            <div className="bg-zinc-900 border border-zinc-700 text-white rounded-lg overflow-hidden shadow-lg animate-pulse">
                {/* Imagen del producto */}
                <div className="relative bg-gray-700 h-40 flex items-center justify-center">
                    <div className="w-full h-full bg-gray-600"></div>
                </div>

                {/* Información del producto */}
                <div className="p-3 flex flex-col gap-2">
                    <div className="h-6 bg-gray-600 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                    <div className="h-6 bg-gray-600 rounded w-1/3 mt-2"></div>

                    {/* Botones */}
                    <div className="flex gap-2 mt-1 w-full">
                        <div className="h-8 bg-gray-700 rounded w-full"></div>
                        <div className="h-8 bg-gray-700 rounded w-10"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-zinc-900 border border-zinc-700 text-white rounded-lg overflow-hidden shadow-lg">
            {/* Imagen del producto */}
            <div className="relative bg-gray-700 h-40 flex items-center justify-center">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className={`w-full h-full object-cover cursor-pointer hover:scale-110 hover:-translate-1 transition-all duration-300 ease-in-out ${product.availability === 0 ? "opacity-50" : ""
                            }`}
                    />
                ) : (
                    <div className="w-12 h-12 border-2 border-gray-400 rounded-full flex items-center justify-center">
                        <span className="text-gray-500">+</span>
                    </div>
                )}

                {/* Etiqueta "Nuevo" */}
                {product.isNew && (
                    <span className="absolute top-2 left-2 bg-blue-700 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Nuevo
                    </span>
                )}

                {/* Mensaje "No disponible" si availability es 0 */}
                {product.availability === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-gray-800 text-gray-300 px-3 py-1 text-xs rounded-full border border-gray-500">
                            No disponible
                        </span>
                    </div>
                )}
            </div>

            {/* Información del producto */}
            <div className="p-3 flex flex-col gap-1">
                <h3 className="text-base font-semibold min-h-[25px] line-clamp-1">
                    {product.name}
                </h3>
                <p className="text-zinc-400 text-sm min-h-[58px] line-clamp-3">{product.description}</p>
                <p className="font-bold text-white">${product.price}.000</p>

                {/* Botones */}
                <div className="flex gap-2 mt-1 w-full">
                    <button className="flex items-center justify-center gap-2 px-4 py-1 bg-zinc-800 rounded-lg border border-zinc-500 hover:bg-zinc-700 transition w-full">
                        <Pencil className="w-4 h-4 font-bold" />
                        <span className="text-sm font-bold">Editar</span>
                    </button>
                    <button className="px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
