import { useState } from "react";

const UploadProducts = () => {
    const [files, setFiles] = useState([]);
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [products, setProducts] = useState([]);
    const [saving, setSaving] = useState(false);

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const newFiles = Array.from(event.dataTransfer.files);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleFileSelect = (event) => {
        const newFiles = Array.from(event.target.files);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const removeFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleInputChange = (index, field, value) => {
        setProducts((prevProducts) => {
            const updatedProducts = [...prevProducts];
            updatedProducts[index] = {
                ...updatedProducts[index],
                [field]: value,
                isNew: updatedProducts[index].isNew ?? true
            };
            return updatedProducts;
        });
    };

    const uploadFiles = async () => {
        if (files.length === 0) return alert("No hay imágenes para subir.");

        setUploading(true);
        const formData = new FormData();
        formData.append("imagen", files[0]);

        console.log("Enviando imagen:", files[0]);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/upload`, {
                method: "POST",
                body: formData,
            });

            const responseText = await response.text();
            console.log("Respuesta del backend:", responseText);

            if (!response.ok) throw new Error("Error al subir la imagen");

            const data = JSON.parse(responseText);

            const newProduct = {
                id: data.id,
                image: data.imageUrl,
                name: "",
                description: "",
                price: "",
                isNew: true,
                category: "",
                availability: 1
            };

            setProducts([newProduct]);
        } catch (error) {
            alert("Error al subir la imagen: " + error.message);
        } finally {
            setUploading(false);
            setFiles([]);
        }
    };


    const saveAllProducts = async () => {
        if (products.some((product) => !product.name || !product.price || !product.category)) {
            return alert("Por favor completa todos los campos antes de guardar.");
        }

        setSaving(true);
        try {
            const product = products[0];

            const formattedProduct = {
                id: product.id,
                image: product.image,
                name: product.name,
                description: product.description,
                price: product.price,
                isNew: product.isNew ?? true,
                category: product.category,
                availability: product.availability
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
                const errorData = await response.json();
                throw new Error(errorData.error || "Error al guardar el producto");
            }

            const result = await response.json();
            alert(result.message || "Producto guardado con éxito!");
            setProducts([]);
        } catch (error) {
            console.error("Error completo:", error);
            alert("Error al guardar el producto: " + error.message);
        } finally {
            setSaving(false);
        }
    };


    return (
        <div className="min-h-screen w-screen mx-auto p-4 bg-black text-white flex flex-col justify-center">
            <div
                className={`border-4 border-dashed ${dragging ? "border-blue-500" : "border-gray-500"} rounded-lg p-6 text-center`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    id="fileInput"
                    name="imagen"
                    hidden
                />

                <label
                    htmlFor="fileInput"
                    className="cursor-pointer block text-xl text-gray-400"
                >
                    {dragging ? "📂 Suelta aquí" : "📁 Arrastra y suelta imágenes o haz clic para seleccionar"}
                </label>
            </div>

            <div className="mt-6">
                {files.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {files.map((file, index) => (
                            <div key={index} className="relative w-32 h-32">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`preview-${index}`}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                <button
                                    className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 p-1 rounded-full text-xs cursor-pointer"
                                    onClick={() => removeFile(index)}
                                >
                                    ✖
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {files.length > 0 && (
                <button
                    className={`mt-6 w-full md:w-auto bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all cursor-pointer ${uploading ? "bg-blue-400" : "hover:bg-blue-700"}`}
                    onClick={uploadFiles}
                    disabled={uploading}
                >
                    {uploading ? "📤 Subiendo..." : "📤 Subir imágenes"}
                </button>
            )}

            {products.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-200 mb-4">Información del Producto</h2>
                    {products.map((product, index) => (
                        <div key={index} className="border p-6 rounded-lg bg-gray-800 mb-4">
                            <img
                                src={product.image}
                                alt="Producto"
                                className="w-32 h-32 object-cover rounded-lg mb-4 mx-auto"
                            />
                            <input
                                type="text"
                                placeholder="Nombre del producto"
                                value={product.name}
                                onChange={(e) => handleInputChange(index, "name", e.target.value)}
                                className="w-full mb-4 p-2 border border-gray-500 rounded-lg bg-gray-700 text-white"
                                required
                            />
                            <textarea
                                placeholder="Descripción"
                                value={product.description}
                                onChange={(e) => handleInputChange(index, "description", e.target.value)}
                                className="w-full mb-4 p-2 border border-gray-500 rounded-lg bg-gray-700 text-white"
                            />
                            <input
                                type="number"
                                placeholder="Precio"
                                value={product.price}
                                onChange={(e) => handleInputChange(index, "price", e.target.value)}
                                className="w-full mb-4 p-2 border border-gray-500 rounded-lg bg-gray-700 text-white"
                                required
                            />

                            <select
                                value={product.category}
                                onChange={(e) => handleInputChange(index, "category", e.target.value)}
                                className="w-full mb-4 p-2 border border-gray-500 rounded-lg bg-gray-700 text-white"
                                required
                            >
                                <option value="">Selecciona una categoría</option>
                                <option value="Cocina">Cocina</option>
                                <option value="Iluminacion">Iluminacion</option>
                                <option value="Ropa">Ropa</option>
                                <option value="Hogar">Hogar</option>
                                <option value="Belleza">Belleza</option>
                                <option value="Viaje">Viaje</option>
                                <option value="Accesorios">Accesorios</option>
                            </select>

                            <label className="flex items-center gap-2 text-white mb-4">
                                <input
                                    type="checkbox"
                                    checked={product.isNew}
                                    onChange={(e) => handleInputChange(index, "isNew", e.target.checked)}
                                    className="w-5 h-5"
                                />
                                Nuevo
                            </label>

                            <label className="flex items-center gap-2 text-white">
                                <input
                                    type="checkbox"
                                    checked={product.availability === 1}
                                    onChange={(e) => handleInputChange(index, "availability", e.target.checked ? 1 : 0)}
                                    className="w-5 h-5"
                                />
                                Disponible
                            </label>
                        </div>
                    ))}
                    <button
                        className={`w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all ${saving ? "bg-green-400" : "hover:bg-green-700"}`}
                        onClick={saveAllProducts}
                        disabled={saving}
                    >
                        {saving ? "⏳ Guardando..." : "💾 Guardar Productos"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default UploadProducts;