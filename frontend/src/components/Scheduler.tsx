import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, CheckCircle, Calendar as CalendarIcon, Clock, User } from 'lucide-react';
import 'react-day-picker/dist/style.css';

const TIME_SLOTS = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"
];

const Scheduler: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [step, setStep] = useState<'date' | 'details' | 'confirm'>('date');
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

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

    if (step === 'confirm') {
        return (
            <div className="text-center p-10 bg-white rounded-xl shadow-lg border border-brand-primary/10 animate-fade-in">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <CheckCircle size={40} />
                </div>
                <h3 className="text-3xl font-display font-bold text-brand-dark mb-3">Booking Confirmed!</h3>
                <p className="text-gray-600 mb-8 text-lg">
                    We've scheduled your session for <br />
                    <span className="font-bold text-brand-primary border-b-2 border-brand-accent/30 pb-1 inline-block mt-2">
                        {selectedDate && format(selectedDate, 'MMMM do, yyyy')} at {selectedTime}
                    </span>
                </p>
                <div className="bg-brand-light p-4 rounded-lg inline-block text-left max-w-sm w-full border border-brand-secondary">
                    <p className="text-sm text-gray-500 mb-1">Confirmation sent to:</p>
                    <p className="font-medium text-gray-800 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        {formData.email}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-5xl mx-auto flex flex-col lg:flex-row min-h-[550px] border border-gray-100">
            {/* Left Panel: Summary/Info - High Contrast */}
            <div className="bg-brand-dark p-8 text-white lg:w-1/3 flex flex-col">
                <div className="mb-8">
                    <span className="inline-block px-3 py-1 bg-brand-accent/20 text-brand-accent rounded-full text-xs font-bold tracking-wider mb-4 border border-brand-accent/20">
                        STEP {step === 'date' ? '1' : '2'} OF 2
                    </span>
                    <h3 className="text-2xl font-display font-bold mb-2">Discovery Call</h3>
                    <div className="flex items-center gap-2 text-brand-secondary/80 text-sm mb-6">
                        <Clock size={16} /> 30 min • Video Call
                    </div>
                    <p className="text-gray-300 text-sm opacity-90 leading-relaxed">
                        Meet with a certified wellness partner to discuss your health goals and create a personalized plan.
                    </p>
                </div>

                <div className="mt-auto space-y-4">
                    {selectedDate && (
                        <div className={`p-4 rounded-lg backdrop-blur-sm border transition-all duration-300 ${step === 'date' ? 'bg-white/5 border-white/10' : 'bg-brand-primary border-brand-accent/50'}`}>
                            <div className="flex items-start gap-3">
                                <CalendarIcon size={18} className="text-brand-accent mt-0.5" />
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-0.5">Date</p>
                                    <p className="font-semibold text-lg leading-tight">{format(selectedDate, 'EEEE, MMMM do')}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedTime && (
                        <div className={`p-4 rounded-lg backdrop-blur-sm border transition-all duration-300 ${step === 'date' ? 'bg-white/5 border-white/10' : 'bg-brand-primary border-brand-accent/50'}`}>
                            <div className="flex items-start gap-3">
                                <Clock size={18} className="text-brand-accent mt-0.5" />
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-gray-400 mb-0.5">Time</p>
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
                        <h4 className="text-xl font-bold mb-6 text-brand-dark flex items-center gap-2">
                            <CalendarIcon className="text-brand-primary" /> Select a Date & Time
                        </h4>

                        <div className="flex flex-col lg:flex-row gap-12 h-full">
                            <div className="calendar-container w-full lg:w-1/2 flex justify-center lg:justify-start">
                                <style>{`
                  /* Scale Health Calendar Overrides */
                  .rdp { 
                    --rdp-cell-size: 40px; 
                    --rdp-accent-color: #51C580; 
                    --rdp-background-color: #F4FAF6; 
                    margin: 0 !important;
                  }
                  .rdp-month {
                    width: 100%;
                  }
                  .rdp-table {
                    width: 100%;
                    max-width: 320px;
                    border-collapse: collapse;
                  }
                  /* Force Round Mint Green Selection */
                  .rdp-day_selected, 
                  .rdp-day_selected:focus-visible, 
                  .rdp-day_selected:hover,
                  .rdp-day[aria-selected="true"] {
                    background-color: #51C580 !important;
                    color: white !important;
                    border-radius: 50% !important;
                    font-weight: bold;
                  }
                  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
                    background-color: #F4FAF6;
                    border-radius: 50%;
                  }
                  .rdp-nav_button {
                    color: #51C580;
                  }
                `}</style>
                                <DayPicker
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    disabled={{ before: new Date() }}
                                    className="p-0 m-0"
                                />
                            </div>

                            <div className="flex flex-col w-full lg:w-1/2 h-full border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 lg:pt-0 lg:pl-10">
                                <p className="text-sm font-bold text-gray-700 mb-4 flex justify-between items-center">
                                    Available Slots
                                    <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">EST Zone</span>
                                </p>
                                <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-2 max-h-[320px] custom-scrollbar">
                                    {TIME_SLOTS.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => handleTimeSelect(time)}
                                            className={`py-3 px-2 text-sm font-medium rounded-lg border transition-all duration-200 ${selectedTime === time
                                                ? 'bg-[#51C580] text-white border-[#51C580] shadow-md'
                                                : 'border-gray-200 text-gray-700 hover:border-[#51C580] hover:text-[#51C580] hover:bg-[#F4FAF6]'
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
                                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 px-8"
                            >
                                Next Step <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}

                {step === 'details' && (
                    <form onSubmit={handleSubmit} className="animate-fade-in max-w-lg mx-auto w-full h-full flex flex-col">
                        <button
                            type="button"
                            onClick={() => setStep('date')}
                            className="text-sm text-gray-500 hover:text-brand-primary mb-8 flex items-center gap-1 w-fit group"
                        >
                            <div className="p-1 rounded-full bg-gray-100 group-hover:bg-brand-secondary transition-colors">
                                <ChevronLeft size={16} />
                            </div>
                            <span className="underline decoration-transparent group-hover:decoration-brand-primary transition-all">Back to Calendar</span>
                        </button>

                        <h4 className="text-2xl font-bold mb-6 text-brand-dark flex items-center gap-3">
                            <div className="w-10 h-10 bg-brand-secondary rounded-full flex items-center justify-center text-brand-primary">
                                <User size={20} />
                            </div>
                            Your Details
                        </h4>

                        <div className="space-y-6 flex-grow">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all placeholder:text-gray-400"
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all placeholder:text-gray-400"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
                                </label>
                                <input
                                    type="tel"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all placeholder:text-gray-400"
                                    placeholder="(555) 123-4567"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-8 btn-primary flex items-center justify-center gap-2 py-4 text-lg shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all"
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
