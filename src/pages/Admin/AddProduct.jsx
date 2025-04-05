import Aside from "../../modules/Admin/Aside";
import { useEffect, useMemo, useState } from "react";

export default function AddProducts() {
    const [products, setProducts] = useState([{
        id: "",
        image: "",
        name: "",
        description: "",
        price: "",
        isNew: true,
        category: "",
        availability: 1
    }]);

    const [allProducts, setAllProducts] = useState([]);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(import.meta.env.VITE_BACKEND_API_URL + "/products");
                if (!response.ok) throw new Error("Error al obtener productos");

                const data = await response.json();
                setAllProducts(data.products || []);
                console.log("Productos obtenidos:", data.products);
            } catch (err) {
                console.error("Error al obtener productos:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const uniqueCategories = useMemo(() => {
        if (!allProducts || allProducts.length === 0) return [];
        return [...new Set(allProducts.map(product => product.category))];
    }, [allProducts]);

    const handleImageRemove = () => {
        setImage(null);
        setFiles([]);
        updateProduct("id", "");
        updateProduct("image", "");
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFiles([file]);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            setFiles([file]);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
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

    const updateProduct = (field, value) => {
        setProducts(prevProducts => {
            const updatedProducts = [...prevProducts];
            updatedProducts[0] = {
                ...updatedProducts[0],
                [field]: value
            };
            return updatedProducts;
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        updateProduct(name, type === "checkbox" ? checked : value);
    };

    const uploadImage = async () => {
        if (files.length === 0) {
            throw new Error("No hay imágenes para subir.");
        }

        const formData = new FormData();
        formData.append("imagen", files[0]);

        console.log("Enviando imagen:", files[0]);

        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/upload`, {
            method: "POST",
            body: formData,
        });

        const responseText = await response.text();
        console.log("Respuesta del backend:", responseText);

        if (!response.ok) {
            throw new Error("Error al subir la imagen");
        }

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            throw new Error("Respuesta no válida del servidor");
        }

        console.log("Imagen subida con éxito:", data);

        if (!data.id) {
            throw new Error("No se recibió ID de producto del servidor");
        }

        return data;
    };

    const saveProduct = async () => {
        if (!products[0].name || !products[0].price || !products[0].category) {
            setError("Por favor completa todos los campos obligatorios: nombre, precio y categoría.");
            return;
        }

        if (files.length === 0) {
            setError("Por favor selecciona una imagen para el producto.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const uploadResult = await uploadImage();
            if (!uploadResult || !uploadResult.id) {
                throw new Error("No se pudo subir la imagen correctamente");
            }

            const productId = uploadResult.id;
            const imageUrl = uploadResult.imageUrl || "";

            const product = {
                ...products[0],
                id: productId,
                image: imageUrl
            };

            const formattedProduct = {
                id: product.id,
                image: product.image,
                name: product.name,
                description: product.description || "",
                price: product.price,
                isNew: product.isNew !== undefined ? product.isNew : true,
                category: product.category,
                availability: product.availability !== undefined ? product.availability : 1
            };

            console.log("Enviando producto:", JSON.stringify(formattedProduct, null, 2));

            const response = await fetch(import.meta.env.VITE_BACKEND_API_URL + "/save-product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedProduct),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error("Error al guardar el producto: " + errorText);
            }

            // Parsear la respuesta
            const responseText = await response.text();
            let result;
            try {
                result = JSON.parse(responseText);
            } catch (e) {
                result = { message: "Producto guardado con éxito (respuesta no JSON)" };
            }

            setSuccess(result.message || "Producto guardado con éxito!");

            // Reset the form
            setProducts([{
                id: "",
                image: "",
                name: "",
                description: "",
                price: "",
                isNew: true,
                category: "",
                availability: 1
            }]);
            setImage(null);
            setFiles([]);

        } catch (error) {
            console.error("Error completo:", error);
            setError("Error al guardar el producto: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        saveProduct();
    };

    return (
        <Aside>
            <div className="flex flex-col gap-4 h-full w-full overflow-y-auto pt-4 pb-18 md:pb-0 scrollbar-product-hide">
                {isDragging && (
                    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center pointer-events-none">
                        <h2 className="text-3xl font-bold text-white">¡Suelta aquí para subir la imagen!</h2>
                    </div>
                )}

                <div>
                    <h1 className="text-3xl font-black">Añadir Producto</h1>
                    <p className="text-zinc-400 font-medium">Sube una imagen y completa la información del producto</p>
                </div>

                {success && (
                    <div className="bg-green-500/20 border border-green-500 text-green-500 p-3 rounded-md">
                        {success}
                    </div>
                )}

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-500 p-3 rounded-md">
                        {error}
                    </div>
                )}

                <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className="flex items-center border border-zinc-800 text-white rounded-lg shadow-lg p-5 w-full flex-1"
                >
                    <form onSubmit={handleSubmit} className="flex flex-col items-center md:flex-row md:items-start gap-6 w-full">
                        {image ? (
                            <div className="relative aspect-square w-52 md:w-96 rounded-xl overflow-hidden shadow-lg my-auto mx-auto">
                                <img
                                    alt={products[0].name || "Preview"}
                                    loading="lazy"
                                    decoding="async"
                                    className="object-cover absolute inset-0 w-full h-full"
                                    src={image}
                                />

                                <button
                                    type="button"
                                    onClick={handleImageRemove}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-800 cursor-pointer transition-all duration-300 ease-in-out"
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
                                        <path d="M18 6 6 18" />
                                        <path d="m6 6 12 12" />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center border-dashed border-2 border-zinc-600 rounded-lg p-12 text-center aspect-square w-full md:w-96 my-auto">
                                <div className="flex flex-col items-center space-y-1">
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
                                    <h3 className="text-xl font-bold text-white">Arrastra y suelta tu imagen aquí</h3>
                                    <p className="text-zinc-400 text-sm">O haz clic para seleccionar una imagen</p>
                                    <label className="inline-flex items-center justify-center gap-2 mt-4 whitespace-nowrap cursor-pointer rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background h-10 px-4 py-2 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image mr-2 h-4 w-4">
                                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                                            <circle cx="9" cy="9" r="2"></circle>
                                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                                        </svg>
                                        Seleccionar Imágenes
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4 w-full">
                            <div className="grid gap-1">
                                <label className="text-sm text-zinc-300">Nombre</label>
                                <input
                                    className="bg-zinc-800 border border-zinc-700 text-white rounded-md px-3 py-2 text-sm w-full"
                                    name="name"
                                    value={products[0].name}
                                    placeholder="Ej: Camiseta Premium"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="grid gap-1">
                                <label className="text-sm text-zinc-300">Descripción</label>
                                <textarea
                                    className="bg-zinc-800 border border-zinc-700 text-white rounded-md px-3 py-2 text-sm w-full min-h-[80px]"
                                    name="description"
                                    value={products[0].description}
                                    placeholder="Describe tu producto..."
                                    onChange={handleChange}
                                    rows="4"
                                    required
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="grid gap-1">
                                    <label className="text-sm text-zinc-300">Precio</label>
                                    <input
                                        className="bg-zinc-800 border border-zinc-700 text-white rounded-md px-3 py-2 text-sm w-full"
                                        name="price"
                                        type="number"
                                        step="0.01"
                                        value={products[0].price}
                                        placeholder="20"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <label className="text-sm text-zinc-300">Categoría</label>
                                    <select
                                        className="bg-zinc-800 border border-zinc-700 text-white rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name="category"
                                        value={products[0].category}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option disabled value="">
                                            🗂️ Selecciona una categoría
                                        </option>
                                        {uniqueCategories.map(cat => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-zinc-300">Disponible</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="availability"
                                            className="sr-only peer"
                                            checked={products[0].availability === 1}
                                            onChange={(e) => {
                                                updateProduct('availability', e.target.checked ? 1 : 0);
                                            }}
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
                                            checked
                                            onChange={(e) => {
                                                updateProduct('isNew', e.target.checked ? true : false);
                                            }}
                                        />
                                        <div className="w-11 h-6 bg-zinc-600 peer-checked:bg-blue-500 rounded-full transition-colors duration-300" />
                                        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transform peer-checked:translate-x-full transition-transform duration-300" />
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`${loading ? 'bg-blue-800' : 'bg-blue-600 hover:bg-blue-900'} 
                                    text-white text-sm font-medium rounded-md px-4 py-2 w-full transition-all duration-300 ease-in-out flex justify-center items-center`}
                            >
                                {loading ? 'Guardando...' : 'Guardar Producto'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Aside>
    )
}