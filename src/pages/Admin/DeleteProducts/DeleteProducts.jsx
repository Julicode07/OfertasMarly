import React, { useState, useEffect } from "react";

export default function DeleteProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/products`);
            if (!response.ok) throw new Error("Error al obtener productos");

            const data = await response.json();
            setProducts(data.products || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que quieres eliminar este producto?")) return;

        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/delete-product/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Error al eliminar el producto");

            setSuccess("Producto eliminado correctamente");
            setProducts(products.filter(product => product.id !== id));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
            setTimeout(() => setSuccess(""), 3000);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">Lista de Productos</h2>
            {loading && <p className="text-gray-600">Cargando...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Imagen</th>
                        <th className="border p-2">Nombre</th>
                        <th className="border p-2">Precio</th>
                        <th className="border p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id} className="text-center">
                            <td className="border p-2">
                                <img src={`${import.meta.env.VITE_BACKEND_URL}${product.image}`} alt={product.name} className="w-16 h-16 object-cover mx-auto" />
                            </td>
                            <td className="border p-2">{product.name}</td>
                            <td className="border p-2">${product.price}</td>
                            <td className="border p-2">
                                <button onClick={() => handleDelete(product.id)} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
