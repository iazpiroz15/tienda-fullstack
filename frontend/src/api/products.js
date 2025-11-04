//const API_BASE = import.meta.env.VITE_API_URL | "http://localhost:5000";
const API_BASE = "http://localhost:5000";


function buildQuery(filters = {}) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(filters)) {
    if (v !== undefined && v !== null && v !== "") {
      params.append(k, String(v));
    }
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export async function getProducts (filters = {}) {
    const url = `${API_BASE}/api/products${buildQuery(filters)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Error al obtener productos: ${res.status}');
    return res.json();
};

export async function getProductById (id) {
    const res = await fetch('${API_BASE}/api/products/${id}');
    if (!res.ok) throw new Error('Error ${res.status}');
    return res.json();
}