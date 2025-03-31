import React, { useState, useEffect } from "react";

export default function EditProducts() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(import.meta.env.VITE_BACKEND_API_URL + "/products");
                if (!response.ok) throw new Error("Error al obtener productos");

                const data = await response.json();
                setProducts(data.products || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setImageFile(null);
        setSuccess("");
        setError("");
    };

    const handleChange = (e) => {
        setSelectedProduct({
            ...selectedProduct,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess("");
        setError("");

        try {
            const formData = new FormData();
            formData.append("name", selectedProduct.name);
            formData.append("description", selectedProduct.description);
            formData.append("price", selectedProduct.price);
            formData.append("isNew", selectedProduct.isNew);
            formData.append("category", selectedProduct.category);
            formData.append("availability", selectedProduct.availability);
            if (imageFile) {
                formData.append("image", imageFile);
            }

            const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/products/${selectedProduct.id}`, {
                method: "PUT",
                body: formData
            });

            if (!response.ok) throw new Error("Error al actualizar el producto");

            setSuccess("Producto actualizado correctamente");
            setProducts(products.map(p => (p._id === selectedProduct._id ? selectedProduct : p)));
            setSelectedProduct(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">Editar Productos</h2>
            {loading && <p className="text-gray-600">Cargando...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product._id} className="p-4 border rounded shadow bg-white">
                        <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2 rounded" />
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="text-gray-600">{product.description}</p>
                        <button
                            onClick={() => handleEdit(product)}
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Editar
                        </button>
                    </div>
                ))}
            </div>

            {selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h3 className="text-2xl font-bold mb-4">Editar Producto</h3>
                        <form onSubmit={handleSubmit}>
                            <label className="block mb-2">
                                Nombre:
                                <input type="text" name="name" value={selectedProduct.name} onChange={handleChange} className="w-full p-2 border rounded" />
                            </label>
                            <label className="block mb-2">
                                Descripción:
                                <textarea name="description" value={selectedProduct.description} onChange={handleChange} className="w-full p-2 border rounded"></textarea>
                            </label>
                            <label className="block mb-2">
                                Precio:
                                <input type="number" name="price" value={selectedProduct.price} onChange={handleChange} className="w-full p-2 border rounded" />
                            </label>
                            <label className="block mb-2">
                                Categoría:
                                <input type="text" name="category" value={selectedProduct.category} onChange={handleChange} className="w-full p-2 border rounded" />
                            </label>
                            <label className="block mb-2">
                                Disponibilidad:
                                <input type="number" name="availability" value={selectedProduct.availability} onChange={handleChange} className="w-full p-2 border rounded" />
                            </label>
                            <label className="block mb-2">
                                Imagen:
                                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
                            </label>
                            <div className="flex justify-between mt-4">
                                <button type="button" onClick={() => setSelectedProduct(null)} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Cancelar</button>
                                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Guardar Cambios</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
