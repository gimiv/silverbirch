import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Clock, Activity, Smartphone, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Scheduler from '../../components/Scheduler';
import ChatBot from '../../components/ChatBot';

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <span className="tabular-nums">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
    );
};

const IntegratedLandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#F4FAF6] font-sans text-gray-800">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <img
                        src="https://www.scalehealth.ca/assets/logo/scale-health_wordmark.svg"
                        alt="Scale Health"
                        className="h-8"
                    />
                    <a href="#schedule" className="hidden md:flex items-center gap-2 bg-[#51C580] text-white px-6 py-2.5 rounded-full font-bold hover:shadow-lg transition-all">
                        Schedule Now <ArrowRight size={18} />
                    </a>
                </div>
            </header>

            {/* Hero Section with Embedded Offer */}
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">

                        {/* Left: Value Prop */}
                        <div className="lg:w-1/2 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="inline-block px-4 py-1.5 rounded-full bg-[#51C580]/10 text-[#51C580] font-bold text-sm tracking-wide mb-4">
                                    DR. HO PARTNER EXCLUSIVE
                                </span>
                                <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight text-[#050806] mb-6">
                                    Hyper Scale Your <br />
                                    <span className="text-[#51C580]">Recovery Journey</span>
                                </h1>
                                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                                    Connect with world-class specialists tailored to your specific needs.
                                    Experience the future of digital health exactly when you need it most.
                                </p>
                            </motion.div>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <div className="w-8 h-8 rounded-full bg-[#51C580]/20 flex items-center justify-center text-[#51C580]">
                                        <CheckCircle size={16} />
                                    </div>
                                    <span>Insurance Covered</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <div className="w-8 h-8 rounded-full bg-[#51C580]/20 flex items-center justify-center text-[#51C580]">
                                        <CheckCircle size={16} />
                                    </div>
                                    <span>24/7 Access</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: The Offer Card (Embedded) */}
                        <div className="lg:w-1/2 w-full">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-w-md mx-auto"
                            >
                                {/* Offer Header Context */}
                                <div className="bg-slate-900 p-4 text-center">
                                    <p className="text-white/80 text-sm">Exclusive Offer for your</p>
                                    <p className="text-white font-bold text-lg">Dr. Ho Purchase</p>
                                </div>

                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-2 bg-red-50 border border-red-100 px-3 py-1.5 rounded-full">
                                            <Clock size={14} className="text-red-500" />
                                            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Expires in: <CountdownTimer /></span>
                                        </div>
                                        <span className="text-[#51C580] font-bold text-xl">-40%</span>
                                    </div>

                                    <div className="mb-6 relative h-48 rounded-2xl overflow-hidden group">
                                        <img
                                            src="https://images.unsplash.com/photo-1683848644075-82eb557b8623?w=800&auto=format&fit=crop&q=80"
                                            alt="Therapy Session"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                            <p className="text-white font-bold text-lg">Initial Assessment Session</p>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Priority Specialist Access</h3>
                                    <p className="text-gray-500 text-sm mb-6">
                                        Skip the waitlist. Get immediate access to a physiotherapist or chiropractor to accelerate your Dr. Ho product results.
                                    </p>

                                    <div className="flex items-end gap-3 mb-8">
                                        <span className="text-xl text-gray-400 line-through mb-1 font-medium">$150</span>
                                        <span className="text-5xl font-bold text-gray-900 tracking-tight">$90</span>
                                    </div>

                                    <a
                                        href="#schedule"
                                        className="block w-full text-center bg-[#51C580] text-white font-bold text-lg py-4 rounded-full hover:bg-[#46ad70] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        Claim Offer Now
                                    </a>
                                    <p className="text-center text-xs text-gray-400 mt-3">No commitment required. 100% Satisfaction Guarantee.</p>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Social Proof Bar */}
            <section className="bg-white py-10 border-y border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { label: "Active Patients", value: "10k+" },
                            { label: "Specialists", value: "500+" },
                            { label: "Success Rate", value: "98%" },
                            { label: "Insurance Covered", value: "100%" },
                        ].map((stat, i) => (
                            <div key={i}>
                                <p className="text-3xl font-bold text-[#51C580] font-display">{stat.value}</p>
                                <p className="text-sm text-gray-500 uppercase tracking-widest font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4 text-[#050806]">Why Choose Scale Health?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We combine advanced technology with human expertise to deliver optimal health outcomes.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Activity size={32} />,
                                title: "Personalized Plans",
                                desc: "AI-driven plans assessed by real doctors to fit your lifestyle."
                            },
                            {
                                icon: <Smartphone size={32} />,
                                title: "Digital Accessibility",
                                desc: "Chat, video call, or schedule visits all from one simple platform."
                            },
                            {
                                icon: <Users size={32} />,
                                title: "Expert Network",
                                desc: "Access to top-tier physiotherapists, cairopractors, and mental health experts."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                                <div className="w-14 h-14 bg-[#51C580]/10 rounded-2xl flex items-center justify-center text-[#51C580] mb-6 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-[#050806]">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Scheduler Section */}
            <section id="schedule" className="py-24 bg-white relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#F4FAF6] to-white h-24"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-12">
                        <span className="text-[#51C580] font-bold tracking-wider uppercase text-sm">Get Started</span>
                        <h2 className="text-4xl font-display font-bold text-[#050806] mt-2">Schedule Your Session</h2>
                    </div>
                    <Scheduler />
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#050806] text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center opacity-80">
                        <img
                            src="https://www.scalehealth.ca/assets/logo/scale-health_wordmark.svg"
                            alt="Scale Health"
                            className="h-8 brightness-0 invert mb-4 md:mb-0"
                        />
                        <p className="text-sm text-gray-400">&copy; 2026 Scale Health. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            <ChatBot />
        </div>
    );
};

export default IntegratedLandingPage;
