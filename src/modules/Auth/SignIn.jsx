// SignIn.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../AuthProvider';

export default function SignIn() {
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div>
            <form onSubmit={handleSignIn} className="space-y-5">
                <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black/40"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </motion.div>

                <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black/40"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <motion.button
                            type="button"
                            aria-label="toggle password visibility"
                            initial={false}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.3 }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer w-6 h-6 flex items-center justify-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            <motion.span
                                key={showPassword ? 'eye-off' : 'eye'}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </motion.span>
                        </motion.button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.2 }}
                >
                    <button
                        type="submit"
                        className="w-full h-12 bg-black text-white rounded-md hover:bg-black/90 cursor-pointer transition-colors"
                    >
                        Sign In
                    </button>
                </motion.div>
            </form>
        </div>
    );
}
