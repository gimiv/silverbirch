import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MessageSquare, Phone, Star, ShieldCheck, Clock } from 'lucide-react';
import InsiderScheduler from './InsiderScheduler';
import Layout from '../../components/Layout';

// Mock Data for Hero Carousel
const HERO_THERAPISTS = [
    {
        id: 1,
        name: "Dr. Sarah Chen",
        role: "Head of Physiotherapy",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200",
        quote: "Real care means listening first."
    },
    {
        id: 2,
        name: "Michael Ross",
        role: "Chiropractor",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=1200",
        quote: "Getting you back to 100%."
    },
    {
        id: 3,
        name: "Emma Wilson",
        role: "Manual Therapist",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200",
        quote: "Wellness is a journey, not a destination."
    }
];

const InsiderLandingPage: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_THERAPISTS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const scrollToScheduler = () => {
        const el = document.getElementById('scheduler');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Layout>
            {/* --- Hero Section: Dynamic Carousel --- */}
            <div className="relative h-[600px] w-full overflow-hidden bg-[#050806]">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0"
                    >
                        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050806] via-transparent to-transparent z-10" />
                        <img
                            src={HERO_THERAPISTS[currentSlide].image}
                            alt={HERO_THERAPISTS[currentSlide].name}
                            className="w-full h-full object-cover object-top"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Hero Content */}
                <div className="absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-end pb-20">
                    <div className="max-w-3xl">
                        <span className="inline-block px-3 py-1 bg-[#51C580] text-white rounded-full text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(81,197,128,0.4)]">
                            Private Network Access
                        </span>
                        <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4 leading-tight">
                            " {HERO_THERAPISTS[currentSlide].quote} "
                        </h1>
                        <div className="flex items-center gap-4 text-white/80 mb-10">
                            <img
                                src={HERO_THERAPISTS[currentSlide].image}
                                className="w-12 h-12 rounded-full border-2 border-[#51C580] object-cover"
                                alt="Avatar"
                            />
                            <div>
                                <p className="font-bold text-white text-lg">{HERO_THERAPISTS[currentSlide].name}</p>
                                <p className="text-sm text-[#51C580] uppercase tracking-wider">{HERO_THERAPISTS[currentSlide].role}</p>
                            </div>
                        </div>

                        {/* CTA Cluster */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={scrollToScheduler}
                                className="bg-[#51C580] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#46ad70] transition-all shadow-lg hover:shadow-[#51C580]/20 flex items-center justify-center gap-2"
                            >
                                <Clock size={20} /> Book First Available
                            </button>
                            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                                <MessageSquare size={20} /> Talk to Concierge
                            </button>
                        </div>
                    </div>
                </div>

                {/* Carousel Pagination Dots */}
                <div className="absolute bottom-8 right-8 z-30 flex gap-2">
                    {HERO_THERAPISTS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentSlide ? 'bg-[#51C580] w-8' : 'bg-white/30 hover:bg-white/60'}`}
                        />
                    ))}
                </div>
            </div>

            {/* --- Trust Bar --- */}
            <div className="bg-[#050806] border-t border-white/5 py-8">
                <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 text-white/50 font-medium text-sm uppercase tracking-widest">
                    <span className="flex items-center gap-2"><ShieldCheck size={18} className="text-[#51C580]" /> Verified Specialists</span>
                    <span className="flex items-center gap-2"><Star size={18} className="text-[#51C580]" /> 4.9/5 Avg Rating</span>
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#51C580] animate-pulse" /> Live Availability</span>
                </div>
            </div>

            {/* --- Scheduler Section --- */}
            <section id="scheduler" className="py-24 bg-[#F4FAF6]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-display font-bold text-[#050806] mb-4">Securing Your Spot</h2>
                        <p className="text-gray-500 max-w-xl mx-auto">
                            Our network is currently accepting new patients in your area. Select your preferred specialist or choose the earliest available time.
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <InsiderScheduler />
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default InsiderLandingPage;
