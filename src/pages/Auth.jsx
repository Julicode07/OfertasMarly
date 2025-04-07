import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import "../index.css";
import React, { Suspense, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const SignIn = React.lazy(() => import("../modules/Auth/SignIn"));

function AuthForm() {
    const { authed, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (!loading && authed) {
            setShowModal(true);

            const timeout = setTimeout(() => {
                navigate(from, { replace: true });
            }, 5500); // 5.5 segundos

            return () => clearTimeout(timeout);
        }
    }, [authed, loading, navigate, from]);

    return (
        <div className="flex min-h-screen justify-center items-center bg-black/10 relative">
            <LayoutGroup>
                <motion.div
                    layout
                    className="bg-white h-full flex w-full flex-col justify-center p-8 max-w-xl rounded-2xl z-10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.5 }}
                >
                    <motion.div layout className="mx-auto">
                        <motion.div layout className="mb-8">
                            <motion.h1 layout className="text-4xl font-black tracking-tight text-black">
                                Welcome Back
                            </motion.h1>
                            <motion.p className="text-base font-medium">
                                Sign in to your account to continue
                            </motion.p>
                        </motion.div>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key="signin"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.5 }}
                        >
                            <Suspense fallback={<div className="text-center">Loading...</div>}>
                                <SignIn />
                            </Suspense>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </LayoutGroup>

            {/* Modal si ya está logueado */}
            <AnimatePresence>
                {showModal && (
                    <>
                        {/* Fondo con opacidad */}
                        <motion.div
                            className="fixed inset-0 bg-black/40 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        />

                        {/* Contenido del modal */}
                        <motion.div
                            className="fixed inset-0 flex items-center justify-center z-50"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
                                <h2 className="text-xl font-bold mb-2">¡Ya has iniciado sesión!</h2>
                                <p className="text-gray-600">Serás redirigido automáticamente...</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

export default AuthForm;
