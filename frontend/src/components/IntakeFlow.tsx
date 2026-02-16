import React, { useState } from 'react';
import { MapPin, Monitor, Users, ArrowRight, ArrowLeft, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Scheduler from './Scheduler'; // Default import based on hypothesis, will confirm after view_file

// --- Types ---
type Step = 1 | 2 | 3;
type Preference = 'virtual' | 'in-person' | 'both';

// --- Mock Data (Expanded for Scrolling) ---
const THERAPISTS = [
    {
        id: '1',
        name: 'Sarah Chen, PT',
        type: 'Physiotherapist',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800', // Professional female in blazer/casual
        rating: 4.9,
        reviews: 124,
        badges: ['virtual', 'in-person'],
        blurb: "Specializes in sports injury recovery and post-operative rehabilitation. Sarah uses a mix of manual therapy and personalized exercise plans."
    },
    {
        id: '2',
        name: 'Michael Ross, DC',
        type: 'Chiropractor',
        image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800', // Male in polo/casual
        rating: 4.8,
        reviews: 89,
        badges: ['in-person'],
        blurb: "Expert in spinal health and chronic pain management. Michael focuses on restoring mobility and function through targeted adjustments."
    },
    {
        id: '3',
        name: 'Emma Wilson, RMT',
        type: 'Massage Therapist',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800', // Female professional
        rating: 5.0,
        reviews: 56,
        badges: ['virtual'],
        blurb: "Holistic approach to wellness combining mental health strategies with physical recovery. Perfect for stress-related tension."
    },
    {
        id: '4',
        name: 'David Kim, PT',
        type: 'Physiotherapist',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800', // Male professional
        rating: 4.9,
        reviews: 78,
        badges: ['virtual', 'in-person'],
        blurb: "Focuses on ergonomic health and workplace injury prevention. David helps you build resilience against daily strain."
    },
    {
        id: '5',
        name: 'Lisa Patel, ND',
        type: 'Naturopath',
        image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=800', // Female professional
        rating: 4.7,
        reviews: 42,
        badges: ['virtual'],
        blurb: "Lisa integrates natural therapies with modern science to support your body's innate healing ability."
    },
    {
        id: '6',
        name: 'James Wright, RMT',
        type: 'Massage Therapist',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800', // Male portrait
        rating: 4.8,
        reviews: 110,
        badges: ['in-person'],
        blurb: "Deep tissue specialist with a focus on athletic recovery and muscle release techniques."
    }
];

interface IntakeFlowProps {
    embedded?: boolean;
}

export const IntakeFlow: React.FC<IntakeFlowProps> = ({ embedded = false }) => {
    const [step, setStep] = useState<Step>(1);
    const [postalCode, setPostalCode] = useState('');
    const [preference, setPreference] = useState<Preference | null>(null);
    const [selectedTherapist, setSelectedTherapist] = useState<typeof THERAPISTS[0] | null>(null);

    const handleNext = () => setStep((prev) => (prev + 1) as Step);
    const handleBack = () => setStep((prev) => (prev - 1) as Step);

    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    const getScrollAmount = () => {
        const isDesktop = window.innerWidth >= 768; // Tailwind md breakpoint
        return isDesktop ? 424 : 324; // Card width + gap-6 (24px)
    };

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        }
    };

    // --- Step 1: Location & Preference ---
    const renderStep1 = () => (
        <div className="max-w-2xl mx-auto anime-fade-in">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-[#050806] mb-4">
                Find your specialist.
            </h2>
            <p className="text-center text-gray-500 mb-10 max-w-lg mx-auto">
                Enter your location and preference to get started.
            </p>

            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-gray-100">
                {/* Postal Code Input */}
                <div className="mb-8">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
                            placeholder="Postal Code (e.g. M5V 2H1)"
                            className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#51C580] focus:border-transparent outline-none transition-all uppercase font-bold tracking-wide text-lg"
                        />
                    </div>
                </div>

                {/* Preference Selection */}
                {/* Preference Selection */}
                <div className="mb-8">
                    <label className="block text-sm font-bold text-gray-700 mb-3">Care Preference</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                            onClick={() => setPreference('virtual')}
                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${preference === 'virtual'
                                ? 'border-[#51C580] bg-[#51C580]/5 text-[#51C580]'
                                : 'border-gray-100 hover:border-gray-200 text-gray-600'
                                }`}
                        >
                            <Monitor size={28} />
                            <span className="font-bold text-sm">Virtual Care</span>
                        </button>
                        <button
                            onClick={() => setPreference('in-person')}
                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${preference === 'in-person'
                                ? 'border-[#51C580] bg-[#51C580]/5 text-[#51C580]'
                                : 'border-gray-100 hover:border-gray-200 text-gray-600'
                                }`}
                        >
                            <Users size={28} />
                            <span className="font-bold text-sm">In-Person</span>
                        </button>
                        <button
                            onClick={() => setPreference('both')}
                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${preference === 'both'
                                ? 'border-[#51C580] bg-[#51C580]/5 text-[#51C580]'
                                : 'border-gray-100 hover:border-gray-200 text-gray-600'
                                }`}
                        >
                            <div className="flex">
                                <Monitor size={20} />
                                <span className="mx-1">/</span>
                                <Users size={20} />
                            </div>
                            <span className="font-bold text-sm">Either</span>
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleNext}
                    disabled={postalCode.length < 3 || !preference}
                    className="w-full bg-[#51C580] text-white font-bold py-4 rounded-full hover:bg-[#46ad70] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                    Find Therapists <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );

    // --- Step 2: Therapist Selection (Carousel) ---
    const renderStep2 = () => (
        <div className="w-full h-full flex flex-col anime-fade-in">
            {/* Top Row combined to clear space for Modal X */}
            <div className="mb-2 px-1">
                <button
                    onClick={handleBack}
                    className="flex items-center text-gray-500 hover:text-[#51C580] transition-colors text-sm font-bold"
                >
                    <ArrowLeft size={16} className="mr-1" /> Back
                </button>
            </div>

            <div className="flex items-end justify-between mb-6 md:mb-8 px-1">
                <div>
                    <h2 className="text-3xl font-display font-bold text-[#050806] leading-tight">
                        Best Matches
                    </h2>
                    <p className="text-gray-500 text-base mt-2">
                        {preference === 'virtual' ? 'Virtual' : 'In-Person'} specialists near {postalCode}
                    </p>
                </div>

                {/* Scroll Actions - Moved here to avoid overlap with Modal X */}
                <div className="flex gap-2 pb-1">
                    <button
                        onClick={scrollLeft}
                        className="w-10 h-10 bg-white rounded-full shadow border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#51C580] hover:border-[#51C580] transition-all"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={scrollRight}
                        className="w-10 h-10 bg-white rounded-full shadow border border-gray-100 flex items-center justify-center text-gray-600 hover:text-[#51C580] hover:border-[#51C580] transition-all"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            {/* Carousel Container */}
            <div className="relative group/carousel">
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide px-6 md:px-0"
                    style={{ scrollBehavior: 'smooth' }}
                >
                    {THERAPISTS.map((therapist) => (
                        <div
                            key={therapist.id}
                            className="min-w-[300px] w-[300px] md:min-w-[400px] md:w-[400px] bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex-shrink-0 snap-center md:snap-start hover:shadow-xl transition-all duration-300 group flex flex-col"
                        >
                            <div className="h-96 overflow-hidden relative">
                                <img
                                    src={therapist.image}
                                    alt={therapist.name}
                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                    {therapist.badges.map(badge => (
                                        <span key={badge} className="px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-wider text-[#050806] shadow-sm">
                                            {badge}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="text-xl font-bold text-[#050806] leading-tight">{therapist.name}</h3>
                                        <p className="text-[#51C580] font-medium text-xs uppercase tracking-wide mt-1">{therapist.type}</p>
                                    </div>
                                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                        <span className="text-xs font-bold text-yellow-700">{therapist.rating}</span>
                                    </div>
                                </div>

                                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {therapist.blurb}
                                </p>

                                <button
                                    onClick={() => { setSelectedTherapist(therapist); handleNext(); }}
                                    className="mt-auto w-full py-3 border-2 border-[#51C580] text-[#51C580] rounded-xl font-bold hover:bg-[#51C580] hover:text-white transition-all text-sm"
                                >
                                    Select Specialist
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // --- Step 3: Booking (Scheduler) ---
    const renderStep3 = () => (
        <div className="anime-fade-in w-full">
            <button onClick={handleBack} className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors px-4 lg:px-0 font-bold">
                <ArrowLeft size={16} className="mr-1" /> Back to specialists
            </button>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <Scheduler therapist={selectedTherapist!} />
            </div>
        </div>
    );

    const content = (
        <>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
        </>
    );

    if (embedded) {
        return <div id="intake-flow" className="w-full">{content}</div>;
    }

    return (
        <section id="intake-flow" className="py-12 md:py-20 bg-[#F4FAF6]">
            <div className="container mx-auto px-4">
                {content}
            </div>
        </section>
    );
};
