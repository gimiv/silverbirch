import React from 'react';
import Layout from '../../components/Layout';
import ChatBot from '../../components/ChatBot';
import { IntakeFlow } from '../../components/IntakeFlow';
import { CheckCircle, Smartphone, Activity, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage: React.FC = () => {
    return (
        <Layout>
            {/* Header Override (since Layout might have default) - We can just rely on the content here or if Layout helps, we use it. 
                For this specific page, let's assume Layout provides the shell but we want to ensure the header inside Layout matches.
                Actually, the Layout component wasn't shown to have a logo prop, let's assume it's generic.
                We'll inject a custom header here if needed, or if Layout is simple enough.
                Looking at previous files, Layout.tsx seemed simple. Let's just build the page content.
            */}

            {/* Hero Section */}
            <section className="relative bg-[#F4FAF6] pt-32 pb-20 overflow-hidden">
                <div className="container mx-auto px-4 z-10 relative">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="inline-block px-4 py-1.5 rounded-full bg-[#51C580]/10 text-[#51C580] font-bold text-sm tracking-wide mb-6">
                                    OFFICIAL DR. HO PARTNER
                                </span>
                                <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight text-[#050806] mb-6">
                                    Hyper Scale Your <br />
                                    <span className="text-[#51C580]">Recovery Journey</span>
                                </h1>
                                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                                    Connect with world-class specialists tailored to your specific needs.
                                    Experience the future of digital health with Scale Health.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="flex flex-wrap gap-4"
                            >
                                <a href="#intake-flow" className="bg-[#51C580] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-[#46ad70] transition-all transform hover:-translate-y-1 flex items-center gap-2">
                                    Start Recovery Now <ArrowRight size={18} />
                                </a>
                                <button className="px-8 py-4 rounded-full border-2 border-[#95E9B7] text-[#050806] font-bold hover:bg-[#95E9B7]/10 transition-colors">
                                    Learn More
                                </button>
                            </motion.div>

                            <div className="flex items-center gap-6 pt-4 text-sm text-gray-500 font-medium">
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={18} className="text-[#51C580]" />
                                    <span>Insurance Covered</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={18} className="text-[#51C580]" />
                                    <span>24/7 Access</span>
                                </div>
                            </div>
                        </div>

                        <div className="md:w-1/2 relative">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
                                <img
                                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80"
                                    alt="Medical Professional"
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-50 hidden md:block">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#51C580]/10 rounded-full flex items-center justify-center text-[#51C580]">
                                        <Activity size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Success Rate</p>
                                        <p className="text-2xl font-bold text-[#050806]">98%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats/Social Proof */}
            <section className="py-12 bg-white border-y border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { label: "Active Patients", value: "10k+" },
                            { label: "Specialists", value: "500+" },
                            { label: "Success Rate", value: "98%" },
                            { label: "Insurance Covered", value: "100%" },
                        ].map((stat, i) => (
                            <div key={i}>
                                <p className="text-4xl font-bold text-[#51C580] font-display mb-1">{stat.value}</p>
                                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-[#F4FAF6]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#51C580] font-bold tracking-wider uppercase text-sm">Our Approach</span>
                        <h2 className="text-4xl font-bold mb-4 text-[#050806] mt-2">Why Choose Scale Health?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
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
                                <div className="w-16 h-16 bg-[#F4FAF6] rounded-2xl flex items-center justify-center text-[#51C580] mb-6 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-[#050806]">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recommended Products Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-[#51C580] font-bold tracking-wider uppercase text-sm">Integrate Your Recovery</span>
                        <h2 className="text-4xl font-display font-bold text-[#050806] mt-2">Recommended Products</h2>
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
                            <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
                                <div className="h-72 overflow-hidden bg-gray-50 relative p-8 flex items-center justify-center">
                                    <span className="absolute top-4 left-4 bg-[#050806] text-white text-xs font-bold px-3 py-1.5 rounded-full z-10">
                                        {product.tag}
                                    </span>
                                    <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="p-8">
                                    <h4 className="font-bold text-xl text-[#050806] mb-2">{product.name}</h4>
                                    <p className="text-[#51C580] font-bold text-lg mb-6">{product.price}</p>
                                    <button className="w-full py-3 border-2 border-[#51C580] text-[#51C580] rounded-full hover:bg-[#51C580] hover:text-white transition-colors font-bold text-sm">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Scheduling Section */}
            <section id="schedule" className="py-24 bg-[#F4FAF6] relative">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <span className="text-[#51C580] font-bold tracking-wider uppercase text-sm">Getting Started</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 mt-3 text-[#050806]">
                                Schedule Your <br className="hidden md:block" />Priority Session
                            </h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                                Use the calendar to choose a time that works for you. Your session includes a comprehensive assessment and personalized plan.
                            </p>

                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 inline-block text-left w-full">
                                <ul className="grid md:grid-cols-2 gap-6">
                                    {[
                                        "Assessment of current condition",
                                        "Review of medical history",
                                        "Personalized recovery recommendations",
                                        "Q&A with a specialist"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-gray-700 font-medium">
                                            <div className="w-8 h-8 rounded-full bg-[#51C580]/20 flex items-center justify-center text-[#51C580] flex-shrink-0">
                                                <CheckCircle size={16} />
                                            </div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* The Intake Flow (Full Width) */}
                        <div className="w-full">
                            <IntakeFlow embedded={true} />
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
