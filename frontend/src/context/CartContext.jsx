import { createContext, useContext, useEffect, useState } from "react";
import { getCart, addToCart, removeFromCart } from "../api/cart";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);

    useEffect(() => {
        async function fetchCart() {
            try {
                const data = await getCart();
                setCart(data);
            } catch (err) {
                console.error("Error cargando carrito:", err);
            }
        }
        fetchCart();
    }, []);

    const totalQuantity = cart?.products?.reduce((acc, p) => acc + p.quantity, 0) || 0;
    
const totals = cart?.products?.reduce((acc, p) => {
        const productData = p.productId;
        
        if (!productData) return acc;

        const finalPriceToUse = 
            (productData.offer && productData.offerPrice !== undefined)
                ? productData.offerPrice
                : productData.price;
        
        const finalPrice = finalPriceToUse || 0;
        const originalPrice = productData.price || 0; 
        
        acc.final += (p.quantity * finalPrice);
        acc.original += (p.quantity * originalPrice);

        return acc;
    }, { final: 0, original: 0 }) || { final: 0, original: 0 };
    
    const totalPrice = totals.final;
    
    const totalOriginalPrice = totals.original;

    const handleAdd = async (productId) => {
        try {
            const updated = await addToCart(productId, 1);
            setCart(updated);
        } catch (err) {
            console.error("Error agregando al carrito:", err);
        }
    };

    const handleRemove = async (productId) => {
        try {
            const existing = cart?.products?.find(p => p.productId?._id === productId);
            if (!existing) return;

            let updated;
            if (existing.quantity > 0) {
                // Reducimos cantidad
                 updated = await addToCart(productId, -1);
            } else {
                // Lo quitamos del carrito
                 updated = await removeFromCart(productId);
            }
            setCart(updated);
        } catch (err) {
            console.error("Error eliminando del carrito:", err);
        }
    };

    return (
        <CartContext.Provider value={{ cart, totalQuantity, totalPrice, totalOriginalPrice, handleAdd, handleRemove }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
