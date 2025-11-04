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
const hashedPassword2 = await bcrypt.hash("user", 10);
const users = [
    {
        username: "admin",
        email: "admin@admin.com",
        password: hashedPassword
    },
     {
        username: "user",
        email: "user@user.com",
        password: hashedPassword2
    }
]

const shoes = [
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
            { objectPosition: "center", scale: 1 },
            { objectPosition: "center", scale: 0.5 },
            { objectPosition: "center", scale: 0.5 },
        ],
        stock: 50,
        brand: "HOKA",
        category: "Zapatillas",
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
            { objectPosition: "center", scale: 1 },
            { objectPosition: "center", scale: 0.3 },
            { objectPosition: "center", scale: 0.3 },
        ],
        stock: 75,
        brand: "ADIDAS",
        category: "Zapatillas",
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
            { objectPosition: "center", scale: 1 },
            { objectPosition: "center", scale: 0.8 },
            { objectPosition: "center", scale: 0.8 },
        ],
        stock: 60,
        brand: "ASICS",
        category: "Zapatillas",
        type: "running",
        rating: 4.2,
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
            { objectPosition: "center", scale: 1 },
            { objectPosition: "center", scale: 0.8 },
            { objectPosition: "center", scale: 0.8 },
        ],
        stock: 40,
        brand: "NNORMAL",
        category: "Zapatillas",
        type: "trail",
        rating: 3.8,
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
            { objectPosition: "center", scale: 1 },
            { objectPosition: "center", scale: 0.8 },
            { objectPosition: "center", scale: 0.8 },
        ],
        stock: 80,
        brand: "NEW BALANCE",
        category: "Zapatillas",
        type: "running",
        rating: 3.0,
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
            { objectPosition: "center", scale: 1 },
            { objectPosition: "center", scale: 0.8 },
            { objectPosition: "center", scale: 0.8 },
        ],
        stock: 55,
        brand: "HOKA",
        category: "Zapatillas",
        type: "trail",
        rating: 5.0,
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
            { objectPosition: "center", scale: 1 },
            { objectPosition: "center", scale: 0.8 },
            { objectPosition: "center", scale: 0.8 },
        ],
        stock: 45,
        brand: "LA SPORTIVA",
        category: "Zapatillas",
        type: "trail",
        rating: 4.6,
        numRates: 30
    }


];

const clothing = [
    // ----------------------------------------------------
    // CAMISETAS
    // ----------------------------------------------------
    {
        name: "Better Sweater Fleece",
        price: 99.00,
        offer: true,
        offerPrice: 79.00,
        description: "Jersey polar cálido y sostenible PATAGONIA.",
        images: [
            "/images/PATAGONIA/better-sweater/front.webp",
        ],
        imageStyle: [
            { objectPosition: "center", scale: 1 },
            { objectPosition: "center", scale: 1 },
            { objectPosition: "center", scale: 1 },
        ],
        stock: 45,
        brand: "PATAGONIA",
        category: "Jerseys",
        type: "Fleece", 
        rating: 4.8,
        numRates: 210
    },
    {
        name: "Alpha Grid Hoody",
        price: 130.00,
        offer: false,
        offerPrice: null,
        description: "Jersey técnico con Polartec Alpha para actividad intensa RAB.",
        images: [
            "/images/RAB/alpha-grid/front.png",
        ],
        imageStyle: [
            { objectPosition: "center", scale: 1 },
            { objectPosition: "center", scale: 1 },
            { objectPosition: "center", scale: 1 },
        ],
        stock: 30,
        brand: "RAB",
        category: "Jerseys",
        type: "Técnico", 
        rating: 4.6,
        numRates: 95
    },
    // ----------------------------------------------------
    // JERSEYS
    // ----------------------------------------------------
    {
        name: "Dri-FIT Miler",
        price: 35.00,
        offer: false,
        offerPrice: null,
        description: "Camiseta técnica de running de secado rápido NIKE.",
        images: [
            "/images/NIKE/miler/front.avif",
           
        ],
        imageStyle: [
            { objectPosition: "center", scale: 1 },
            { objectPosition: "center", scale: 1 },
            { objectPosition: "center", scale: 1 },
        ],
        stock: 90,
        brand: "NIKE",
        category: "Camisetas",
        type: "Técnica",
        rating: 4.3,
        numRates: 150
    },
    {
        name: "Capilene Cool Trail",
        price: 49.00,
        offer: true,
        offerPrice: 39.00,
        description: "Camiseta versátil de trail/senderismo PATAGONIA.",
        images: [
            "/images/PATAGONIA/capilene/front.webp",
        ],
        imageStyle: [
            { objectPosition: "center", scale: 1 },
            { objectPosition: "center", scale: 1 },
            { objectPosition: "center", scale: 1 },
        ],
        stock: 65,
        brand: "PATAGONIA",
        category: "Camisetas",
        type: "Trail",
        rating: 4.7,
        numRates: 110
    },
    {
        name: "Classic Tee",
        price: 25.00,
        offer: false,
        offerPrice: null,
        description: "Camiseta de algodón para uso diario THE NORTH FACE.",
        images: [
            "/images/THE_NORTH_FACE/classic-tee/front.avif",
        ],
        imageStyle: [
            { objectPosition: "center", scale: 1 },
            { objectPosition: "center", scale: 1 },
        ],
        stock: 120,
        brand: "THE NORTH FACE",
        category: "Camisetas",
        type: "Lifestyle",
        rating: 4.0,
        numRates: 55
    },
];

