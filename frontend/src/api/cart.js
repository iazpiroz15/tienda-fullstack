const API_URL = "http://localhost:5000";

export async function getCart() {
    const res = await fetch(`${API_URL}/api/cart`, {
        credentials: "include",
    });
    if (!res.ok) throw new Error(`Error al obtener el carrito: ${res.status}`);
    return res.json();
    }

    export async function addToCart(productId, quantity) {
    const res = await fetch(`${API_URL}/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ productId, quantity }),
    });
    if (!res.ok) throw new Error(`Error al agregar al carrito: ${res.status}`);
    return res.json();
    }

export async function removeFromCart(productId) {
    const res = await fetch(`${API_URL}/api/cart/:${productId}`, {
        method: "DELETE",
        credentials: "include",
    });
    if (!res.ok) throw new Error(`Error al eliminar del carrito: ${res.status}`);
    return res.json();
}