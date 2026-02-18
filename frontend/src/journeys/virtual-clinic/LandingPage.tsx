import React, { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle, Clock3, ShieldCheck, Stethoscope, Video, Sparkles } from 'lucide-react';
import Layout from '../../components/Layout';

const steps = [
  {
    title: 'Quick Triage',
    description: 'Patient shares symptoms, urgency, and language in under two minutes.'
  },
  {
    title: 'Coverage + Consent',
    description: 'Workflow confirms insurance details and records required telehealth consent.'
  },
  {
    title: 'Clinician Match',
    description: 'System recommends best-fit providers based on specialty and availability.'
  },
  {
    title: 'Visit Confirmation',
    description: 'Patient chooses a slot and receives instant visit details by email/SMS.'
  }
];

const providerPool = [
  { id: 'maya', name: 'Dr. Maya Patel', specialty: 'Family Medicine', eta: 'Today • 2:30 PM', rating: '4.9' },
  { id: 'jordan', name: 'Dr. Jordan Lee', specialty: 'Internal Medicine', eta: 'Today • 4:10 PM', rating: '4.8' },
  { id: 'elena', name: 'Dr. Elena Cruz', specialty: 'Urgent Care', eta: 'Tomorrow • 9:00 AM', rating: '4.9' }
];

const slots = ['Today • 2:30 PM', 'Today • 4:10 PM', 'Today • 6:00 PM', 'Tomorrow • 9:00 AM'];

const VirtualClinicLandingPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState(providerPool[0].id);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [error, setError] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const progress = useMemo(() => `${activeStep + 1}/${steps.length}`, [activeStep]);

  const goToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const continueToSlots = () => {
    setActiveStep(3);
    goToSection('booking');
  };

  const confirmBooking = () => {
    if (!selectedSlot) {
      setError('Please pick an appointment time before confirming.');
      return;
    }
    setError('');
    setIsConfirmed(true);
  };

  return (
    <Layout>
      <section className="relative min-h-[620px] bg-[#050806] overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=1800"
            alt="Virtual clinic consultation"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050806] via-[#050806]/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-20 py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#51C580]/20 text-[#95E9B7] font-bold text-xs tracking-widest uppercase mb-6">
              <Stethoscope size={14} /> Virtual Clinic Prototype
            </span>

            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-tight mb-6">
              Fast online care,
              <span className="text-[#51C580]"> minus the friction.</span>
            </h1>

            <p className="text-lg text-white/80 max-w-2xl leading-relaxed mb-10">
              Designed for virtual clinics that need higher conversion from first symptom check to booked video consult.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                className="bg-[#51C580] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#46ad70] transition-all shadow-lg hover:shadow-[#51C580]/30 flex items-center justify-center gap-2"
              >
                Advance Journey Step <ArrowRight size={18} />
              </button>
              <button
                onClick={() => goToSection('journey')}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Video size={18} /> View Flow Details
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#050806] border-t border-white/10 py-8">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 text-white/60 text-sm uppercase tracking-widest font-medium">
          <span className="flex items-center gap-2"><ShieldCheck size={17} className="text-[#51C580]" /> HIPAA-aligned consent messaging</span>
          <span className="flex items-center gap-2"><Clock3 size={17} className="text-[#51C580]" /> Same-day telehealth slots</span>
          <span className="flex items-center gap-2"><Sparkles size={17} className="text-[#51C580]" /> Sales-ready patient experience</span>
        </div>
      </section>

      <section id="journey" className="py-24 bg-[#F4FAF6]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[#51C580] font-bold tracking-widest uppercase text-sm">Journey Preview</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#050806] mt-3">From symptom to scheduled visit</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Built to mirror the portal’s current premium style while keeping the workflow practical and clickable.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-2xl font-bold text-[#050806]">Patient Journey Steps</h3>
                <span className="text-sm font-bold text-[#51C580]">Step {progress}</span>
              </div>

              <ol className="space-y-3">
                {steps.map((step, index) => {
                  const isActive = index === activeStep;
                  const isDone = index < activeStep;
                  return (
                    <li
                      key={step.title}
                      className={`rounded-2xl border p-4 transition-all ${
                        isActive
                          ? 'border-[#95E9B7] bg-[#F4FAF6]'
                          : isDone
                            ? 'border-emerald-200 bg-emerald-50'
                            : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {isDone ? (
                          <CheckCircle size={18} className="text-[#51C580] mt-0.5" />
                        ) : (
                          <div className={`w-4 h-4 rounded-full mt-1 border-2 ${isActive ? 'border-[#51C580]' : 'border-gray-300'}`} />
                        )}
                        <div>
                          <p className="font-bold text-[#050806]">{step.title}</p>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <h3 className="text-2xl font-bold text-[#050806] mb-5">Matched Clinicians</h3>

              <div className="space-y-3 mb-6">
                {providerPool.map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => setSelectedProvider(provider.id)}
                    className={`w-full text-left flex items-center justify-between rounded-2xl border p-4 transition-colors ${
                      selectedProvider === provider.id
                        ? 'border-[#51C580] bg-[#F4FAF6]'
                        : 'border-gray-200 hover:border-[#95E9B7]'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-[#050806]">{provider.name}</p>
                      <p className="text-sm text-gray-500">{provider.specialty}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#050806]">{provider.eta}</p>
                      <p className="text-xs text-gray-500">⭐ {provider.rating}</p>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={continueToSlots}
                className="w-full bg-[#51C580] text-white font-bold py-4 rounded-full hover:bg-[#46ad70] transition-all flex items-center justify-center gap-2 shadow-md"
              >
                Continue to Slot Selection <ArrowRight size={18} />
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">Demo workflow — actions are interactive and stateful.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-[#F4FAF6] rounded-3xl p-8 border border-[#95E9B7]/40">
            <h3 className="text-3xl font-display font-bold text-[#050806] mb-2">Confirm the video visit</h3>
            <p className="text-gray-600 mb-6">Select a time slot and complete the mock confirmation step.</p>

            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              {slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => {
                    setSelectedSlot(slot);
                    setError('');
                    setIsConfirmed(false);
                  }}
                  className={`rounded-xl border px-4 py-3 text-left font-medium transition-colors ${
                    selectedSlot === slot
                      ? 'border-[#51C580] bg-white text-[#050806]'
                      : 'border-gray-200 bg-white/80 text-gray-700 hover:border-[#95E9B7]'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

            <button
              onClick={confirmBooking}
              className="w-full sm:w-auto bg-[#050806] text-white px-8 py-3 rounded-full font-bold hover:bg-black transition-colors"
            >
              Confirm Video Visit
            </button>

            {isConfirmed && (
              <div className="mt-5 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800">
                <p className="font-semibold">Visit confirmed for {selectedSlot}.</p>
                <p className="text-sm mt-1">Confirmation details sent (mock) to patient email and SMS.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VirtualClinicLandingPage;
