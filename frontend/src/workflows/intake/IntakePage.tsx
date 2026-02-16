import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Monitor, Users, Building, Activity, CheckCircle, ArrowLeft } from 'lucide-react';
import IntakeLayout from './IntakeLayout';

type Step = 1 | 2 | 3;
type Preference = 'virtual' | 'in-person' | null;

const IntakePage: React.FC = () => {
    const [step, setStep] = useState<Step>(1);
    const [postalCode, setPostalCode] = useState('');
    const [preference, setPreference] = useState<Preference>(null);
    const handleNext = () => {
        setStep((prev) => (prev + 1) as Step);
    };

    const handleBack = () => {
        setStep((prev) => (prev - 1) as Step);
    };

    // --- Step 1: Location ---
    const renderStep1 = () => (
        <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-display font-bold text-center text-[#050806] mb-4">
                Let's find the best care near you.
            </h1>
            <p className="text-center text-gray-500 mb-8">
                Enter your postal code to see available specialists and clinics in your area.
            </p>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <label className="block text-sm font-bold text-gray-700 mb-2">Postal Code</label>
                <div className="relative mb-6">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
                        placeholder="e.g. M5V 2H1"
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#51C580] focus:border-transparent outline-none transition-all uppercase font-medium tracking-wide"
                        autoFocus
                    />
                </div>
                <button
                    onClick={handleNext}
                    disabled={postalCode.length < 3}
                    className="w-full bg-[#51C580] text-white font-bold py-3.5 rounded-full hover:bg-[#46ad70] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    Continue <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );

    // --- Step 2: Preference ---
    const renderStep2 = () => (
        <div className="max-w-2xl mx-auto">
            <button onClick={handleBack} className="flex items-center text-gray-400 hover:text-gray-600 mb-6 transition-colors">
                <ArrowLeft size={16} className="mr-1" /> Back
            </button>

            <h1 className="text-3xl font-display font-bold text-center text-[#050806] mb-4">
                How do you prefer to receive care?
            </h1>
            <p className="text-center text-gray-500 mb-8">
                We'll match you with the right program based on your lifestyle.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Virtual Card */}
                <button
                    onClick={() => { setPreference('virtual'); handleNext(); }}
                    className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-[#51C580] hover:shadow-md transition-all text-left relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#51C580]">
                        <CheckCircle size={24} />
                    </div>
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                        <Monitor size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Virtual Care</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Video calls with specialists from the comfort of your home. Best for convenience and consistent follow-ups.
                    </p>
                </button>

                {/* In-Person Card */}
                <button
                    onClick={() => { setPreference('in-person'); handleNext(); }}
                    className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-[#51C580] hover:shadow-md transition-all text-left relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#51C580]">
                        <CheckCircle size={24} />
                    </div>
                    <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                        <Users size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">In-Person Care</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Hands-on treatment at a local clinic. Best for manual therapy and equipment-based rehabilitation.
                    </p>
                </button>
            </div>
        </div>
    );

    // --- Step 3: Recommendations (The Core Logic) ---
    const renderStep3 = () => {
        // Recommendations data
        const options = [
            {
                id: 'virtual',
                title: 'Fully Virtual',
                badge: 'Align Owned',
                icon: <Monitor className="text-white" size={24} />,
                color: 'bg-blue-500',
                features: ['Immediate Assessment', 'Exercise Programming', 'Product Guidance'],
                cta: 'Start Virtual Care',
                isRecommended: preference === 'virtual'
            },
            {
                id: 'hybrid',
                title: 'Hybrid Model',
                badge: 'Partner Network',
                icon: <Activity className="text-white" size={24} />,
                color: 'bg-[#51C580]',
                features: ['Virtual Intake', 'In-Person Treatment', 'Partner Clinics'],
                cta: 'Book Hybrid Visit',
                isRecommended: preference === 'in-person'
            },
            {
                id: 'marketplace',
                title: 'Marketplace',
                badge: 'Community',
                icon: <Building className="text-white" size={24} />,
                color: 'bg-indigo-500',
                features: ['Local Gyms', 'Pilates Studios', 'Wellness Centers'],
                cta: 'Browse Marketplace',
                isRecommended: false
            }
        ];

        // Sort to put recommended first
        const sortedOptions = [...options].sort((a, b) => (b.isRecommended ? 1 : 0) - (a.isRecommended ? 1 : 0));

        return (
            <div className="max-w-5xl mx-auto">
                <button onClick={handleBack} className="flex items-center text-gray-400 hover:text-gray-600 mb-6 transition-colors">
                    <ArrowLeft size={16} className="mr-1" /> Back
                </button>

                <h1 className="text-3xl font-display font-bold text-center text-[#050806] mb-2">
                    We found {options.length} care pathways for you.
                </h1>
                <p className="text-center text-gray-500 mb-10">
                    Based on your location <strong>{postalCode}</strong> and <strong>{preference}</strong> preference.
                </p>

                <div className="grid md:grid-cols-3 gap-6 items-start">
                    {sortedOptions.map((opt) => (
                        <div
                            key={opt.id}
                            className={`bg-white rounded-3xl overflow-hidden shadow-sm border transition-all duration-300 relative ${opt.isRecommended
                                ? 'border-[#51C580] ring-4 ring-[#51C580]/10 shadow-xl scale-105 z-10'
                                : 'border-gray-100 hover:shadow-lg'
                                }`}
                        >
                            {opt.isRecommended && (
                                <div className="bg-[#51C580] text-white text-center text-xs font-bold py-1.5 uppercase tracking-wider">
                                    Recommended For You
                                </div>
                            )}

                            <div className="p-8">
                                <div className={`w-12 h-12 ${opt.color} rounded-2xl flex items-center justify-center mb-6 shadow-md`}>
                                    {opt.icon}
                                </div>
                                <div className="mb-6">
                                    {/* <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-gray-100 text-gray-500 mb-2 inline-block`}>
                                        {opt.badge}
                                    </span> */}
                                    <h3 className="text-2xl font-bold text-gray-900">{opt.title}</h3>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {opt.features.map((feat, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                                            <CheckCircle size={16} className={`shrink-0 ${opt.isRecommended ? 'text-[#51C580]' : 'text-gray-300'}`} />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-3 rounded-full font-bold transition-colors ${opt.isRecommended
                                    ? 'bg-[#51C580] text-white hover:bg-[#46ad70] shadow-lg hover:shadow-xl'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                    }`}>
                                    {opt.cta}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-center text-gray-400 text-xs mt-12">
                    *Availability subject to regional coverage.
                </p>
            </div>
        );
    };

    return (
        <IntakeLayout currentStep={step} totalSteps={3}>
            <AnimatePresence mode='wait'>
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}
                </motion.div>
            </AnimatePresence>
        </IntakeLayout>
    );
};

export default IntakePage;
