import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import "../index.css";
import React, { Suspense } from "react";

const SignIn = React.lazy(() => import("../modules/Auth/SignIn"));

function AuthForm() {
    return (
        <div className="flex min-h-screen justify-center items-center bg-black/10">
            <LayoutGroup>
                <motion.div
                    layout
                    className="bg-white h-full flex w-full flex-col justify-center p-8 max-w-xl rounded-2xl"
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
        </div>
    );
}

export default AuthForm;
