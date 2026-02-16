import React, { useState, useEffect } from 'react';
import { X, Gift, ArrowRight, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EmailCaptureModal: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasSeen, setHasSeen] = useState(false);
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'success'>('idle');

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasSeen && status !== 'success') {
                setIsVisible(true);
                setHasSeen(true);
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [hasSeen, status]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock submission
        setTimeout(() => setStatus('success'), 1000);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsVisible(false)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
                        >
                            <X size={24} />
                        </button>

                        <div className="flex flex-col md:flex-row">
                            {/* Image Side */}
                            <div className="hidden md:block w-1/3 bg-[#050806] relative">
                                <img
                                    src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=600"
                                    alt="Wellness"
                                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050806] to-transparent" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <Gift size={32} className="text-[#51C580] mb-2" />
                                    <p className="font-bold text-lg leading-tight">Insider<br />Perks</p>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="p-8 md:w-2/3">
                                {status === 'idle' ? (
                                    <>
                                        <span className="inline-block px-2 py-0.5 bg-brand-secondary/30 text-brand-primary rounded text-xs font-bold uppercase tracking-wider mb-3">
                                            Wait! Don't Miss Out
                                        </span>
                                        <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
                                            Unlock Insider Savings
                                        </h3>
                                        <p className="text-gray-500 text-sm mb-6">
                                            Join the list to get priority booking access and enter our monthly wellness sweepstakes.
                                        </p>

                                        <form onSubmit={handleSubmit} className="space-y-3">
                                            <input
                                                type="email"
                                                required
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#51C580] focus:border-transparent outline-none transition-all"
                                            />
                                            <button
                                                type="submit"
                                                className="w-full bg-[#050806] text-white py-3 rounded-xl font-bold hover:bg-black transition-colors flex items-center justify-center gap-2"
                                            >
                                                Join the Club <ArrowRight size={18} />
                                            </button>
                                        </form>
                                        <p className="text-xs text-gray-400 mt-4 text-center">
                                            No spam. Unsubscribe anytime.
                                        </p>
                                    </>
                                ) : (
                                    <div className="text-center py-8 animate-fade-in">
                                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle size={32} />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">You're In!</h3>
                                        <p className="text-gray-500 text-sm">
                                            Check your inbox for your exclusive insider welcome package.
                                        </p>
                                        <button
                                            onClick={() => setIsVisible(false)}
                                            className="mt-6 text-[#51C580] font-bold text-sm hover:underline"
                                        >
                                            Return to Booking
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default EmailCaptureModal;
