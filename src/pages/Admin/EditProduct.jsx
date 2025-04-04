import { useParams } from "react-router-dom";
import Aside from "../../modules/Admin/Aside";
import { useEffect, useState } from "react";

export default function EditProduct() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    // Estados para editar
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        available: true,
        isNew: false,
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/products`);
                if (!response.ok) throw new Error("Error al obtener los productos");

                const data = await response.json();
                const foundProduct = data.products?.find((p) => p.id === Number(id));
                if (!foundProduct) throw new Error("Producto no encontrado");

                setProduct(foundProduct);
                setImage(foundProduct.image);
                setFormData({
                    name: foundProduct.name || "",
                    description: foundProduct.description || "",
                    price: foundProduct.price || "",
                    category: foundProduct.category || "",
                    available: foundProduct.available ?? true,
                    isNew: foundProduct.isNew ?? false,
                });
            } catch (err) {
                console.error("Error al obtener producto:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);


    const handleImageRemove = () => setImage(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    useEffect(() => {
        const handleGlobalDragOver = (e) => {
            e.preventDefault();
            setIsDragging(true);
        };
        const handleGlobalDrop = (e) => setIsDragging(false);
        const handleGlobalDragLeave = (e) => {
            if (e.relatedTarget === null) setIsDragging(false);
        };

        document.addEventListener("dragover", handleGlobalDragOver);
        document.addEventListener("dragleave", handleGlobalDragLeave);
        document.addEventListener("drop", handleGlobalDrop);

        return () => {
            document.removeEventListener("dragover", handleGlobalDragOver);
            document.removeEventListener("dragleave", handleGlobalDragLeave);
            document.removeEventListener("drop", handleGlobalDrop);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes enviar los datos actualizados al backend
        console.log("Producto actualizado:", { ...formData, image });
    };


    return (
        <Aside>
            <div className="flex flex-col gap-4 w-full h-full overflow-y-auto pt-4 pb-20 md:pb-14 scrollbar-product-hide">
                {/* Overlay de soltar imagen */}
                {isDragging && (
                    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center pointer-events-none">
                        <h2 className="text-3xl font-bold text-white">¡Suelta aquí para subir la imagen!</h2>
                    </div>
                )}

                <div>
                    <h1 className="text-3xl font-black">Editar Producto</h1>
                    <p className="text-zinc-400 font-medium">Actualiza la información y la imagen del producto</p>
                </div>

                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className="flex items-center border border-zinc-800 text-white rounded-lg shadow-lg p-5 w-full flex-1"
                >
                    {loading ? (
                        <p className="text-zinc-400">Cargando producto...</p>
                    ) : error ? (
                        <p className="text-red-500">Error: {error}</p>
                    ) : image ? (
                        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6 w-full">
                            {/* Imagen */}
                            <div className="relative aspect-square rounded-md overflow-hidden h-52 md:h-80 md:w-80">
                                <img
                                    alt={product?.name || "Preview"}
                                    loading="lazy"
                                    decoding="async"
                                    className="object-cover absolute inset-0 h-full w-full"
                                    src={image}
                                />
                                <button
                                    type="button"
                                    onClick={handleImageRemove}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4"
                                    >
                                        <path d="M18 6 6 18"></path>
                                        <path d="m6 6 12 12"></path>
                                    </svg>
                                </button>
                            </div>

                            {/* Inputs */}
                            <div className="space-y-4 w-full">
                                {/* Nombre */}
                                <div className="grid gap-1">
                                    <label className="text-sm text-zinc-300">Nombre</label>
                                    <input
                                        className="bg-zinc-800 border border-zinc-700 text-white rounded-md px-3 py-2 text-sm w-full"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Descripción */}
                                <div className="grid gap-1">
                                    <label className="text-sm text-zinc-300">Descripción</label>
                                    <textarea
                                        className="bg-zinc-800 border border-zinc-700 text-white rounded-md px-3 py-2 text-sm w-full min-h-[80px]"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="4"
                                        required
                                    />
                                </div>

                                {/* Precio y Categoría */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="grid gap-1">
                                        <label className="text-sm text-zinc-300">Precio</label>
                                        <input
                                            className="bg-zinc-800 border border-zinc-700 text-white rounded-md px-3 py-2 text-sm w-full"
                                            name="price"
                                            type="number"
                                            step="0.01"
                                            value={formData.price}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-1">
                                        <label className="text-sm text-zinc-300">Categoría</label>
                                        <input
                                            className="bg-zinc-800 border border-zinc-700 text-white rounded-md px-3 py-2 text-sm w-full"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Switches */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-zinc-300">Disponible</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="available"
                                                className="sr-only peer"
                                                checked={formData.available}
                                                onChange={handleChange}
                                            />
                                            <div className="w-11 h-6 bg-zinc-600 peer-checked:bg-green-500 rounded-full transition-colors duration-300" />
                                            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transform peer-checked:translate-x-full transition-transform duration-300" />
                                        </label>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-zinc-300">Producto Nuevo</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="isNew"
                                                className="sr-only peer"
                                                checked={formData.isNew}
                                                onChange={handleChange}
                                            />
                                            <div className="w-11 h-6 bg-zinc-600 peer-checked:bg-blue-500 rounded-full transition-colors duration-300" />
                                            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transform peer-checked:translate-x-full transition-transform duration-300" />
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-medium rounded-md px-4 py-2 w-full"
                                >
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="border-dashed border-2 border-zinc-600 rounded-lg p-12 text-center">
                            <div className="flex flex-col items-center">
                                <svg
                                    className="h-10 w-10 text-zinc-400 mb-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
                                    <polyline points="17 8 12 3 7 8"></polyline>
                                    <line x1="12" y1="3" x2="12" y2="15"></line>
                                </svg>
                                <h3 className="text-lg font-medium text-white mb-2">Arrastra y suelta tu imagen aquí</h3>
                                <p className="text-zinc-400 text-sm">O haz clic para seleccionar una imagen</p>
                                <input type="file" onChange={handleFileChange} className="mt-4 text-sm text-white" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Aside>

    );
}