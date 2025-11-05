import express from "express";
import Cart from "../models/Cart.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate("products.productId");

        if (cart) {
            cart.products = cart.products.filter(p => p.productId !== null);
            await cart.save();
        }
        res.json(cart || { userId: req.user.id, products: [] });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/add", verifyToken, async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            cart = new Cart({ userId: req.user.id, products: [] });
        }
        const existingProduct = cart.products.find(
            (p) => p.productId.toString() === productId
        );

        if (existingProduct) {
            existingProduct.quantity += quantity;

            if (existingProduct.quantity <= 0) {
                // Eliminar producto
                cart.products = cart.products.filter(
                    (p) => p.productId.toString() !== productId
                );
            }
        } else {
            // Producto nuevo y cantidad positiva
            if (quantity > 0) {
                cart.products.push({ productId, quantity });
            }
        }
        await cart.save();
        await cart.populate("products.productId");
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:productId", verifyToken, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }
        const productId = req.params.productId;
        cart.products = cart.products.filter(p => p.productId.toString() !== productId);

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;