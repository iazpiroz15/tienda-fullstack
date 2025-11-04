import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
 offer: { type: Boolean, default: false, required: true },
    offerPrice: { type: Number, min: 0},
  description: String,
  images: [{type: String, required: true }],
  imageStyle: [{
    objectPosition: String,
    scale: Number
  }],
  stock: { type: Number, default: 0 },
  brand: String,
  type: String,
  rating: { type: Number, default: 0, min: 0, max: 5 },
  numRates: { type: Number, default: 0 }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
