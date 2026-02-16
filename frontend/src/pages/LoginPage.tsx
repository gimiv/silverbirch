import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (password === 'sbg123') {
            // Set auth token/flag in storage
            sessionStorage.setItem('isAuthenticated', 'true');
            // Redirect to original destination
            navigate(from, { replace: true });
        } else {
            setError('Incorrect password. Please try again.');
            setPassword('');
        }
    };

    return (
        <div className="min-h-screen bg-[#F4FAF6] flex items-center justify-center p-4 font-sans">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-xl w-full max-w-sm overflow-hidden border border-gray-100"
            >
                <div className="bg-[#050806] p-8 text-center">
                    <img
                        src="https://www.scalehealth.ca/assets/logo/scale-health_wordmark.svg"
                        alt="Scale Health"
                        className="h-8 mx-auto brightness-0 invert"
                    />
                </div>

                <div className="p-8">
                    <h2 className="text-xl font-bold text-center mb-6 text-gray-800">Client Access</h2>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError('');
                                    }}
                                    placeholder="Enter access code"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#51C580] focus:border-transparent outline-none transition-all"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg animate-fade-in">
                                <AlertCircle size={14} />
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-[#51C580] text-white font-bold py-3 rounded-xl hover:bg-[#46ad70] transition-colors flex items-center justify-center gap-2"
                        >
                            Enter Portal <ArrowRight size={18} />
                        </button>
                    </form>

                    <p className="text-center text-xs text-gray-400 mt-6">
                        Protected Access &copy; 2026 Scale Health
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