const accessories = [
    // ----------------------------------------------------
    // MOCHILAS
    // ----------------------------------------------------
    {
        name: "Fenix 8 pro",
        price: 159.00,
        offer: false,
        offerPrice: null,
        description: "Reloj alta tecnología ideal para deporte y montaña.",
        images: [
            "/images/GARMIN/fenix/front.webp",
     
        ],
        imageStyle: [
            { objectPosition: "center", scale: 1 },
            { objectPosition: "center", scale: 1 },
            { objectPosition: "center", scale: 1 },
        ],
        stock: 35,
        brand: "GARMIN",
        category: "Accesorios",
        type: "Reloj", 
        rating: 4.9,
        numRates: 300
    },
    {
        name: "Venture Backpack",
        price: 1290.00,
        offer: true,
        offerPrice: 875.00,
        description: "Mochila versátil de 28L para uso diario y viajes ARC'TERYX.",
        images: [
            "/images/ARCTERYX/venture-backpack/front.webp",
            "/images/ARCTERYX/venture-backpack/side.webp"
        ],
        imageStyle: [
            { objectPosition: "center", scale: 1 },
            { objectPosition: "center", scale: 1 },
        ],
        stock: 50,
        brand: "ARC'TERYX",
        category: "Accesorios",
        type: "Mochila",
        rating: 4.5,
        numRates: 180
    },
    // ----------------------------------------------------
    // GORRAS Y BOTELLAS
    // ----------------------------------------------------
    {
        name: "Trucker Hat",
        price: 35.00,
        offer: false,
        offerPrice: null,
        description: "Gorra trucker clásica con malla transpirable THE NORTH FACE.",
        images: [
            "/images/THE_NORTH_FACE/trucker-hat/front.avif",
            "/images/THE_NORTH_FACE/trucker-hat/side.avif"
        ],
        imageStyle: [
            { objectPosition: "center", scale: 1 },
            { objectPosition: "center", scale: 1 },
        ],
        stock: 150,
        brand: "THE NORTH FACE",
        category: "Accesorios",
        type: "Gorra",
        rating: 4.2,
        numRates: 80
    },
    {
        name: "Hydro Flask 32oz Wide Mouth",
        price: 44.95,
        offer: false,
        offerPrice: null,
        description: "Botella termo de acero inoxidable con aislamiento HYDRO FLASK.",
        images: [
            "/images/HYDROFLASK/bottle/front.jpg",
            "/images/HYDROFLASK/bottle/side.jpg"
        ],
        imageStyle: [
            { objectPosition: "center", scale: 1 },
            { objectPosition: "center", scale: 1 },
        ],
        stock: 100,
        brand: "HYDRO FLASK",
        category: "Accesorios",
        type: "Hidratación",
        rating: 4.7,
        numRates: 250
    },
];

async function seed() {
    await Product.deleteMany();
    await User.deleteMany();
    await User.insertMany(users);
    await Product.insertMany(shoes);
    await Product.insertMany(clothing);
    await Product.insertMany(accessories);
    console.log("Productos insertados");
    mongoose.disconnect();
}

seed();
