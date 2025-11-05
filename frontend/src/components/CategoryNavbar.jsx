// src/components/CategoryNavbar.jsx
const categories = ["Todos", "Ofertas", "Zapatillas", "Ropa", "Accesorios"];

const getCategoryValue = (catName) => {
  return catName === "Todos" ? '' : catName;
};

export default function CategoryNavbar({ onCategorySelect, activeCategory }) {
  return (
   <div className="bg-amber-100 ">
      <div className="flex justify-center gap-6 py-3">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`font-medium transition 
                        ${activeCategory === getCategoryValue(cat)
                            ? 'text-emerald-600 border-b-2 border-emerald-600' 
                            : 'text-gray-700 hover:text-emerald-600'
                        }`}
            onClick={() => onCategorySelect(getCategoryValue(cat))} 
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
