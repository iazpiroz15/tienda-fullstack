import React from "react";
import { useCart } from "../context/CartContext";
import { X, Minus, Plus } from "lucide-react";

export default function CartItem ({ product }){
    const { handleAdd, handleRemove } = useCart();

const { name, price, offer, offerPrice, images, _id: productId } = product.productId;
    const quantity = product.quantity;
 
    const finalPrice = (offer && offerPrice) ? offerPrice : price;
    const subTotal = finalPrice * quantity;

    return (
        <div className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center gap-3">
                <img
                    src={images?.[0]}
                    alt={name}
                    className="w-16 h-16 object-cover rounded-md"
                />
               <div className="flex items-center gap-2">
            {offer && offerPrice ? (
              <>
                <p className="text-xs text-gray-500 line-through">
                  {price.toFixed(2)}€
                </p>
                <p className="text-sm font-semibold text-red-600">
                  {offerPrice.toFixed(2)}€
                </p>
              </>
            ) : (
              <p className="text-sm text-gray-600">
                {price.toFixed(2)}€
              </p>
            )}
          </div>
            </div>
            <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-1 py-0.5">
                    <button
                        onClick={() => handleRemove(productId)}
                        className="p-1 text-gray-700 hover:text-red-600"
                    >
                        <Minus size={14} />
                    </button>
                    <span className="text-sm font-semibold w-5 text-center">{quantity}</span>
                    <button
                        onClick={() => handleAdd(productId)}
                        className="p-1 text-gray-700 hover:text-emerald-600"
                    >
                        <Plus size={14} />
                    </button>
                    
                </div>
                <p className="text-xs text-gray-500">
                {finalPrice.toFixed(2)}€ x {quantity} ud.
            </p>
                <p className="mt-1 font-bold text-cyan-700">
                    {subTotal.toFixed(2)}€
                </p>
            </div>
        </div>
    )
}