import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, Activity, ShieldCheck } from 'lucide-react';
import Layout from '../../components/Layout';
import OnboardingFlow from './OnboardingFlow';

const LandingPage: React.FC = () => {
    const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-[#0A0F1E]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0A0F1E] to-[#0A0F1E]/95 pointer-events-none z-0"></div>
                <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none z-0"></div>

                <div className="container mx-auto px-4 z-10 relative">
                    <div className="flex flex-col lg:flex-row items-center gap-12">

                        {/* LEFT: Copy & CTA */}
                        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
                            <motion.div
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="inline-block px-4 py-1.5 rounded-full bg-[#00A852]/20 text-[#00D46A] font-bold text-sm tracking-wide mb-6 uppercase border border-[#00D46A]/20">
                                    For Providers & Clinics
                                </span>
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight text-white mb-6">
                                    Grow Your Practice <br className="hidden md:block" />
                                    with <span className="text-[#00A852]">Scale Health</span>
                                </h1>
                                <p className="text-xl text-gray-300 font-sans leading-relaxed max-w-xl mx-auto lg:mx-0">
                                    Join our network of elite wellness partners. Gain access to millions of high-intent customers and preferred tier brand benefits.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
                            >
                                <button
                                    onClick={() => setIsOnboardingOpen(true)}
                                    className="w-full sm:w-auto px-8 py-4 rounded-full font-bold bg-[#00D46A] text-white hover:bg-[#00A852] transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,212,106,0.3)] hover:shadow-[0_0_30px_rgba(0,212,106,0.5)] transform hover:-translate-y-1 duration-300"
                                >
                                    Onboard in 5 Minutes <ArrowRight size={18} />
                                </button>
                                <p className="text-gray-400 font-medium text-sm">No upfront costs. Cancel anytime.</p>
                            </motion.div>
                        </div>

                        {/* RIGHT: Value Props Grid */}
                        <div className="w-full lg:w-1/2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                                {/* Decorative elements */}
                                <div className="absolute -inset-10 bg-gradient-to-r from-[#00D46A]/20 to-transparent blur-3xl opacity-30 rounded-full pointer-events-none"></div>

                                {[
                                    { icon: Users, title: "Millions of Customers", desc: "Instantly connect with patients actively seeking your exact specialties." },
                                    { icon: Activity, title: "Zero Upfront Fees", desc: "Completely free to onboard. You only pay when you acquire a new client." },
                                    { icon: CheckCircle, title: "Preferred Status", desc: "Featured at the top of our local discovery map for maximum visibility." },
                                    { icon: ShieldCheck, title: "Guaranteed Payments", desc: "We securely collect funds upfront and transfer them directly post-service." }
                                ].map((prop, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + (idx * 0.1) }}
                                        className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-[#00D46A]/50 transition-colors"
                                    >
                                        <div className="w-12 h-12 bg-[#00D46A]/20 rounded-xl flex items-center justify-center text-[#00D46A] mb-4">
                                            <prop.icon size={24} />
                                        </div>
                                        <h3 className="font-bold text-white text-lg mb-2">{prop.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{prop.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Exclusive Brand Partners Section */}
            <section className="py-20 bg-white border-y border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Unlock Exclusive Brand Perks for Your Team</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-12">
                        As a Preferred Partner, you and your staff gain access to wholesale pricing and exclusive promotions from our premium wellness ecosystem.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 pb-8">
                        <img src="/logos/WHOOP.svg" alt="WHOOP" className="h-10 md:h-12 object-contain" />
                        <img src="/logos/AG1svg.svg" alt="AG1" className="h-10 md:h-12 object-contain" />
                        <img src="/logos/Lululemon.svg" alt="Lululemon" className="h-10 md:h-12 object-contain" />
                    </div>
                </div>
            </section>

            <OnboardingFlow
                isOpen={isOnboardingOpen}
                onClose={() => setIsOnboardingOpen(false)}
            />

        </Layout>
    );
};

export default LandingPage;
