import React, { useMemo, useState } from 'react';
import { ArrowRight, CalendarClock, CheckCircle2, ShieldCheck, Stethoscope, Video } from 'lucide-react';

const steps = [
  {
    title: 'Quick Triage',
    description: 'Collect symptoms, urgency, and preferred language in under 2 minutes.'
  },
  {
    title: 'Insurance + Consent',
    description: 'Mock insurance check and consent flow with clear, plain-language prompts.'
  },
  {
    title: 'Provider Match',
    description: 'Show top clinician matches based on specialty, availability, and ratings.'
  },
  {
    title: 'Video Visit Booking',
    description: 'Pick a same-day slot and confirm appointment details instantly.'
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-10 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-secondary/40 px-3 py-1 text-xs font-semibold text-brand-primary mb-4">
              <Stethoscope size={14} />
              Virtual Clinic Prototype
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold leading-tight mb-3">
              From "I need care" to booked visit in one smooth flow.
            </h1>
            <p className="text-slate-600 mb-6">
              This is a realistic mock workflow for patient intake, provider matching, and same-day scheduling.
              No backend integrations — just believable UX and state changes.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mb-8">
              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                <ShieldCheck size={18} className="text-brand-primary mb-2" />
                <p className="text-xs text-slate-500">Compliance</p>
                <p className="font-semibold">Consent built-in</p>
              </div>
              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                <CalendarClock size={18} className="text-brand-primary mb-2" />
                <p className="text-xs text-slate-500">Speed</p>
                <p className="font-semibold">Same-day slots</p>
              </div>
              <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                <Video size={18} className="text-brand-primary mb-2" />
                <p className="text-xs text-slate-500">Format</p>
                <p className="font-semibold">Video first</p>
              </div>
            </div>

            <button
              onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 text-white px-5 py-3 font-medium hover:bg-black transition-colors"
            >
              Next Mock Step <ArrowRight size={16} />
            </button>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Patient Journey Preview</h2>
              <span className="text-sm font-semibold text-brand-primary">Step {progress}</span>
            </div>

            <ol className="space-y-3 mb-6">
              {steps.map((step, index) => {
                const isActive = index === activeStep;
                const isDone = index < activeStep;
                return (
                  <li
                    key={step.title}
                    className={`rounded-xl border p-4 transition-all ${
                      isActive
                        ? 'border-brand-primary bg-brand-secondary/30'
                        : isDone
                          ? 'border-emerald-300 bg-emerald-50'
                          : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {isDone ? (
                          <CheckCircle2 size={18} className="text-emerald-600" />
                        ) : (
                          <div className={`h-4 w-4 rounded-full border-2 ${isActive ? 'border-brand-primary' : 'border-slate-300'}`} />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{step.title}</p>
                        <p className="text-sm text-slate-600">{step.description}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500 mb-3">Suggested Clinicians (Mock)</p>
              <div className="space-y-3">
                {providerPool.map((provider) => (
                  <div key={provider.name} className="flex items-center justify-between bg-white rounded-lg border border-slate-200 px-3 py-2">
                    <div>
                      <p className="font-semibold text-sm">{provider.name}</p>
                      <p className="text-xs text-slate-500">{provider.specialty}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{provider.eta}</p>
                      <p className="text-xs text-slate-500">⭐ {provider.rating}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VirtualClinicLandingPage;
