// src/components/CategoryNavbar.jsx
const categories = ["Ofertas", "Zapatillas", "Ropa", "Accesorios"];

export default function CategoryNavbar() {
  return (
    <div className="bg-amber-100 ">
      <div className="flex justify-center gap-6 py-3">
        {categories.map((cat) => (
          <button
            key={cat}
            className="text-gray-700 font-medium hover:text-emerald-600 transition"
            onClick={() => console.log("Filtrar por:", cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
