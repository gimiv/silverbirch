import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, CheckCircle2, Upload, User, MapPin, DollarSign, Activity, Award, Plus, Trash2, Mail, Phone, Building, MessageSquare } from 'lucide-react';

interface OnboardingFlowProps {
    isOpen: boolean;
    onClose: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [agreed, setAgreed] = useState(false);

    // Services state: array of objects with id, name, price, and optional customName
    const [services, setServices] = useState<{ id: string, name: string, customName: string, price: string }[]>([
        { id: '1', name: 'Physiotherapy', customName: '', price: '' }
    ]);

    const availableServiceNames = [
        "Physiotherapy", "Chiropractic", "Massage Therapy",
        "Acupuncture", "Osteopathy", "Naturopathy", "Kinesiology", "Other"
    ];

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [availability, setAvailability] = useState(
        daysOfWeek.map(day => ({
            day,
            active: day !== 'Saturday' && day !== 'Sunday',
            start: '09:00',
            end: '17:00'
        }))
    );

    const updateAvailability = (index: number, field: 'active' | 'start' | 'end', value: boolean | string) => {
        setAvailability(prev => {
            const newAvail = [...prev];
            newAvail[index] = { ...newAvail[index], [field]: value };
            return newAvail;
        });
    };

    const addService = () => {
        setServices(prev => [...prev, { id: Date.now().toString(), name: 'Physiotherapy', customName: '', price: '' }]);
    };

    const removeService = (id: string) => {
        if (services.length > 1) {
            setServices(prev => prev.filter(s => s.id !== id));
        }
    };

    const updateService = (id: string, field: 'name' | 'price' | 'customName', value: string) => {
        setServices(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    // Form logic: Check if all services have a valid price filled out, and if 'Other' is selected, customName is filled
    const isStep2Valid = services.every(s =>
        s.price.trim() !== '' &&
        (s.name !== 'Other' || s.customName.trim() !== '')
    );

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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input type="email" className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-[#00D46A] focus:ring-0 outline-none transition-colors font-medium text-gray-900" placeholder="jane@clinic.com" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input type="tel" className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-[#00D46A] focus:ring-0 outline-none transition-colors font-medium text-gray-900" placeholder="(555) 123-4567" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Clinic Name</label>
                                        <div className="relative">
                                            <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input type="text" className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-[#00D46A] focus:ring-0 outline-none transition-colors font-medium text-gray-900" placeholder="Peak Performance Therapy" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Contact Preference</label>
                                        <div className="relative">
                                            <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <select className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-[#00D46A] focus:ring-0 outline-none transition-colors font-medium text-gray-900 bg-white appearance-none">
                                                <option>Email</option>
                                                <option>Phone Call</option>
                                                <option>Text Message (SMS)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Practice Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input type="text" className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-[#00D46A] focus:ring-0 outline-none transition-colors font-medium text-gray-900" placeholder="123 Wellness Way, Suite 100, City, State ZIP" />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: Services & Bio */}
                        {step === 2 && (
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-6">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="block text-sm font-bold text-gray-700">Services & Pricing</label>
                                        <span className="text-xs font-bold text-[#00A852] bg-[#E8F5EE] px-2 py-0.5 rounded-full">{services.length} Added</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-4">Add the services your practice offers and set your consultation prices.</p>

                                    <div className="space-y-3">
                                        <AnimatePresence>
                                            {services.map(service => (
                                                <motion.div
                                                    key={service.id}
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="flex items-start gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100 relative group"
                                                >
                                                    <div className="flex-grow space-y-2">
                                                        <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1 ml-1">Service Type</label>
                                                        <div className="relative">
                                                            <Activity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                                            <select
                                                                value={service.name}
                                                                onChange={(e) => updateService(service.id, 'name', e.target.value)}
                                                                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#00D46A] focus:ring-0 outline-none transition-colors text-sm font-medium text-gray-900 bg-white appearance-none"
                                                            >
                                                                {availableServiceNames.map(name => (
                                                                    <option key={name} value={name}>{name}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        {service.name === 'Other' && (
                                                            <input
                                                                type="text"
                                                                value={service.customName}
                                                                onChange={(e) => updateService(service.id, 'customName', e.target.value)}
                                                                placeholder="Enter custom service name"
                                                                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#00D46A] focus:ring-0 outline-none transition-colors text-sm font-medium text-gray-900 bg-white"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="w-1/3">
                                                        <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1 ml-1">Price</label>
                                                        <div className="relative">
                                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                                            <input
                                                                type="number"
                                                                value={service.price}
                                                                onChange={(e) => updateService(service.id, 'price', e.target.value)}
                                                                className="w-full pl-8 pr-3 py-2.5 rounded-lg border border-gray-200 focus:border-[#00D46A] focus:ring-0 outline-none transition-colors text-sm font-medium text-gray-900 bg-white"
                                                                placeholder="e.g. 150"
                                                            />
                                                        </div>
                                                    </div>

                                                    {services.length > 1 && (
                                                        <button
                                                            onClick={() => removeService(service.id)}
                                                            className="mt-6 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                                                            title="Remove Service"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>

                                        <button
                                            onClick={addService}
                                            className="w-full py-3 mt-2 border-2 border-dashed border-gray-200 hover:border-[#00D46A] hover:bg-[#E8F5EE] text-gray-500 hover:text-[#00A852] rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <Plus size={16} /> Add Another Service
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Practice Modality</label>
                                    <select className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-100 focus:border-[#00D46A] focus:ring-0 outline-none transition-colors font-medium text-gray-900 bg-white">
                                        <option>In-Clinic Only</option>
                                        <option>Virtual Only</option>
                                        <option>Hybrid (Both)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">Hours of Availability</label>
                                    <div className="space-y-2">
                                        {availability.map((day, index) => (
                                            <div key={day.day} className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${day.active ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100 opacity-70'}`}>
                                                <div className="flex items-center gap-3 w-1/3">
                                                    <div
                                                        onClick={() => updateAvailability(index, 'active', !day.active)}
                                                        className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors flex shrink-0 ${day.active ? 'bg-[#00D46A]' : 'bg-gray-300'}`}
                                                    >
                                                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${day.active ? 'translate-x-4' : 'translate-x-0'}`} />
                                                    </div>
                                                    <span className={`text-sm font-bold ${day.active ? 'text-gray-900' : 'text-gray-500'}`}>{day.day.substring(0, 3)}</span>
                                                </div>

                                                {day.active ? (
                                                    <div className="flex items-center gap-2 flex-grow justify-end">
                                                        <input
                                                            type="time"
                                                            value={day.start}
                                                            onChange={(e) => updateAvailability(index, 'start', e.target.value)}
                                                            className="px-2 py-1.5 rounded-md border border-gray-200 text-sm font-medium text-gray-700 w-24 outline-none focus:border-[#00D46A]"
                                                        />
                                                        <span className="text-gray-400 text-sm">-</span>
                                                        <input
                                                            type="time"
                                                            value={day.end}
                                                            onChange={(e) => updateAvailability(index, 'end', e.target.value)}
                                                            className="px-2 py-1.5 rounded-md border border-gray-200 text-sm font-medium text-gray-700 w-24 outline-none focus:border-[#00D46A]"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex-grow flex justify-end">
                                                        <span className="text-sm font-medium text-gray-400 italic">Not available</span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
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
                                disabled={step === 2 && !isStep2Valid}
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
