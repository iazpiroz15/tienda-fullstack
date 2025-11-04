import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
dotenv.config({ path: "./backend/.env" });

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.error(err));

const hashedPassword = await bcrypt.hash("admin123", 10);
const user = [
    {
        username: "admin",
        email: "admin@admin.com",
        password: hashedPassword
    }
]

const products = [
    {
        name: "Speedgoat 6",
        price: 139.99,
        offer: true,
        offerPrice: 109.99,
        description: "Zapatillas trail HOKA",
        images: [
            "/images/HOKA/Speedgoat/front.avif",
            "/images/HOKA/Speedgoat/sole.avif",
            "/images/HOKA/Speedgoat/side.avif"
        ],
        imageStyle: [
            {objectPosition: "center", scale: 1},
            {objectPosition: "center", scale: 0.5},
            {objectPosition: "center", scale: 0.5},
        ],
        stock: 50,
        brand: "HOKA",
        type: "trail",
        rating: 4.5,
        numRates: 120
    },
    {
        name: "Ultraboost 22",
        price: 179.99,
        description: "Zapatillas running ADIDAS",
        offer: false,
        offerPrice: null,
        images: [
            "/images/ADIDAS/ultraboost/front.avif",
            "/images/ADIDAS/ultraboost/sole.avif",
            "/images/ADIDAS/ultraboost/side.avif"
        ],
         imageStyle: [
            {objectPosition: "center", scale: 1},
            {objectPosition: "center", scale: 0.3},
            {objectPosition: "center", scale: 0.3},
        ],
        stock: 75,
        brand: "ADIDAS",
        type: "running",
        rating: 2.7,
        numRates: 85
    },
    {
        name: "Gel-Kayano 32",
        price: 159.99,
        offer: false,
        offerPrice: null,
        description: "Zapatillas running ASICS",
        images: [
            "/images/ASICS/gel-kayano/front.avif",
            "/images/ASICS/gel-kayano/sole.avif",
            "/images/ASICS/gel-kayano/side.avif"
        ],
         imageStyle: [
            {objectPosition: "center", scale: 1},
            {objectPosition: "center", scale: 0.8},
            {objectPosition: "center", scale: 0.8},
        ],
        stock: 60,
        brand: "ASICS",
        type: "running",
        Rating: 4.2,
        numRates: 20
    },
    {
        name: "Tomir 1.0",
        price: 99.99,
        offer: true,
        offerPrice: 69.99,
        description: "Zapatillas trail NNORMAL",
        images: [
            "/images/NNORMAL/TOMIR/front.avif",
            "/images/NNORMAL/TOMIR/sole.avif",
            "/images/NNORMAL/TOMIR/side.avif"
        ],
         imageStyle: [
            {objectPosition: "center", scale: 1},
            {objectPosition: "center", scale: 0.8},
            {objectPosition: "center", scale: 0.8},
        ],
        stock: 40,
        brand: "NNORMAL",
        type: "trail",
        Rating: 3.8,
        numRates: 10
    },
    {
        name: "Fresh Foam 1080v11",
        price: 149.99,
        offer: false,
        offerPrice: null,
        description: "Zapatillas running NEW BALANCE",
        images: [
            "/images/NEW_BALANCE/fresh-foam/front.avif",
            "/images/NEW_BALANCE/fresh-foam/sole.avif",
            "/images/NEW_BALANCE/fresh-foam/side.avif"
        ],
         imageStyle: [
            {objectPosition: "center", scale: 1},
            {objectPosition: "center", scale: 0.8},
            {objectPosition: "center", scale: 0.8},
        ],
        stock: 80,
        brand: "NEW BALANCE",
        type: "running",
        Rating: 3.0,
        numRates: 50
    },
    {
        name: "Challenger ATR 7",
        price: 129.99,
        offer: false,
        offerPrice: null,
        description: "Zapatillas trail HOKA",
        images: [
            "/images/HOKA/Challenger/front.avif",
            "/images/HOKA/Challenger/sole.avif",
            "/images/HOKA/Challenger/side.avif"
        ],
         imageStyle: [
            {objectPosition: "center", scale: 1},
            {objectPosition: "center", scale: 0.8},
            {objectPosition: "center", scale: 0.8},
        ],
        stock: 55,
        brand: "HOKA",
        type: "trail",
        Rating: 5.0,
        numRates: 75
    },
    {
        name: "Ultra raptor II",
        price: 119.99,
        offer: true,
        offerPrice: 102.99,
        description: "Zapatillas trail La Sportiva",
        images: [
            "/images/SPORTIVA/ultra-raptor/front.avif",
            "/images/SPORTIVA/ultra-raptor/sole.avif",
            "/images/SPORTIVA/ultra-raptor/side.avif"
        ],
         imageStyle: [
            {objectPosition: "center", scale: 1},
            {objectPosition: "center", scale: 0.8},
            {objectPosition: "center", scale: 0.8},
        ],
        stock: 45,
        brand: "La Sportiva",
        type: "trail",
        Rating: 4.6,
        numRates: 30
    }


];

async function seed() {
    await Product.deleteMany();
    await User.deleteMany();
    await User.insertMany(user);
    await Product.insertMany(products);
    console.log("Productos insertados");
    mongoose.disconnect();
}

seed();
