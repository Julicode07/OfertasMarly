import { useNavigate } from "react-router-dom";

export default function LogoutButton({ onLogout }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_AUTH_BACKEND_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
            });

            if (res.ok) {
                onLogout();
                navigate("/");
            } else {
                console.error("Error cerrando sesión");
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <button
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            onClick={handleLogout}
        >
            Cerrar Sesión
        </button>
    );
}