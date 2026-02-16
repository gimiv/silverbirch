import React from 'react';
import Layout from '../../components/Layout';
import Scheduler from '../../components/Scheduler';
import ChatBot from '../../components/ChatBot';
import { ArrowDown, CheckCircle, Smartphone, Activity, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
    return (
        <Layout>
            {/* Hero Section */}
            <section className="relative bg-brand-dark text-white py-20 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    {/* Abstract Background pattern */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-primary to-transparent"></div>
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-accent rounded-full blur-3xl opacity-30"></div>
                </div>

                <div className="container mx-auto px-4 z-10 relative">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-4 text-white">
                                Hyper Scale Your <br />
                                <span className="text-brand-accent">Recovery Journey</span>
                            </h1>
                            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                                Connect with world-class specialists tailored to your specific needs.
                                Experience the future of digital health with Scale Health.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="flex justify-center gap-4 pt-4"
                        >
                            <a href="#schedule" className="btn-primary bg-brand-accent hover:bg-white hover:text-brand-dark border-none">
                                Start Recovery Now
                            </a>
                            <button className="px-6 py-3 rounded-lg border border-white/30 hover:bg-white/10 transition-colors">
                                Learn More
                            </button>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <ArrowDown className="text-white/50" />
                </div>
            </section>

            {/* Stats/Social Proof */}
            <section className="py-10 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { label: "Active Patients", value: "10k+" },
                            { label: "Specialists", value: "500+" },
                            { label: "Success Rate", value: "98%" },
                            { label: "Insurance Covered", value: "100%" },
                        ].map((stat, i) => (
                            <div key={i}>
                                <p className="text-3xl font-bold text-brand-primary font-display">{stat.value}</p>
                                <p className="text-sm text-gray-500 uppercase tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-brand-secondary/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why Choose Scale Health?</h2>
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
                            <div key={i} className="card hover:border-brand-primary/50 transition-colors group">
                                <div className="w-14 h-14 bg-brand-secondary rounded-xl flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recommended Products Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-brand-accent font-bold tracking-wider uppercase text-sm">Integrate Your Recovery</span>
                        <h2 className="text-3xl font-display font-bold text-gray-900 mt-2">Therapist Recommended Products</h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Maximize your recovery results by pairing your therapy with these professional-grade devices from Dr. Ho.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Pain Therapy System Pro",
                                price: "$199.99",
                                image: "/assets/pain.webp",
                                tag: "Best Seller"
                            },
                            {
                                name: "Neck Pain Pro",
                                price: "$129.99",
                                image: "/assets/neck.webp",
                                tag: "Therapist Pick"
                            },
                            {
                                name: "Triple Action Back Belt",
                                price: "$159.00",
                                image: "/assets/belt.webp",
                                tag: "New Arrival"
                            }
                        ].map((product, i) => (
                            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group">
                                <div className="h-64 overflow-hidden bg-gray-100 relative">
                                    <span className="absolute top-4 left-4 bg-brand-dark text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                                        {product.tag}
                                    </span>
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6">
                                    <h4 className="font-bold text-lg text-gray-900 mb-1">{product.name}</h4>
                                    <p className="text-brand-primary font-bold">{product.price}</p>
                                    <button className="w-full mt-4 py-2 border border-brand-primary text-brand-primary rounded-lg hover:bg-brand-primary hover:text-white transition-colors font-medium text-sm">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Scheduling Section */}
            <section id="schedule" className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
                        <div className="md:w-1/2">
                            <span className="text-brand-accent font-bold tracking-wider uppercase text-sm">Getting Started</span>
                            <h2 className="text-4xl font-display font-bold mb-4 mt-2">
                                Schedule Your Priority Session
                            </h2>
                            <p className="text-lg text-gray-600 mb-6">
                                Use the calendar to choose a time that works for you. Your session includes:
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "Assessment of current condition",
                                    "Review of medical history",
                                    "Personalized recovery recommendations",
                                    "Q&A with a specialist"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-700">
                                        <CheckCircle size={20} className="text-brand-primary" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* The Scheduler Component */}
                        <div className="w-full">
                            <Scheduler />
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Chat Bot */}
            <ChatBot />

        </Layout>
    );
};

export default LandingPage;
