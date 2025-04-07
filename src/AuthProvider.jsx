// AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authed, setAuthed] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    // Verifica la autenticación al montar el componente
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_AUTH_BACKEND_URL}/api/auth/check-auth`, {
                    credentials: 'include',
                });
                const data = await res.json();
                if (res.ok && data.success) {
                    setAuthed(true);
                } else {
                    setAuthed(false);
                }
            } catch (error) {
                console.error("Error checking auth:", error);
                setAuthed(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_AUTH_BACKEND_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }

            setAuthed(true);

            // Redirige solo si es necesario
            const from = location.state?.from?.pathname || "/";
            if (location.pathname !== from) {
                navigate(from, { replace: true });
            }

        } catch (error) {
            alert(error.message);
        }
    };

    const logout = () => {
        setAuthed(false);
        navigate('/auth');
    };

    return (
        <AuthContext.Provider value={{ authed, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
