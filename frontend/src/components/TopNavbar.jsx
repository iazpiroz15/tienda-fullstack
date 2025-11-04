// src/components/TopNavbar.jsx
import { HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi";
import { useState, useEffect } from "react";
import { getProducts } from "../api/products";
import { useCart } from "../context/CartContext.jsx";

export default function TopNavbar({searchTerm, setSearchTerm, onCartClick}) {
const [products, setProducts] = useState([]);
const {totalQuantity} = useCart();
  const handleSearch = (e) => {
    e.preventDefault();
    // Aquí podrías propagar el término a ProductList con un contexto o prop
  };
useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts({ query: searchTerm });
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchProducts();
  }, [searchTerm]);
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow">
      <div className="text-2xl font-bold text-gray-800">
        MiTienda
      </div>

      <form onSubmit={handleSearch} className="flex-1 mx-8">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="w-full border border-emerald-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <div className="flex items-center gap-6">
        <button onClick={onCartClick} className="relative hover:text-emerald-600 transition">
          <HiOutlineShoppingCart className="w-10 h-8" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {totalQuantity}
            </span>
        </button>
        <button className="hover:text-emerald-600 transition">
          <HiOutlineUser className="w-10 h-8" />
        </button>
      </div>
    </nav>
  );
}
