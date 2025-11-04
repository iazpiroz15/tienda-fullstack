import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import productRoutes from "./routes/products.js"
import authRoutes from "./routes/auth.js"
import cartRoutes from "./routes/cart.js"

dotenv.config();
const app = express();

//Permitir cookies desde el frontend
app.use(cors(({origin: "http://localhost:5173", credentials: true})));
app.use(express.json());
app.use(cookieParser());

app.use("/api/products", productRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/cart", cartRoutes)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado ")
    app.listen(5000, () => console.log("Servidor en puerto 5000"));
  })
  .catch(err => console.error("Error al conectar a MongoDB:", err));
