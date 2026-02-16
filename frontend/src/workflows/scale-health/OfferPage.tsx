import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, MapPin, Clock, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <span className="tabular-nums">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
    );
};

const OfferPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Dr. Ho Branded Header */}
            <header className="bg-white border-b border-gray-200 py-4 sticky top-0 z-50">
                <div className="container mx-auto px-4 relative flex items-center justify-center h-12">
                    {/* Centered Logo */}
                    <img
                        src="https://drhos.com/cdn/shop/files/Frame_427320311_26f3d897-892d-44d6-aef1-f477db59b06d.png?v=1758532501&width=340"
                        alt="DR-HO'S"
                        className="h-10 object-contain"
                    />

                    {/* Right-aligned Cart Icon */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 27 28" fill="none" className="stroke-current">
                            <g clipPath="url(#clip0_1447_44334)">
                                <path d="M27 0.880005H0.760017V27.12H27V0.880005Z" fill="white" fillOpacity="0"></path>
                                <path d="M10.6 10.72H8.24621C7.71174 10.72 7.25562 11.1064 7.16775 11.6336L5.34553 22.567C5.23446 23.2333 5.74837 23.84 6.42398 23.84H21.336C22.0117 23.84 22.5255 23.2333 22.4145 22.567L20.5923 11.6336C20.5044 11.1064 20.0483 10.72 19.5139 10.72H17.16M10.6 10.72H17.16M10.6 10.72C10.2356 9.26226 9.50668 4.16003 13.88 4.16003C18.2533 4.16003 17.5244 9.26226 17.16 10.72" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_1447_44334">
                                    <rect width="26.24" height="26.24" fill="white" transform="translate(0.760017 0.880005)"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col-reverse md:flex-row min-h-[600px]">

                    {/* Left Column: Order Confirmation (Shopify Context) */}
                    <div className="md:w-1/2 p-8 border-r border-gray-100 bg-white relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>

                        <div className="mb-8">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle size={32} />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank you, John!</h1>
                            <p className="text-gray-600">Your order #1024 is confirmed.</p>
                            <p className="text-sm text-gray-500 mt-1">You'll receive a confirmation email shortly.</p>
                        </div>

                        <div className="border border-gray-200 rounded-lg p-6 mb-6">
                            <h3 className="font-semibold text-gray-800 mb-4 border-b border-gray-100 pb-2">Order Summary</h3>
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-16 h-16 bg-white rounded-md border border-gray-200 flex items-center justify-center p-1 overflow-hidden">
                                    <img src="/assets/pain.webp" alt="Pain Therapy System" className="w-full h-full object-contain" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">Pain Therapy System Pro</p>
                                    <p className="text-sm text-gray-500">Basic Package</p>
                                </div>
                                <p className="font-medium text-gray-800">$199.99</p>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600 border-t border-gray-100 pt-3">
                                <span>Total</span>
                                <span className="font-bold text-lg text-gray-900">$199.99</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-gray-400 mt-0.5" />
                                <div>
                                    <p className="font-medium text-gray-800 text-sm">Shipping Address</p>
                                    <p className="text-sm text-gray-500">
                                        123 Wellness Way<br />
                                        Toronto, ON M5V 2T6<br />
                                        Canada
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Scale Health Offer (Variation 3 - Side-by-Side Layout) */}
                    <div className="md:w-1/2 relative bg-[#F4FAF6] flex flex-col md:flex-row">
                        {/* Image Side (Left Half of the Right Column) */}
                        <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1683848644075-82eb557b8623?w=800&auto=format&fit=crop&q=80"
                                alt="Woman in blue sports bra fitness"
                                className="w-full h-full object-cover object-center"
                            />
                        </div>

                        {/* Content Side (Right Half of the Right Column) */}
                        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center relative">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-lg font-bold font-display text-gray-900">Scale Health</span>
                                <div className="text-[#51C580] font-bold text-xl">+</div>
                            </div>

                            <div className="flex items-center gap-2 mb-3 bg-red-50 border border-red-100 px-3 py-1.5 rounded-full w-fit">
                                <Clock size={14} className="text-red-500" />
                                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Offer Expires in: <CountdownTimer /></span>
                            </div>

                            <span className="inline-block px-3 py-1 rounded-full bg-[#51C580]/10 text-[#51C580] font-bold text-xs tracking-wider mb-4 w-fit">
                                SAVE $60 TODAY
                            </span>

                            <h2 className="text-3xl font-display font-bold text-[#050806] mb-4 leading-tight">
                                Your body knows something's wrong. <br />
                                Listen to it.
                            </h2>

                            <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                                Talk to a registered therapist about your injury and get the most out of your Dr. Ho products.
                            </p>

                            <div className="flex items-end gap-3 mb-8">
                                <span className="text-xl text-gray-400 line-through mb-1 font-medium">$150</span>
                                <span className="text-5xl font-bold text-[#050806] tracking-tight">$90</span>
                                <span className="text-[#51C580] font-bold text-sm mb-2 px-2 py-0.5 bg-[#51C580]/10 rounded-md">-40%</span>
                            </div>

                            <button
                                onClick={() => navigate('/w/scale-health/landing')}
                                className="w-full bg-[#51C580] text-white font-bold text-lg py-4 rounded-full hover:bg-[#46ad70] transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform"
                            >
                                Talk to an Expert NOW <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>

                </div>
            </main>

            <footer className="py-6 text-center text-sm text-gray-400">
                <p>&copy; 2026 Dr. Ho's x Scale Health Partner Program</p>
            </footer>
        </div>
    );
};

export default OfferPage;
