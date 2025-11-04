import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { Eye, EyeOff } from "lucide-react"
import logo from "../assets/shop-logo-banner.png";

export default function Login({ setIsAuthenticated }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await login(email, password);
            setIsAuthenticated(true);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    }

 return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center mb-0 transform -translate-y-24"> 
            <img 
                src={logo} 
                alt="Logo" 
                className="mx-auto mb-6 w-96 h-80 object-contain" 
            />

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-md w-96 -translate-y-24"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Iniciar Sesión
                </h2>

                {error && (
                    <p className="text-red-500 text-center text-sm mb-4">{error}</p>
                )}

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Contraseña
                    </label>
                    <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Introduce tu contraseña"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-2 text-gray-500"
                    >
                        {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                    </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                    Entrar
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    ¿No tienes cuenta?{" "}
                    <a href="/register" className="text-cyan-600 font-semibold hover:underline">
                        Regístrate
                    </a>
                </p>
            </form>
            </div>
        </div>
    );

}