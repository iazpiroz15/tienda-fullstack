import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

//GET /api/products
router.get("/", async (req, res) => {
const { query } = req.query;
    try{
        const filter = query
          ? {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { brand: { $regex: query, $options: "i" } },
            { type: { $regex: query, $options: "i" } }
          ]
        }
      : {};
        const products = await Product.find(filter);
        res.json(products);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//POST /api/products
router.post("/", async (req,res) =>{
    try{
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err){
        res.status(400).json({ error: err.message});
    }
});

//GET /api/products/:id
router.get("/:id", async (req,res) =>{
    try{
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({error: "Producto no encontrado"});
        res.json(product);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//PUT /api/products/:id
router.put("/:id", async (req,res) => {
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new:true})
        res.json(updatedProduct);
    } catch (err){
        res.status(400).json({error: err.message});
    }
})

router.delete("/:id", async(req,res) => {
    try{
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        res.json({message: "Producto eliminado"});
    } catch (err){
        res.status(500).json({error: err.message});
    }
})

export default router;