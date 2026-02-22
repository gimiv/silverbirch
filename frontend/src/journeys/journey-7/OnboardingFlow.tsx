import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, CheckCircle2, Upload, User, MapPin, Clock, DollarSign, Activity, Award } from 'lucide-react';

interface OnboardingFlowProps {
    isOpen: boolean;
    onClose: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const availableServices = [
        "Physiotherapy", "Chiropractic", "Massage Therapy",
        "Acupuncture", "Osteopathy", "Naturopathy", "Kinesiology"
    ];

    const toggleService = (service: string) => {
        setSelectedServices(prev =>
            prev.includes(service)
                ? prev.filter(s => s !== service)
                : [...prev, service]
        );
    };

    if (!isOpen) return null;

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleConfirm = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setStep(4);
        }, 1500);
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setStep(1);
            setAgreed(false);
        }, 300);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 text-left">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="relative w-[95%] sm:w-full max-w-2xl bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] md:max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-[#F8FAFB]">
                        <div>
                            <h3 className="font-bold text-gray-900 leading-tight text-xl">Preferred Partner Application</h3>
                            <p className="text-sm text-[#00A852] font-semibold mt-1">
                                {step === 1 && 'Step 1: Partner Details'}
                                {step === 2 && 'Step 2: Practice & Availability'}
                                {step === 3 && 'Step 3: Partner Agreement'}
                                {step === 4 && 'Welcome to Scale Health!'}
                            </p>
                        </div>
                        <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 md:p-8 overflow-y-auto flex-grow custom-scrollbar">

                        {/* STEP 1: Basic Info */}
                        {step === 1 && (
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                                <div>
                                    <h4 className="text-xl font-display font-bold text-gray-900 mb-2">Let's get to know you</h4>
                                    <p className="text-gray-500 text-sm">This information will be displayed on your public Scale Health profile.</p>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-[#00D46A] hover:text-[#00A852] transition-colors">
                                        <Upload size={24} className="mb-1" />
                                        <span className="text-[10px] uppercase font-bold tracking-wider">Photo</span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        <p className="font-bold text-gray-900 mb-1">Upload a professional headshot.</p>
                                        <p>High resolution JPG or PNG, max 5MB.</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input type="text" className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-[#00D46A] focus:ring-0 outline-none transition-colors font-medium text-gray-900" placeholder="Dr. Jane Smith" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Clinic or Practice Name</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input type="text" className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-[#00D46A] focus:ring-0 outline-none transition-colors font-medium text-gray-900" placeholder="Peak Performance Therapy" />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: Services & Bio */}
                        {step === 2 && (
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Services Offered</label>
                                    <p className="text-xs text-gray-500 mb-3">Select all that apply to your practice.</p>
                                    <div className="flex flex-wrap gap-2">
                                        {availableServices.map(service => {
                                            const isSelected = selectedServices.includes(service);
                                            return (
                                                <button
                                                    key={service}
                                                    onClick={() => toggleService(service)}
                                                    className={`px-4 py-2 rounded-full text-sm font-bold transition-all border 
                                                        ${isSelected
                                                            ? 'bg-[#00D46A] text-white border-[#00D46A] shadow-[0_0_10px_rgba(0,212,106,0.3)]'
                                                            : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {service}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Consultation Price</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input type="number" className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-[#00D46A] focus:ring-0 outline-none transition-colors font-medium text-gray-900" placeholder="150" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Modality</label>
                                        <select className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-[#00D46A] focus:ring-0 outline-none transition-colors font-medium text-gray-900 bg-white">
                                            <option>In-Clinic Only</option>
                                            <option>Virtual Only</option>
                                            <option>Hybrid (Both)</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Hours of Availability</label>
                                    <div className="relative">
                                        <Clock className="absolute left-4 top-4 text-gray-400" size={18} />
                                        <textarea className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-[#00D46A] focus:ring-0 outline-none transition-colors font-medium text-gray-900" rows={2} placeholder="Mon-Fri: 9am - 5pm..."></textarea>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Brief Bio</label>
                                    <textarea className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-[#00D46A] focus:ring-0 outline-none transition-colors font-medium text-gray-900" rows={3} placeholder="Tell clients about your approach..."></textarea>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3: Terms */}
                        {step === 3 && (
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                                <div>
                                    <h4 className="text-xl font-display font-bold text-gray-900 mb-2">Partner Agreement</h4>
                                    <p className="text-gray-500 text-sm">Please review the financial terms of our partnership.</p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-sm text-gray-700 leading-relaxed space-y-4">
                                    <p>
                                        <strong className="text-gray-900">Zero Onboarding Fees.</strong> Joining the Scale Health Preferred Partner network is completely free.
                                    </p>
                                    <p>
                                        <strong className="text-gray-900">Performance-Based Structure.</strong> You only pay when you acquire a client through our platform.
                                        Scale Health charges a <span className="font-bold text-[#00A852]">25% service fee</span> on the cost of the initial referral consultation.
                                    </p>
                                    <p>
                                        <strong className="text-gray-900">Payment Collection.</strong> Scale Health handles all initial billing. We securely collect funds from the customer at the time of booking and disburse your 75% share directly to your account immediately after the service is provided.
                                    </p>
                                </div>

                                <label className="flex items-start gap-3 cursor-pointer p-4 border-2 border-gray-100 rounded-xl hover:border-[#00D46A]/50 transition-colors">
                                    <div className={`mt-0.5 w-5 h-5 rounded border flex shrink-0 items-center justify-center transition-colors ${agreed ? 'bg-[#00D46A] border-[#00D46A]' : 'border-gray-300 bg-white'}`}>
                                        {agreed && <CheckCircle2 size={14} className="text-white" />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={agreed}
                                        onChange={(e) => setAgreed(e.target.checked)}
                                    />
                                    <span className="text-sm font-medium text-gray-700 leading-tight">
                                        I agree to the 25% service fee structure and authorize Scale Health to collect payments on my behalf.
                                    </span>
                                </label>
                            </motion.div>
                        )}

                        {/* STEP 4: Success */}
                        {step === 4 && (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                                <div className="w-20 h-20 bg-[#E8F5EE] rounded-full flex items-center justify-center mx-auto mb-6 text-[#00D46A]">
                                    <CheckCircle2 size={40} className="text-[#00A852]" />
                                </div>
                                <h4 className="text-3xl font-display font-bold text-gray-900 mb-4">Congratulations!</h4>
                                <p className="text-gray-500 mb-8 max-w-sm mx-auto">Your practice is now officially a Preferred Partner on the Scale Health network.</p>

                                <div className="text-left bg-gray-50 p-6 rounded-2xl border border-gray-100 max-w-md mx-auto">
                                    <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Award className="text-[#00A852]" size={18} />
                                        Your New Partner Benefits
                                    </h5>

                                    <ul className="space-y-4">
                                        <li className="flex items-start gap-3">
                                            <div className="p-1.5 bg-[#00D46A]/10 rounded-md text-[#00A852] mt-0.5 shrink-0">
                                                <MapPin size={14} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-gray-900">Priority Search Placement</p>
                                                <p className="text-xs text-gray-500">Your profile now features a 'Preferred' badge and ranks higher in local searches.</p>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="p-1.5 bg-[#00D46A]/10 rounded-md text-[#00A852] mt-0.5 shrink-0">
                                                <Activity size={14} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-gray-900">Brand Partner Promos</p>
                                                <p className="text-xs text-gray-500">Access exclusive discounts on WHOOP, AG1, and Lululemon for you and your staff.</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 border-t border-gray-100 bg-white flex items-center justify-between mt-auto shrink-0">
                        {step === 1 && (
                            <button onClick={handleClose} className="font-bold text-gray-500 hover:text-gray-900 transition-colors">Cancel</button>
                        )}
                        {(step === 2 || step === 3) && (
                            <button onClick={handleBack} className="font-bold text-gray-500 hover:text-gray-900 transition-colors">Back</button>
                        )}
                        {step === 4 && <div className="w-full" />}

                        {(step === 1 || step === 2) && (
                            <button
                                onClick={handleNext}
                                disabled={step === 2 && selectedServices.length === 0}
                                className="bg-[#00D46A] hover:bg-[#00A852] text-white px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Continue <ChevronRight size={18} />
                            </button>
                        )}
                        {step === 3 && (
                            <button
                                onClick={handleConfirm}
                                disabled={!agreed || isSubmitting}
                                className="bg-[#0A0F1E] hover:bg-black text-white px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                            >
                                {isSubmitting ? 'Processing...' : 'Submit Application'}
                            </button>
                        )}
                        {step === 4 && (
                            <button onClick={handleClose} className="w-full bg-[#0A0F1E] hover:bg-black text-white px-8 py-3 rounded-full font-bold transition-all">
                                Go to Provider Dashboard
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default OnboardingFlow;
