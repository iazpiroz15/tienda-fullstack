import { useState, useEffect } from "react";
import ProductList from "./pages/ProductList";
import TopNavbar from "./components/TopNavbar";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CategoryNavbar from "./components/CategoryNavbar";
import { checkAuth } from "./api/auth";
import {CartProvider} from "./context/CartContext.jsx";
import CartSidebar from "./components/CartSidebar";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategorySelect = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  }

 useEffect(() => {
    const verifyAuth = async () => {
      try {
        const data = await checkAuth();
        if (data.authenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Error comprobando autenticación:", err);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    verifyAuth();
  }, []);

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  if (loading) {
    return <div className="text-center mt-20 text-gray-600">Cargando...</div>;
  }
  return (
    <CartProvider>
    <Router>
      <div className="flex h-screen bg-gray-50 text-gray-900">
        <main className="flex-1 relative p-6 overflow-y-auto">
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/" element={isAuthenticated ? (
              <>
              <TopNavbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onCartClick={toggleCart} />
              <CartSidebar isOpen={isCartOpen} onClose={toggleCart} />
                <CategoryNavbar 
                onCategorySelect={handleCategorySelect}
                activeCategory={selectedCategory}
                />
                <ProductList searchTerm={searchTerm} selectedCategory={selectedCategory} />
                </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
          />
            
          
          </Routes>
        </main>
      </div>
    </Router>
    </CartProvider>
  );
}
