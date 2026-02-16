import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, addDays, startOfToday } from 'date-fns';
import { ChevronLeft, ChevronRight, CheckCircle, Calendar as CalendarIcon, Clock } from 'lucide-react';
import 'react-day-picker/dist/style.css';

// --- Mock Data ---
const TIME_SLOTS = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"
];

const THERAPISTS = [
    { id: '1', name: 'Sarah Chen, PT', type: 'Physiotherapist', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200', rating: 4.9 },
    { id: '2', name: 'Michael Ross, DC', type: 'Chiropractor', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200', rating: 4.8 },
    { id: '3', name: 'Emma Wilson, RMT', type: 'Massage Therapist', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200', rating: 5.0 },
    { id: '4', name: 'David Kim, PT', type: 'Physiotherapist', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200', rating: 4.9 },
];

interface InsiderSchedulerProps {
    preSelectedTherapist?: typeof THERAPISTS[0] | null;
}

const InsiderScheduler: React.FC<InsiderSchedulerProps> = ({ preSelectedTherapist }) => {
    const [viewMode, setViewMode] = useState<'therapist' | 'date'>('therapist');
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [selectedTherapist, setSelectedTherapist] = useState<typeof THERAPISTS[0] | null>(preSelectedTherapist || null);
    const [step, setStep] = useState<'selection' | 'details' | 'confirm'>('selection');
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', smsReminder: true });

    // Handle "First Available" logic (Mock: just picks tomorrow 9am)
    const handleFirstAvailable = () => {
        const tomorrow = addDays(startOfToday(), 1);
        setSelectedDate(tomorrow);
        setSelectedTime("09:00 AM");
        // Randomly assign a therapist if none selected
        if (!selectedTherapist) {
            setSelectedTherapist(THERAPISTS[0]);
        }
        setStep('details');
    };

    const handleNext = () => {
        if (step === 'selection' && selectedDate && selectedTime && selectedTherapist) setStep('details');
        else if (step === 'details' && formData.name && formData.email) setStep('confirm');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleNext();
    };

    // --- Render Helpers ---

    if (step === 'confirm') {
        return (
            <div className="text-center p-10 bg-white rounded-xl shadow-lg border border-brand-primary/10 animate-fade-in max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <CheckCircle size={40} />
                </div>
                <h3 className="text-3xl font-display font-bold text-brand-dark mb-3">VIP Booking Confirmed!</h3>
                <p className="text-gray-600 mb-8 text-lg">
                    You're booked with <strong>{selectedTherapist?.name}</strong> on <br />
                    <span className="font-bold text-brand-primary border-b-2 border-brand-accent/30 pb-1 inline-block mt-2">
                        {selectedDate && format(selectedDate, 'MMMM do, yyyy')} at {selectedTime}
                    </span>
                </p>
                <div className="bg-brand-light p-4 rounded-lg text-left border border-brand-secondary max-w-sm mx-auto mb-6">
                    <p className="text-sm text-gray-500 mb-1">Confirmation sent to:</p>
                    <p className="font-medium text-gray-800">{formData.email}</p>
                </div>
                <button onClick={() => window.location.reload()} className="text-[#51C580] font-bold hover:underline">Book Another</button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row min-h-[600px]">
            {/* Left Panel: Context & Summary */}
            <div className="bg-[#050806] p-8 text-white lg:w-1/3 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#51C580]/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-[#51C580]/20 text-[#51C580] rounded-full text-xs font-bold tracking-wider mb-6 border border-[#51C580]/20">
                        {step === 'selection' ? 'STEP 1: SELECT SLOT' : 'STEP 2: CONFIRM'}
                    </span>

                    <h3 className="text-3xl font-display font-bold mb-2 text-white">
                        Concierge Booking
                    </h3>
                    <p className="text-gray-400 text-sm mb-8">Access the private network.</p>

                    {/* Selection Summary */}
                    <div className="space-y-4">
                        {selectedTherapist ? (
                            <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl border border-white/5">
                                <img src={selectedTherapist.image} alt={selectedTherapist.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#51C580]" />
                                <div>
                                    <p className="font-bold text-sm text-white">{selectedTherapist.name}</p>
                                    <p className="text-xs text-gray-300 capitalize">{selectedTherapist.type}</p>
                                </div>
                                <button onClick={() => setSelectedTherapist(null)} className="ml-auto text-xs text-[#51C580] hover:underline">Change</button>
                            </div>
                        ) : (
                            <div className="p-4 rounded-xl border border-dashed border-white/20 text-gray-400 text-sm text-center">
                                No specialist selected yet
                            </div>
                        )}

                        {selectedDate && (
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                                <CalendarIcon size={18} className="text-[#51C580] mt-0.5" />
                                <div>
                                    <p className="text-xs uppercase tracking-wider mb-0.5 text-gray-400">Date</p>
                                    <p className="font-semibold text-lg leading-tight text-white">{format(selectedDate, 'EEE, MMMM do')}</p>
                                </div>
                            </div>
                        )}
                        {selectedTime && (
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                                <Clock size={18} className="text-[#51C580] mt-0.5" />
                                <div>
                                    <p className="text-xs uppercase tracking-wider mb-0.5 text-gray-400">Time</p>
                                    <p className="font-semibold text-lg leading-tight text-white">{selectedTime}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Panel: Logic */}
            <div className="p-6 lg:p-10 lg:w-2/3 bg-white flex flex-col">
                {step === 'selection' && (
                    <div className="h-full flex flex-col">
                        {/* Toggle */}
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-xl font-bold text-[#050806]">Select Availability</h4>
                            <div className="flex bg-gray-100 p-1 rounded-lg">
                                <button
                                    onClick={() => setViewMode('therapist')}
                                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${viewMode === 'therapist' ? 'bg-white text-[#050806] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    By Therapist
                                </button>
                                <button
                                    onClick={() => setViewMode('date')}
                                    className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${viewMode === 'date' ? 'bg-white text-[#050806] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    By Date
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col xl:flex-row gap-8 h-full">
                            {/* Calendar */}
                            <div className="w-full xl:w-1/2 flex justify-center">
                                <style>{`
                                  .rdp { --rdp-cell-size: 45px; --rdp-accent-color: #51C580; --rdp-background-color: #F4FAF6; margin: 0 !important; }
                                  .rdp-day_selected:not([disabled]) { background-color: #51C580 !important; color: white !important; font-weight: bold; border-radius: 50% !important; }
                                `}</style>
                                <DayPicker
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    disabled={{ before: new Date() }}
                                    className="p-0 m-0"
                                />
                            </div>

                            {/* List (Therapists or Slots) */}
                            <div className="w-full xl:w-1/2 flex flex-col h-full overflow-hidden">
                                {viewMode === 'therapist' ? (
                                    <>
                                        <p className="text-sm font-bold text-gray-700 mb-3">Available Specialists</p>
                                        <div className="overflow-y-auto pr-2 gap-3 flex flex-col custom-scrollbar max-h-[350px]">
                                            {THERAPISTS.map(t => (
                                                <button
                                                    key={t.id}
                                                    onClick={() => setSelectedTherapist(t)}
                                                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${selectedTherapist?.id === t.id ? 'border-[#51C580] bg-[#F4FAF6]' : 'border-gray-100 hover:border-gray-300'}`}
                                                >
                                                    <img src={t.image} className="w-10 h-10 rounded-full object-cover" />
                                                    <div className="flex-grow">
                                                        <p className="font-bold text-sm text-[#050806]">{t.name}</p>
                                                        <p className="text-xs text-gray-500">{t.type}</p>
                                                    </div>
                                                    {selectedTherapist?.id === t.id && <CheckCircle size={16} className="text-[#51C580]" />}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm font-bold text-gray-700 mb-3">All Available Times ({format(selectedDate || new Date(), 'MMM do')})</p>
                                        <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-2 custom-scrollbar max-h-[350px]">
                                            {TIME_SLOTS.map(time => (
                                                <button
                                                    key={time}
                                                    onClick={() => { setSelectedTime(time); if (!selectedTherapist) setSelectedTherapist(THERAPISTS[0]); }}
                                                    className={`py-2 px-2 text-sm font-medium rounded-lg border transition-all ${selectedTime === time ? 'bg-[#51C580] text-white border-[#51C580]' : 'border-gray-100 text-gray-600 hover:border-[#51C580] hover:text-[#51C580]'}`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}

                                {viewMode === 'therapist' && selectedTherapist && (
                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                        <p className="text-sm font-bold text-gray-700 mb-3">Select Time</p>
                                        <div className="grid grid-cols-3 gap-2">
                                            {TIME_SLOTS.slice(0, 6).map(time => (
                                                <button
                                                    key={time}
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`py-1.5 px-1 text-xs font-bold rounded-md border transition-all ${selectedTime === time ? 'bg-[#51C580] text-white' : 'border-gray-100 hover:border-gray-300'}`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mt-auto pt-6 border-t border-gray-100 flex justify-end gap-3">
                            <button
                                onClick={handleFirstAvailable}
                                className="px-5 py-3 rounded-full font-bold text-sm text-gray-500 hover:bg-gray-50 transition-colors"
                            >
                                Book First Available
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={!selectedTime || !selectedTherapist}
                                className="bg-[#51C580] text-white font-bold py-3 px-8 rounded-full hover:bg-[#46ad70] transition-all disabled:opacity-50 shadow-lg"
                            >
                                Continue <ChevronRight size={18} className="inline ml-1" />
                            </button>
                        </div>
                    </div>
                )}

                {step === 'details' && (
                    <form onSubmit={handleSubmit} className="animate-fade-in max-w-lg mx-auto w-full h-full flex flex-col justify-center">
                        <button type="button" onClick={() => setStep('selection')} className="text-sm text-gray-500 hover:text-[#51C580] mb-8 flex items-center gap-1 w-fit"><ChevronLeft size={16} /> Back</button>
                        <h4 className="text-2xl font-bold mb-6 text-[#050806]">Contact Details</h4>
                        <div className="space-y-4">
                            <input required type="text" className="w-full px-4 py-3 border border-gray-200 rounded-xl" placeholder="Full Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            <input required type="email" className="w-full px-4 py-3 border border-gray-200 rounded-xl" placeholder="Email Address" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                        <button type="submit" className="w-full mt-8 bg-[#51C580] text-white font-bold py-4 rounded-full shadow-lg">Confirm Booking</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default InsiderScheduler;
