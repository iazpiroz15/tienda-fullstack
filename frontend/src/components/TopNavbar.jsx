// src/components/TopNavbar.jsx
import { HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";
import { getProducts } from "../api/products";
import { useCart } from "../context/CartContext.jsx";
import { logout } from "../api/auth.js";
import { useNavigate } from "react-router-dom";
import logo from "../assets/shop-logo-banner.png";

export default function TopNavbar({ searchTerm, setSearchTerm, onCartClick }) {
  const [products, setProducts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { totalQuantity } = useCart();
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Sesión cerrada. Cookie eliminada.");

      setIsDropdownOpen(false);

      navigate("/login");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };




  return (
    <nav className="flex items-center justify-between px-8 h-40 bg-white shadow">
      <div className="flex-shrink-0">
         <img src={logo} alt="Logo" className="h-60 object-contain cursor-pointer" />
      </div>

      <form onSubmit={handleSearch} className="flex-1 mr-12 ml-8">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="w-full border border-emerald-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      <div className="flex items-center gap-6 -ml-6">
        <button onClick={onCartClick} className="relative hover:text-emerald-600 transition">
          <HiOutlineShoppingCart className="w-12 h-12" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
            {totalQuantity}
          </span>
        </button>

        <div className="relative" ref={dropdownRef}>
          <button
            className="hover:text-emerald-600 transition p-1 rounded-full border border-transparent hover:border-emerald-600"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} // <--- ABRIR/CERRAR DROPDOWN
          >
            <HiOutlineUser className="w-12 h-12" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border border-gray-100">
              <button
                onClick={handleLogout} // <--- LLAMADA A LA FUNCIÓN DE LOGOUT
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
