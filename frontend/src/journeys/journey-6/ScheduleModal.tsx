import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, CheckCircle2, ChevronRight, User, Gift } from 'lucide-react';

interface ClinicData {
    name: string;
    image: string;
    specialty: string;
}

interface ScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    partner: ClinicData | null;
}

const DATES = [
    { day: 'Mon', date: '12', full: 'Oct 12' },
    { day: 'Tue', date: '13', full: 'Oct 13' },
    { day: 'Wed', date: '14', full: 'Oct 14' },
    { day: 'Thu', date: '15', full: 'Oct 15' },
    { day: 'Fri', date: '16', full: 'Oct 16' },
];

const TIMES = [
    '09:00 AM', '09:30 AM', '10:00 AM', '11:30 AM',
    '01:00 PM', '02:30 PM', '03:00 PM', '04:30 PM'
];

const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose, partner }) => {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(DATES[0].full);
    const [selectedTime, setSelectedTime] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen || !partner) return null;

    const handleNext = () => setStep(2);

    const handleConfirm = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setStep(3);
        }, 1500);
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setStep(1);
            setSelectedTime('');
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
                    className="relative w-[95%] sm:w-full max-w-lg bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] md:max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-[#F8FAFB]">
                        <div className="flex items-center gap-4">
                            <img src={partner.image} alt={partner.name} className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                            <div>
                                <h3 className="font-bold text-gray-900 leading-tight">{partner.name}</h3>
                                <p className="text-sm text-[#00A852] font-semibold">{partner.specialty} Consult</p>
                            </div>
                        </div>
                        <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content Scrollable Area */}
                    <div className="p-6 md:p-8 overflow-y-auto flex-grow custom-scrollbar">
                        {step === 1 && (
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                <h4 className="text-xl font-display font-bold text-gray-900 mb-6">Select a Date & Time</h4>

                                {/* Date Selector */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-2 mb-3 text-sm font-bold text-gray-500 uppercase tracking-widest">
                                        <Calendar size={16} /> October 2026
                                    </div>
                                    <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                                        {DATES.map((d) => (
                                            <button
                                                key={d.full}
                                                onClick={() => setSelectedDate(d.full)}
                                                className={`flex flex-col items-center justify-center min-w-[72px] p-3 rounded-2xl border-2 transition-all shrink-0 ${selectedDate === d.full
                                                    ? 'border-[#00D46A] bg-[#E8F5EE]'
                                                    : 'border-gray-100 hover:border-gray-200'
                                                    }`}
                                            >
                                                <span className={`text-xs font-bold mb-1 ${selectedDate === d.full ? 'text-[#00A852]' : 'text-gray-500'}`}>{d.day}</span>
                                                <span className={`text-xl font-bold ${selectedDate === d.full ? 'text-[#0A0F1E]' : 'text-gray-900'}`}>{d.date}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Time Selector */}
                                <div>
                                    <div className="flex items-center gap-2 mb-3 text-sm font-bold text-gray-500 uppercase tracking-widest">
                                        <Clock size={16} /> Available Times
                                    </div>
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                        {TIMES.map((t) => (
                                            <button
                                                key={t}
                                                onClick={() => setSelectedTime(t)}
                                                className={`py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${selectedTime === t
                                                    ? 'border-[#00D46A] bg-[#00D46A] text-white shadow-lg shadow-[#00D46A]/20'
                                                    : 'border-gray-100 text-gray-700 hover:border-[#00D46A]/40 hover:bg-[#E8F5EE]'
                                                    }`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                <h4 className="text-xl font-display font-bold text-gray-900 mb-2">Patient Details</h4>
                                <p className="text-gray-500 text-sm mb-6">You're booking a consult on <span className="font-bold text-gray-900">{selectedDate}</span> at <span className="font-bold text-gray-900">{selectedTime}</span>.</p>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input type="text" className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#00D46A] focus:ring-0 outline-none transition-colors font-medium text-gray-900 placeholder-gray-400" placeholder="Jane Doe" defaultValue="Sarah Jenkins" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                                            <input type="email" className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#00D46A] focus:ring-0 outline-none transition-colors font-medium text-gray-900 placeholder-gray-400" defaultValue="sarah.j@example.com" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-1">Phone</label>
                                            <input type="tel" className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#00D46A] focus:ring-0 outline-none transition-colors font-medium text-gray-900 placeholder-gray-400" defaultValue="(555) 123-4567" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Reason for Visit</label>
                                        <textarea className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-[#00D46A] focus:ring-0 outline-none transition-colors font-medium text-gray-900 placeholder-gray-400" rows={3} placeholder="Please briefly describe your primary concern..." defaultValue="Experiencing lower back pain after recent workouts."></textarea>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                                <div className="w-16 h-16 bg-[#E8F5EE] rounded-full flex items-center justify-center mx-auto mb-4 text-[#00D46A]">
                                    <CheckCircle2 size={32} className="text-[#00A852]" />
                                </div>
                                <h4 className="text-2xl font-display font-bold text-gray-900 mb-2">Booking Confirmed!</h4>
                                <p className="text-gray-500 mb-6 text-sm">Your consultation with <span className="font-bold text-gray-900">{partner.name}</span> is scheduled.</p>

                                {/* Offers Section */}
                                <div className="text-left bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Gift className="text-[#00A852]" size={18} />
                                        <h5 className="font-bold text-gray-900">Exclusive Wellness Offers</h5>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-4 font-medium leading-relaxed">As a ScaleHealth member, enjoy a <span className="text-[#0A0F1E] font-bold">$25 credit</span> towards these premium health & fitness brands to supplement your recovery journey.</p>

                                    <div className="space-y-3">
                                        {[
                                            {
                                                brand: 'WHOOP',
                                                desc: '$25 off any new membership',
                                                icon: '/logos/WHOOP.svg'
                                            },
                                            {
                                                brand: 'AG1',
                                                desc: '$25 off your first supply',
                                                icon: '/logos/AG1svg.svg'
                                            },
                                            {
                                                brand: 'Lululemon',
                                                desc: '$25 off next apparel purchase',
                                                icon: '/logos/Lululemon.svg'
                                            }
                                        ].map((offer, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-[#00D46A]/50 hover:shadow-md transition-all cursor-pointer group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center p-2 bg-gray-50 group-hover:bg-white transition-colors border border-gray-100">
                                                        <img src={offer.icon} alt={`${offer.brand} Logo`} className="max-w-full max-h-full object-contain" />
                                                    </div>
                                                    <div>
                                                        <h6 className="font-bold text-sm text-gray-900 group-hover:text-[#0A0F1E] transition-colors">{offer.brand}</h6>
                                                        <p className="text-xs text-[#00A852] font-semibold">{offer.desc}</p>
                                                    </div>
                                                </div>
                                                <button className="text-gray-400 group-hover:text-[#00A852] transition-colors bg-gray-50 group-hover:bg-[#E8F5EE] p-1.5 rounded-full">
                                                    <ChevronRight size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 border-t border-gray-100 bg-white flex items-center justify-between mt-auto">
                        {step === 1 && (
                            <button onClick={handleClose} className="font-bold text-gray-500 hover:text-gray-900 transition-colors">Cancel</button>
                        )}
                        {step === 2 && (
                            <button onClick={() => setStep(1)} className="font-bold text-gray-500 hover:text-gray-900 transition-colors">Back</button>
                        )}
                        {step === 3 && (
                            <div className="w-full"></div> /* Spacer */
                        )}

                        {step === 1 && (
                            <button
                                onClick={handleNext}
                                disabled={!selectedTime}
                                className="bg-[#00D46A] hover:bg-[#00A852] text-white px-8 py-3 rounded-full font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                Continue <ChevronRight size={18} />
                            </button>
                        )}
                        {step === 2 && (
                            <button
                                onClick={handleConfirm}
                                disabled={isSubmitting}
                                className="bg-[#00D46A] hover:bg-[#00A852] text-white px-8 py-3 rounded-full font-bold transition-all disabled:opacity-80 flex items-center gap-2"
                            >
                                {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                            </button>
                        )}
                        {step === 3 && (
                            <button
                                onClick={handleClose}
                                className="w-full bg-[#0A0F1E] hover:bg-black text-white px-8 py-3 rounded-full font-bold transition-all"
                            >
                                Done
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ScheduleModal;
