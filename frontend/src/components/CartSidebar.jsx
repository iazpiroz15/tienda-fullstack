import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";
import { X } from "lucide-react";

export default function CartSidebar({ isOpen, onClose }) {
const { cart, totalPrice, totalOriginalPrice} = useCart();

const productsInCart = cart?.products || [];
const isEmpty = productsInCart.length === 0;

return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose} 
      ></div>

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl z-50 
          transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full' 
        } flex flex-col`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Tu Carrito</h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isEmpty ? (
            <p className="p-4 text-gray-500 text-center mt-8">
              Tu carrito está vacío
            </p>
          ) : (
            productsInCart.map((item) => (
              <CartItem key={item.productId?._id} product={item} />
            ))
          )}
        </div>

        <div className="p-4 border-t bg-gray-50">
          <div className="flex justify-between items-center mb-4 text-xl font-bold">
            <span>Total:</span>
            <div className="flex items-center gap-3">
        
        {totalOriginalPrice > totalPrice && (
          <span className="text-base font-medium text-gray-500 line-through">
            {totalOriginalPrice.toFixed(2)}€
          </span>
        )}
        
        <span className="text-red-600">
          {totalPrice.toFixed(2)}€
        </span>
      </div>
          </div>
          <button
            disabled={isEmpty}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              isEmpty 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            Comprar
          </button>
        </div>
      </div>
    </>
  );


}