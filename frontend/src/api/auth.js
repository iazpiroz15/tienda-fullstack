const API_URL = "http://localhost:5000";

export async function login(email, password) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Error en el login");
  }

  return res.json();
}

export async function checkAuth() {
  const res = await fetch(`${API_URL}/api/auth/check`, {
    credentials: "include",
  });

  if (!res.ok) {
    return { authenticated: false };
  }

  return res.json(); 
}

export async function logout() {
  const res = await fetch(`${API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  
  if (!res.ok) {
    throw new Error("Error al cerrar sesión");
  }

  return res.json();
}
