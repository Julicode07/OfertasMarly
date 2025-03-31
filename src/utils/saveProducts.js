export default function saveProduct(formData) {
    if (!formData || !formData.name || !formData.price || !formData.category) {
        console.error("Error: Datos del producto incompletos.");
        return;
    }

    let products = JSON.parse(localStorage.getItem("products")) || [];

    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        image: formData.image || "/images/default.jpg",
        name: formData.name.trim(),
        description: formData.description?.trim() || "",
        price: parseFloat(formData.price) || 0,
        isNew: formData.isNew === "true",
        category: formData.category.trim(),
    };

    products.push(newProduct);

    localStorage.setItem("products", JSON.stringify(products));

    console.log("✅ Producto agregado:", newProduct);

    return products;
}
