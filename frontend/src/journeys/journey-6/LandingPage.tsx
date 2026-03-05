import React, { useState, useRef, useEffect } from 'react';
import Layout from '../../components/Layout';
import ChatBot from '../../components/ChatBot';
import { MapPin, Monitor, ArrowRight, Search, Star, Award, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Map, { NavigationControl, Marker, useMap } from 'react-map-gl/mapbox';
import type { MapRef } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import ScheduleModal from './ScheduleModal';
import { PREFERRED_PARTNERS } from './data/preferredPartners';

// We've moved from static PLACEHOLDER_IMAGES to dynamic randomuser.me fetching.
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

interface ClinicData {
    id: string; // place_id
    name: string;
    lat: number;
    lng: number;
    rating: number;
    reviews: number;
    image: string;
    specialty: string;
    type: string;
    blurb: string;
    website?: string;
    address?: string;
}

interface MapboxSuggestion {
    id: string;
    place_name: string;
    center: [number, number];
}

const TORONTO_CENTER = { lat: 43.6485, lng: -79.3921 };

// Calculate distance in kilometers between two lat/lng points using Haversine formula
const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const searchMapboxCenter = async (query: string, mapboxToken: string): Promise<{ lat: number, lng: number } | null> => {
    if (!query || !mapboxToken) return null;
    try {
        const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`;
        const params = new URLSearchParams({ access_token: mapboxToken, types: 'place,locality,neighborhood,postcode', limit: '1' });
        const res = await fetch(`${endpoint}?${params.toString()}`);
        if (!res.ok) return null;
        const data = await res.json();
        if (!data.features || data.features.length === 0) return null;
        return { lng: data.features[0].center[0], lat: data.features[0].center[1] };
    } catch {
        return null;
    }
};

const fetchMapboxSuggestions = async (query: string, token: string): Promise<MapboxSuggestion[]> => {
    if (!query || !token) return [];
    try {
        const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`;
        const params = new URLSearchParams({
            access_token: token,
            types: 'place,locality,neighborhood',
            limit: '5'
        });
        const res = await fetch(`${endpoint}?${params.toString()}`);
        if (!res.ok) return [];
        const data = await res.json();
        return data.features.map((f: any) => ({
            id: f.id,
            place_name: f.place_name,
            center: f.center
        }));
    } catch {
        return [];
    }
};

const CustomMapboxMarker = ({ isSelected, isPreferred }: { isSelected: boolean, isPreferred: boolean }) => {
    if (isPreferred) {
        return (
            <div className={`transition-all duration-300 flex items-center justify-center 
                ${isSelected ? 'w-10 h-10' : 'w-7 h-7 hover:scale-110'} 
                rounded-full bg-[#00A852] border-[3px] border-white shadow-[0_4px_10px_rgba(0,168,82,0.4)]
            `}>
                <div className={`bg-white rounded-full ${isSelected ? 'w-2.5 h-2.5' : 'w-1.5 h-1.5'}`} />
            </div>
        );
    }
    return (
        <div className={`transition-all duration-300 flex items-center justify-center 
            ${isSelected ? 'w-7 h-7' : 'w-5 h-5 hover:scale-110'} 
            rounded-full bg-gray-400 border-2 border-white shadow-sm
        `} />
    );
};

// Component to handle the map camera flying
const MapboxCameraManager: React.FC<{
    clinics: ClinicData[];
    selectedPartnerId: string | null;
}> = ({ clinics, selectedPartnerId }) => {
    const { current: map } = useMap();

    // Fly to selected clinic
    useEffect(() => {
        if (!map) return;

        if (selectedPartnerId) {
            const partner = clinics.find(c => c.id === selectedPartnerId);
            if (partner) {
                map.flyTo({
                    center: [partner.lng, partner.lat],
                    zoom: 15,
                    duration: 1500,
                    essential: true
                });
            }
        } else if (clinics.length > 0) {
            // Zoom back out to fit all bounds when selection is cleared
            const lats = clinics.map(c => c.lat);
            const lngs = clinics.map(c => c.lng);

            map.fitBounds(
                [
                    [Math.min(...lngs) - 0.01, Math.min(...lats) - 0.01],
                    [Math.max(...lngs) + 0.01, Math.max(...lats) + 0.01]
                ],
                { padding: { top: 40, bottom: 40, left: 40, right: 40 }, duration: 1500, maxZoom: 14 }
            );
        }
    }, [selectedPartnerId, map, clinics]);

    return null;
};


const LandingPage: React.FC = () => {
    // Determine the Mapbox API key dynamically from Vite env
    const mapboxToken = import.meta.env.VITE_MAPBOX_API_KEY || '';

    const [clinics, setClinics] = useState<ClinicData[]>(PREFERRED_PARTNERS);
    const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
    const [locationInput, setLocationInput] = useState('');
    const [activeSearchQuery, setActiveSearchQuery] = useState('Toronto'); // Default search
    const [activeFilter, setActiveFilter] = useState('All');
    const [isSearching, setIsSearching] = useState(false);

    // Scheduling Modal States
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [modalPartner, setModalPartner] = useState<ClinicData | null>(null);

    // Autocomplete states
    const [suggestions, setSuggestions] = useState<MapboxSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Hero Carousel states
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance hero carousel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_THERAPISTS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const mapSectionRef = useRef<HTMLElement>(null);
    const listRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // Derive unique specialties for the filter bar from the *current* queried list
    const specialties = ['All', ...Array.from(new Set(clinics.map(p => p.specialty)))];

    // Filter partners based on the active specialty filter
    const filteredPartners = clinics.filter(partner =>
        activeFilter === 'All' ? true : partner.specialty === activeFilter
    );

    const [searchDebounceTimeout, setSearchDebounceTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
    const mapRef = useRef<MapRef>(null);

    // Fire Mapbox search when activeSearchQuery updates
    useEffect(() => {
        const fetchClinics = async () => {
            setIsSearching(true);
            const center = await searchMapboxCenter(activeSearchQuery, mapboxToken);

            if (center) {
                // Filter PREFERRED_PARTNERS linearly: keep all under 50km
                const localPartners = PREFERRED_PARTNERS.filter(p =>
                    getDistanceFromLatLonInKm(center.lat, center.lng, p.lat, p.lng) < 50
                );

                // If the search returned 0 partners, fall back to showing all partners instead of an empty screen
                setClinics(localPartners.length > 0 ? localPartners : PREFERRED_PARTNERS);

                if (mapRef.current) {
                    const viewClinics = localPartners.length > 0 ? localPartners : PREFERRED_PARTNERS;
                    // Fly to bounds
                    const lats = viewClinics.map(r => r.lat);
                    const lngs = viewClinics.map(r => r.lng);
                    mapRef.current.fitBounds(
                        [
                            [Math.min(...lngs) - 0.05, Math.min(...lats) - 0.05],
                            [Math.max(...lngs) + 0.05, Math.max(...lats) + 0.05]
                        ],
                        { padding: { top: 40, bottom: 40, left: 40, right: 40 }, duration: 1500, maxZoom: 13 }
                    );
                }
            } else {
                setClinics(PREFERRED_PARTNERS);
                if (mapRef.current) {
                    mapRef.current.flyTo({ center: [TORONTO_CENTER.lng, TORONTO_CENTER.lat], zoom: 11 });
                }
            }
            setIsSearching(false);
        };

        if (activeSearchQuery) fetchClinics();
        else setClinics(PREFERRED_PARTNERS);
    }, [activeSearchQuery, mapboxToken]);

    const handleSearch = () => {
        if (locationInput.trim()) {
            setActiveSearchQuery(locationInput);
            setSelectedPartnerId(null);
            setActiveFilter('All');
            setShowSuggestions(false);
            mapSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setLocationInput(val);
        setShowSuggestions(true);

        if (searchDebounceTimeout) clearTimeout(searchDebounceTimeout);

        const newTimeout = setTimeout(async () => {
            if (val.trim() && val.length > 2) {
                const results = await fetchMapboxSuggestions(val, mapboxToken);
                setSuggestions(results);
            } else {
                setSuggestions([]);
            }
        }, 300); // 300ms delay for auto-complete typing

        setSearchDebounceTimeout(newTimeout);
    };

    const handleMarkerClick = (id: string) => {
        setSelectedPartnerId(id);
        if (listRefs.current[id]) {
            listRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };

    return (
        <Layout>
            {/* Split Hero: Dedicated Search Input & Photo Carousel */}
            <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-[#0A0F1E]">
                {/* Global Hero Grain / Background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0A0F1E] to-[#0A0F1E]/95 pointer-events-none z-0"></div>
                <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none z-0"></div>

                <div className="container mx-auto px-4 z-10 relative">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

                        {/* LEFT COLUMN: Search & Copy */}
                        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8 flex-shrink-0">
                            <motion.div
                                initial={{ y: 40, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <span className="inline-block px-4 py-1.5 rounded-full bg-[#00A852]/20 text-[#00D46A] font-bold text-sm tracking-wide mb-6 uppercase border border-[#00D46A]/20 shadow-[0_0_20px_rgba(0,212,106,0.2)]">
                                    Scale Health Network
                                </span>
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight text-white mb-6">
                                    Priority Access Near <br className="hidden md:block" />
                                    <span className="text-[#00A852] font-bold relative inline-block">
                                        You
                                        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-[#00D46A]/50 rounded-full blur-[2px]"></div>
                                    </span>
                                </h1>
                                <p className="text-xl text-gray-300 font-sans leading-relaxed max-w-xl mx-auto lg:mx-0">
                                    Connect with world-class specialists tailored to your specific needs.
                                    Experience the future of digital health.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="bg-white p-2 md:p-3 rounded-3xl md:rounded-full shadow-2xl border border-gray-100 flex flex-col md:flex-row items-center max-w-2xl mx-auto lg:mx-0 focus-within:ring-4 focus-within:ring-[#00A852]/20 transition-all relative z-50 w-full"
                            >
                                <div className="flex-grow relative flex items-center pl-4 bg-transparent w-full">
                                    <Search className="text-gray-400 mr-3 shrink-0" size={24} />
                                    <input
                                        type="text"
                                        value={locationInput}
                                        onChange={handleInputChange}
                                        onFocus={() => setShowSuggestions(true)}
                                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                        placeholder="Enter your city (e.g., 'Vancouver')"
                                        className="w-full py-3 pr-4 bg-transparent border-none focus:ring-0 outline-none font-medium text-gray-800 placeholder-gray-400 text-lg"
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    />

                                    {/* Autocomplete Dropdown */}
                                    {showSuggestions && suggestions.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-3 md:mt-4 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[100] text-left">
                                            {suggestions.map(sugg => (
                                                <button
                                                    key={sugg.id}
                                                    className="w-full px-5 py-3 text-left hover:bg-gray-50 flex items-center justify-between border-b border-gray-50 last:border-0 transition-colors"
                                                    onClick={() => {
                                                        setLocationInput(sugg.place_name);
                                                        setShowSuggestions(false);
                                                        setActiveSearchQuery(sugg.place_name);
                                                        setSelectedPartnerId(null);
                                                        setActiveFilter('All');
                                                        mapSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                                                    }}
                                                >
                                                    <span className="text-gray-800 font-medium truncate pr-4">{sugg.place_name}</span>
                                                    <MapPin className="text-gray-400 shrink-0" size={16} />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={handleSearch}
                                    disabled={isSearching || !locationInput.trim()}
                                    className="w-full md:w-auto mt-2 md:mt-0 btn-physics btn-physics-primary px-8 py-4 rounded-full font-bold hover:bg-black transition-colors shrink-0 flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {isSearching ? <Loader2 className="animate-spin" size={18} /> : 'Search Therapists'}
                                    {!isSearching && <ArrowRight size={18} />}
                                </button>
                            </motion.div>
                        </div>

                        {/* RIGHT COLUMN: Therapist Carousel */}
                        <div className="w-full lg:w-1/2 max-w-lg mx-auto lg:max-w-none relative h-[450px] lg:h-[550px] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 group">
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1 }}
                                    className="absolute inset-0"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-[#0A0F1E]/60 to-transparent z-10" />
                                    <img
                                        src={HERO_THERAPISTS[currentSlide].image}
                                        alt={HERO_THERAPISTS[currentSlide].name}
                                        className="w-full h-full object-cover object-[50%_25%]"
                                    />

                                    <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-left">
                                        <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 leading-tight drop-shadow-md">
                                            "{HERO_THERAPISTS[currentSlide].quote}"
                                        </h3>
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={HERO_THERAPISTS[currentSlide].image}
                                                alt="Avatar"
                                                className="w-14 h-14 rounded-full border-2 border-[#00A852] object-cover shadow-lg"
                                            />
                                            <div>
                                                <p className="font-bold text-white text-lg leading-tight">{HERO_THERAPISTS[currentSlide].name}</p>
                                                <p className="text-sm text-[#00D46A] tracking-wide mt-1">{HERO_THERAPISTS[currentSlide].role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Carousel Indicators */}
                            <div className="absolute top-6 right-6 z-30 flex gap-2">
                                {HERO_THERAPISTS.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentSlide(i)}
                                        className={`h-1.5 rounded-full transition-all ${i === currentSlide ? 'bg-[#00D46A] w-6' : 'bg-white/30 hover:bg-white/60 w-1.5'}`}
                                    />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Map & List Discovery Section */}
            <section ref={mapSectionRef} className="py-20 bg-white border-b border-gray-100 scroll-mt-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-display font-bold text-[#0A0F1E]">Explore Specialists in Your Area</h2>
                        <p className="text-gray-500 mt-2">Select a clinic on the map or browse our verified network partners below to book instantly.</p>

                        {!mapboxToken && (
                            <div className="mt-4 inline-block bg-amber-50 text-amber-800 px-4 py-2 rounded-lg text-sm font-bold border border-amber-200">
                                Warning: Waiting for VITE_MAPBOX_API_KEY in .env
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 items-stretch max-w-7xl mx-auto">

                        {/* LEFT PANEL: Mapbox Premium Map */}
                        <div className="lg:w-1/2 w-full flex flex-col relative h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-xl border border-gray-200 z-10 bg-gray-100">

                            {mapboxToken && (
                                <Map
                                    ref={mapRef}
                                    mapboxAccessToken={mapboxToken}
                                    initialViewState={{
                                        longitude: TORONTO_CENTER.lng,
                                        latitude: TORONTO_CENTER.lat,
                                        zoom: 12.5
                                    }}
                                    mapStyle="mapbox://styles/mapbox/light-v11"
                                    dragPan={true}
                                    scrollZoom={false}
                                    doubleClickZoom={false}
                                >
                                    <MapboxCameraManager clinics={clinics} selectedPartnerId={selectedPartnerId} />
                                    <NavigationControl position="bottom-right" showCompass={false} />

                                    {filteredPartners.map((partner) => {
                                        const isSelected = selectedPartnerId === partner.id;
                                        const isPreferred = partner.type === 'Preferred Partner';

                                        return (
                                            <Marker
                                                key={partner.id}
                                                longitude={partner.lng}
                                                latitude={partner.lat}
                                                anchor="center"
                                                onClick={(e: any) => {
                                                    e.originalEvent.stopPropagation();
                                                    handleMarkerClick(partner.id);
                                                }}
                                                style={{ zIndex: isSelected ? 10 : 1 }}
                                            >
                                                <CustomMapboxMarker isSelected={isSelected} isPreferred={isPreferred} />
                                            </Marker>
                                        );
                                    })}
                                </Map>
                            )}

                            {/* Map Legend Overlay */}
                            <div className="absolute bottom-6 left-6 z-[1000] bg-white/95 backdrop-blur-md px-5 py-4 rounded-xl shadow-lg border border-gray-100 text-xs font-bold text-gray-500">
                                <p className="text-[#0A0F1E] font-bolder mb-3 uppercase tracking-wider border-b border-gray-100 pb-2">Location Key</p>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-6 h-6 rounded-full bg-[#00A852] border-2 border-white shadow-sm flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                                    </div>
                                    <span className="text-[#0A0F1E]">Preferred Partner</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-gray-400 border border-white shadow-sm ml-1 relative left-0.5"></div>
                                    <span className="text-gray-500">Network Partner</span>
                                </div>
                            </div>

                            {/* Reset Map View Button */}
                            {selectedPartnerId && (
                                <div className="absolute top-6 right-6 z-[1000]">
                                    <button
                                        onClick={() => setSelectedPartnerId(null)}
                                        className="bg-white text-[#0A0F1E] px-4 py-2 rounded-lg font-bold shadow-md hover:bg-gray-50 text-sm border border-gray-100 transition-colors"
                                    >
                                        Show All Locations
                                    </button>
                                </div>
                            )}

                        </div>

                        {/* RIGHT PANEL: Therapist List / Search Results */}
                        <div className="lg:w-1/2 w-full flex flex-col h-[600px] lg:h-[700px]">

                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="inline-block px-4 py-1.5 bg-[#E8F5EE] text-[#00A852] font-bold text-xs uppercase tracking-wider rounded-full border border-[#00A852]/20 shadow-sm">
                                        {selectedPartnerId ? '1 Specialist Selected' : `${filteredPartners.length} Specialists Found`}
                                    </span>
                                    {selectedPartnerId && (
                                        <button
                                            onClick={() => setSelectedPartnerId(null)}
                                            className="text-xs font-bold text-gray-500 hover:text-[#0A0F1E] transition-colors"
                                        >
                                            Clear Selection
                                        </button>
                                    )}
                                </div>

                                {/* Filter Pills */}
                                <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
                                    {specialties.map(specialty => (
                                        <button
                                            key={specialty}
                                            onClick={() => {
                                                setActiveFilter(specialty);
                                                setSelectedPartnerId(null);
                                            }}
                                            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all border
                                            ${activeFilter === specialty
                                                    ? 'bg-[#0A0F1E] text-white border-[#0A0F1E]'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                }`}
                                        >
                                            {specialty}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Scrollable List */}
                            <div className="flex-grow overflow-y-auto pr-4 space-y-4 custom-scrollbar">
                                {isSearching ? (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-400 py-12">
                                        <Loader2 className="animate-spin mb-4" size={40} />
                                        <p className="font-medium text-lg text-gray-500">Scanning Area for Specialists...</p>
                                    </div>
                                ) : filteredPartners.length === 0 ? (
                                    <div className="text-center py-12 flex flex-col items-center justify-center h-full bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                        <Search className="text-gray-300 mb-3" size={32} />
                                        <p className="text-gray-500 font-medium">No specialists found for "{activeFilter}"</p>
                                        <button
                                            onClick={() => setActiveFilter('All')}
                                            className="mt-4 text-[#00A852] font-bold hover:underline"
                                        >
                                            View all specialists
                                        </button>
                                    </div>
                                ) : (
                                    filteredPartners.map(partner => (
                                        <div
                                            key={partner.id}
                                            ref={(el) => { listRefs.current[partner.id] = el; }}
                                            onClick={() => setSelectedPartnerId(partner.id === selectedPartnerId ? null : partner.id)}
                                            className={`p-5 rounded-2xl cursor-pointer border-2 relative overflow-hidden card-physics
                                            ${selectedPartnerId === partner.id
                                                    ? 'bg-[#F8FAFB] border-[#00A852] shadow-lg transform -translate-y-1'
                                                    : selectedPartnerId !== null
                                                        ? 'bg-white border-gray-100 opacity-40 hover:opacity-100'
                                                        : partner.type === 'Preferred Partner'
                                                            ? 'bg-white border-[#00A852]/30 hover:border-[#00A852]/60 hover:shadow-md'
                                                            : 'bg-white border-gray-100 hover:border-gray-300 hover:shadow-md'
                                                }`}
                                        >
                                            {/* Background tint for Preferred Partners */}
                                            {partner.type === 'Preferred Partner' && selectedPartnerId !== partner.id && (
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#00A852]/10 to-transparent rounded-bl-full pointer-events-none"></div>
                                            )}

                                            <div className="flex flex-col sm:flex-row gap-5 relative z-10">
                                                {/* Profile Pic */}
                                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-gray-100 relative">
                                                    <img src={partner.image} alt={partner.name} className="w-full h-full object-cover" />
                                                    {partner.type === 'Preferred Partner' && (
                                                        <div className="absolute top-0 right-0 bg-[#00A852] text-white p-1.5 rounded-bl-lg shadow-sm" title="Scale Health Preferred">
                                                            <Award size={14} />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex-grow flex flex-col justify-between">
                                                    <div>
                                                        <div className="flex justify-between items-start mb-1 gap-2">
                                                            <h3 className="font-bold text-lg text-[#0A0F1E] leading-tight flex-grow">{partner.name}</h3>
                                                            {partner.type === 'Preferred Partner' && (
                                                                <span className="bg-[#00A852]/10 text-[#00A852] text-xs uppercase font-extrabold tracking-white px-2.5 py-1 rounded border border-[#00A852]/20 shadow-sm shrink-0 flex items-center gap-1">
                                                                    <Star size={10} className="fill-[#00A852]" /> Preferred
                                                                </span>
                                                            )}
                                                        </div>
                                                        {partner.address && (
                                                            <p className="text-gray-500 text-xs mb-1 mb-2">{partner.address}</p>
                                                        )}
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <p className="text-[#00A852] font-bold text-xs uppercase tracking-wider">{partner.specialty}</p>
                                                            <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded text-xs font-bold text-yellow-700">
                                                                <Star size={12} className="text-yellow-400 fill-yellow-400" /> {partner.rating} ({partner.reviews})
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                                                            {partner.blurb}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-auto">
                                                        <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                                                            <span className="flex items-center gap-1"><Monitor size={14} /> Virtual</span>
                                                            <span className="flex items-center gap-1"><MapPin size={14} /> Clinic Location</span>
                                                        </div>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setModalPartner(partner);
                                                                setIsScheduleModalOpen(true);
                                                            }}
                                                            className={`text-sm font-bold transition-colors flex items-center gap-1 ${selectedPartnerId === partner.id ? 'text-[#00A852]' : 'text-[#0A0F1E] hover:text-[#00A852]'}`}
                                                        >
                                                            View Schedule <ArrowRight size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Stats/Social Proof */}
            <section className="py-12 bg-[#F8FAFB] border-y border-gray-100 mt-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { label: "Active Patients", value: "10k+" },
                            { label: "Specialists", value: "500+" },
                            { label: "Success Rate", value: "98%" },
                            { label: "Insurance Covered", value: "100%" },
                        ].map((stat, i) => (
                            <div key={i}>
                                <p className="text-4xl font-bold text-[#00A852] font-display mb-1">{stat.value}</p>
                                <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ChatBot />

            <ScheduleModal
                isOpen={isScheduleModalOpen}
                onClose={() => setIsScheduleModalOpen(false)}
                partner={modalPartner}
            />

        </Layout>
    );
};

export default LandingPage;
