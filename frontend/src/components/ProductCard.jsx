import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { addToCart } from "../api/cart";
import {useCart} from "../context/CartContext";
import { Minus, Plus } from "lucide-react";


// src/components/ProductCard.jsx
export default function ProductCard({ product }) {
  const [index, setIndex] = useState(0);
  //const [cart, setCart] = useState({ products: [] });

  const { cart, handleAdd, handleRemove } = useCart();

  const itemInCart = cart?.products?.find(
    (p) => p.productId?._id === product._id
  );

  const prevImage = () => {
    setIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={i <= product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition p-3">
      <div className="relative h-64 bg-gray-50 flex items-center justify-center">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[index]}
            alt={product.name}
            style={{
              objectPosition: product.imageStyle?.objectPosition,
              transform: `scale(${product.imageStyle?.scale})`,
            }}
            className="w-full h-64 object-cover rounded-t-2xl" />
        ) : (
          <p className="text-gray-400">Sin imagen</p>
        )}

        {product.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 bg-white/70 hover:bg-white p-1 rounded-full shadow"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 bg-white/70 hover:bg-white p-1 rounded-full shadow"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.brand}</p>

        <div className="flex items-center mt-2">{renderStars()}</div>

        <div className="mt-2 flex items-center gap-3">
          {product.offer && product.offerPrice ? (
            // oferta
            <>
              <p className="text-sm font-medium text-gray-500 line-through">
                {product.price.toFixed(2)}€
              </p>
              <p className="text-xl font-bold text-red-600">
                {product.offerPrice.toFixed(2)}€
              </p>
            </>
          ) : (
            //No hay oferta
            <p className="text-xl font-bold text-cyan-700">
              {product.price.toFixed(2)}€
            </p>
          )}
        </div>
      <div className="mt-3 flex items-center justify-between gap-2">
  <button
    onClick={() => handleAdd(product._id)}
    className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
  >
    Añadir al carrito
  </button>

  {itemInCart && (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-1 py-0.5">
                    <button
                        onClick={() => handleRemove(product._id)}
                        className="p-1 text-gray-700 hover:text-red-600"
                    >
                        <Minus size={14} />
                    </button>
                    <span className="text-sm font-semibold w-5 text-center">{itemInCart.quantity}</span>
                    <button
                        onClick={() => handleAdd(product._id)}
                        className="p-1 text-gray-700 hover:text-emerald-600"
                    >
                        <Plus size={14} />
                    </button>
                    
                </div>
  )}
</div>

      </div>
    </div>
  );
}


