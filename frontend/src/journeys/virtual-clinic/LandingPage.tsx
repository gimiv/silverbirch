import React, { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle, Clock3, ShieldCheck, Stethoscope, Video, Sparkles } from 'lucide-react';
import Layout from '../../components/Layout';

const steps = [
  {
    title: 'Quick Triage',
    description: 'Collect symptoms, urgency, and language preference in under 2 minutes.'
  },
  {
    title: 'Insurance + Consent',
    description: 'Mock insurance verification and clear consent prompts.'
  },
  {
    title: 'Provider Match',
    description: 'Rank clinicians by specialty fit, availability, and patient rating.'
  },
  {
    title: 'Video Visit Confirmed',
    description: 'Book an available slot and send visit details instantly.'
  }
];

const providerPool = [
  { name: 'Dr. Maya Patel', specialty: 'Family Medicine', eta: 'Today • 2:30 PM', rating: '4.9' },
  { name: 'Dr. Jordan Lee', specialty: 'Internal Medicine', eta: 'Today • 4:10 PM', rating: '4.8' },
  { name: 'Dr. Elena Cruz', specialty: 'Urgent Care', eta: 'Tomorrow • 9:00 AM', rating: '4.9' }
];

const VirtualClinicLandingPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const progress = useMemo(() => `${activeStep + 1}/${steps.length}`, [activeStep]);

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
              A realistic patient journey mock: triage → consent → provider match → same-day video visit.
              Prototype only, built for speed and confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                className="bg-[#51C580] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#46ad70] transition-all shadow-lg hover:shadow-[#51C580]/30 flex items-center justify-center gap-2"
              >
                Next Mock Step <ArrowRight size={18} />
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                <Video size={18} /> See Video Visit Flow
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#050806] border-t border-white/10 py-8">
        <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 text-white/60 text-sm uppercase tracking-widest font-medium">
          <span className="flex items-center gap-2"><ShieldCheck size={17} className="text-[#51C580]" /> Consent-first UX</span>
          <span className="flex items-center gap-2"><Clock3 size={17} className="text-[#51C580]" /> Same-day booking</span>
          <span className="flex items-center gap-2"><Sparkles size={17} className="text-[#51C580]" /> Confidence-focused copy</span>
        </div>
      </section>

      <section className="py-24 bg-[#F4FAF6]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[#51C580] font-bold tracking-widest uppercase text-sm">Journey Preview</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#050806] mt-3">From symptom to scheduled visit</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">
              Same structure as existing portal journeys — just tailored for virtual clinic intake.
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
              <h3 className="text-2xl font-bold text-[#050806] mb-5">Matched Clinicians (Mock)</h3>

              <div className="space-y-3 mb-6">
                {providerPool.map((provider) => (
                  <div key={provider.name} className="flex items-center justify-between rounded-2xl border border-gray-200 p-4 hover:border-[#95E9B7] transition-colors">
                    <div>
                      <p className="font-bold text-[#050806]">{provider.name}</p>
                      <p className="text-sm text-gray-500">{provider.specialty}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#050806]">{provider.eta}</p>
                      <p className="text-xs text-gray-500">⭐ {provider.rating}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full bg-[#51C580] text-white font-bold py-4 rounded-full hover:bg-[#46ad70] transition-all flex items-center justify-center gap-2 shadow-md">
                Continue to Slot Selection <ArrowRight size={18} />
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">Demo behavior only — no live scheduling integration.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VirtualClinicLandingPage;
