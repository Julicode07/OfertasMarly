// RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Loader from "./components/Loader/Loader";

export const RequireAuth = ({ children }) => {
    const { authed, loading } = useAuth();
    const location = useLocation();

    if (loading) return <Loader bg="bg-zinc-950" text="text-zinc-900" fill="fill-zinc-400" />;
    if (!authed) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    return children;
};
