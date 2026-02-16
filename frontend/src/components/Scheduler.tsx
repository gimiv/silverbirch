import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, CheckCircle, Calendar as CalendarIcon, Clock, User, MessageSquare, Download } from 'lucide-react';
import 'react-day-picker/dist/style.css';

const TIME_SLOTS = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"
];

interface Therapist {
    id: string;
    name: string;
    image: string;
    type: string;
}

interface SchedulerProps {
    therapist?: Therapist;
}

const Scheduler: React.FC<SchedulerProps> = ({ therapist }) => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [step, setStep] = useState<'date' | 'details' | 'confirm'>('date');
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', smsReminder: true });

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    };

    const handleNext = () => {
        if (step === 'date' && selectedDate && selectedTime) setStep('details');
        else if (step === 'details' && formData.name && formData.email) setStep('confirm');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleNext();
    };

    const generateICalLink = () => {
        // Mock iCal generation
        const event = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Appointment with ${therapist ? therapist.name : 'Scale Health'}
DTSTART:${selectedDate ? format(selectedDate, 'yyyyMMdd') : ''}T090000
DESCRIPTION:Your appointment with Scale Health.
END:VEVENT
END:VCALENDAR`;
        const blob = new Blob([event], { type: 'text/calendar;charset=utf-8' });
        return URL.createObjectURL(blob);
    };

    if (step === 'confirm') {
        return (
            <div className="text-center p-10 bg-white rounded-xl shadow-lg border border-brand-primary/10 animate-fade-in max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <CheckCircle size={40} />
                </div>
                <h3 className="text-3xl font-display font-bold text-brand-dark mb-3">Booking Confirmed!</h3>
                <p className="text-gray-600 mb-8 text-lg">
                    You're booked with <strong>{therapist ? therapist.name : 'a specialist'}</strong> on <br />
                    <span className="font-bold text-brand-primary border-b-2 border-brand-accent/30 pb-1 inline-block mt-2">
                        {selectedDate && format(selectedDate, 'MMMM do, yyyy')} at {selectedTime}
                    </span>
                </p>

                <div className="flex flex-col gap-4 max-w-sm mx-auto">
                    <div className="bg-brand-light p-4 rounded-lg text-left border border-brand-secondary">
                        <p className="text-sm text-gray-500 mb-1">Confirmation sent to:</p>
                        <p className="font-medium text-gray-800 flex items-center gap-2">
                            {formData.email}
                        </p>
                        {formData.smsReminder && (
                            <p className="text-xs text-[#51C580] font-bold mt-2 flex items-center gap-1">
                                <MessageSquare size={12} /> SMS Reminder Enabled
                            </p>
                        )}
                    </div>

                    <a href={generateICalLink()} download="appointment.ics" className="flex items-center justify-center gap-2 w-full py-3 border-2 border-gray-200 rounded-lg font-bold text-gray-600 hover:border-[#51C580] hover:text-[#51C580] transition-all">
                        <Download size={18} /> Add to Calendar
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-6xl mx-auto flex flex-col lg:flex-row min-h-[600px] border border-gray-100">
            {/* Left Panel: Summary/Info */}
            <div className="bg-[#050806] p-8 text-white lg:w-1/3 flex flex-col relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#51C580]/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                <div className="mb-8 relative z-10">
                    <span className="inline-block px-3 py-1 bg-[#51C580]/20 text-[#51C580] rounded-full text-xs font-bold tracking-wider mb-4 border border-[#51C580]/20">
                        STEP {step === 'date' ? '1' : '2'} OF 2
                    </span>
                    <h3 className="text-3xl font-display font-bold mb-2">
                        {therapist ? `Book with ${therapist.name}` : 'Discovery Call'}
                    </h3>

                    {therapist && (
                        <div className="flex items-center gap-4 mb-6 mt-4 bg-white/5 p-3 rounded-xl border border-white/10">
                            <img src={therapist.image} alt={therapist.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#51C580]" />
                            <div>
                                <p className="font-bold text-sm">{therapist.name}</p>
                                <p className="text-xs text-gray-400 capitalize">{therapist.type} Specialist</p>
                            </div>
                        </div>
                    )}

                    {!therapist && (
                        <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
                            <Clock size={16} /> 30 min • Video Call
                        </div>
                    )}

                    <p className="text-gray-300 text-sm opacity-90 leading-relaxed">
                        {therapist
                            ? "Secure your session now. You'll receive a confirmation email with preparation instructions immediately after booking."
                            : "Meet with a certified wellness partner to discuss your health goals and create a personalized plan."
                        }
                    </p>
                </div>

                <div className="mt-auto space-y-4 relative z-10">
                    {selectedDate && (
                        <div className={`p-4 rounded-lg backdrop-blur-sm border transition-all duration-300 ${step === 'date' ? 'bg-white/5 border-white/10' : 'bg-[#51C580] border-[#51C580]'}`}>
                            <div className="flex items-start gap-3">
                                <CalendarIcon size={18} className={`${step === 'date' ? 'text-[#51C580]' : 'text-white'} mt-0.5`} />
                                <div>
                                    <p className={`text-xs uppercase tracking-wider mb-0.5 ${step === 'date' ? 'text-gray-400' : 'text-white/80'}`}>Date</p>
                                    <p className="font-semibold text-lg leading-tight">{format(selectedDate, 'EEEE, MMMM do')}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedTime && (
                        <div className={`p-4 rounded-lg backdrop-blur-sm border transition-all duration-300 ${step === 'date' ? 'bg-white/5 border-white/10' : 'bg-[#51C580] border-[#51C580]'}`}>
                            <div className="flex items-start gap-3">
                                <Clock size={18} className={`${step === 'date' ? 'text-[#51C580]' : 'text-white'} mt-0.5`} />
                                <div>
                                    <p className={`text-xs uppercase tracking-wider mb-0.5 ${step === 'date' ? 'text-gray-400' : 'text-white/80'}`}>Time</p>
                                    <p className="font-semibold text-lg leading-tight">{selectedTime}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Panel: Interaction */}
            <div className="p-6 lg:p-10 lg:w-2/3 bg-white flex flex-col">
                {step === 'date' && (
                    <div className="animate-fade-in h-full flex flex-col">
                        <h4 className="text-xl font-bold mb-8 text-[#050806] flex items-center gap-2">
                            Select a Date & Time
                        </h4>

                        <div className="flex flex-col xl:flex-row gap-12 h-full">
                            {/* Calendar Column */}
                            <div className="w-full xl:w-1/2 flex justify-center">
                                <style>{`
                  .rdp { 
                    --rdp-cell-size: 45px; 
                    --rdp-accent-color: #51C580; 
                    --rdp-background-color: #F4FAF6; 
                    margin: 0 !important;
                  }
                  .rdp-month { width: 100%; }
                  .rdp-table { max-width: 100%; }
                  .rdp-day_selected:not([disabled]), 
                  .rdp-day_selected:focus-visible, 
                  .rdp-day_selected:hover,
                  .rdp-day[aria-selected="true"] {
                    background-color: #51C580 !important;
                    color: white !important;
                    font-weight: bold;
                    border-radius: 50% !important;
                  }
                  .rdp-nav_button { color: #51C580; }
                `}</style>
                                <DayPicker
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    disabled={{ before: new Date() }}
                                    className="p-0 m-0"
                                />
                            </div>

                            {/* Time Slots Column */}
                            <div className="flex flex-col w-full xl:w-1/2 h-full border-t xl:border-t-0 xl:border-l border-gray-100 pt-6 xl:pt-0 xl:pl-8">
                                <p className="text-sm font-bold text-gray-700 mb-4 flex justify-between items-center">
                                    Available Slots
                                    <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">EST</span>
                                </p>
                                <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-2 max-h-[350px] custom-scrollbar">
                                    {TIME_SLOTS.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => handleTimeSelect(time)}
                                            className={`py-3 px-2 text-sm font-medium rounded-lg border transition-all duration-200 ${selectedTime === time
                                                ? 'bg-[#51C580] text-white border-[#51C580] shadow-md scale-[1.02]'
                                                : 'border-gray-100 text-gray-600 hover:border-[#51C580] hover:text-[#51C580] hover:bg-[#F4FAF6]'
                                                }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                            <button
                                onClick={handleNext}
                                disabled={!selectedDate || !selectedTime}
                                className="bg-[#51C580] text-white font-bold py-3 px-8 rounded-full hover:bg-[#46ad70] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:translate-y-[-2px]"
                            >
                                Next Step <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {step === 'details' && (
                    <form onSubmit={handleSubmit} className="animate-fade-in max-w-lg mx-auto w-full h-full flex flex-col justify-center">
                        <button
                            type="button"
                            onClick={() => setStep('date')}
                            className="text-sm text-gray-500 hover:text-[#51C580] mb-8 flex items-center gap-1 w-fit group"
                        >
                            <ChevronLeft size={16} />
                            <span className="group-hover:underline">Back to Calendar</span>
                        </button>

                        <h4 className="text-2xl font-bold mb-8 text-[#050806] flex items-center gap-3">
                            <span className="w-10 h-10 bg-[#F4FAF6] rounded-full flex items-center justify-center text-[#51C580]">
                                <User size={20} />
                            </span>
                            Your Details
                        </h4>

                        <div className="space-y-5 flex-grow">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#51C580] focus:border-transparent outline-none transition-all"
                                    placeholder="e.g. John Doe"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#51C580] focus:border-transparent outline-none transition-all"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <label className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.smsReminder ? 'bg-[#51C580] border-[#51C580]' : 'border-gray-300'}`}>
                                    {formData.smsReminder && <CheckCircle size={14} className="text-white" />}
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={formData.smsReminder}
                                    onChange={e => setFormData({ ...formData, smsReminder: e.target.checked })}
                                />
                                <span className="text-sm font-medium text-gray-700">Text me 24 hours before my appointment</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-8 bg-[#51C580] text-white font-bold py-4 rounded-full hover:bg-[#46ad70] transition-all shadow-lg hover:shadow-xl hover:translate-y-[-2px] flex items-center justify-center gap-2"
                        >
                            Confirm Booking <CheckCircle size={20} />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Scheduler;
