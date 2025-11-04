import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import ProductCard from "../components/ProductCard";
import CategoryNavbar from "../components/CategoryNavbar";

export default function ProductList({ searchTerm, selectedCategory }) {
  const [products, setProducts] = useState([]);
 
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts({ query: searchTerm, category: selectedCategory });
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchProducts();
  }, [searchTerm, selectedCategory]);


  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} name={p.name} image={p.image} />
        ))}
      </div>
    </div>
  );
}