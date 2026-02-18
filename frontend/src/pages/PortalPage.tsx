import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Layout, Activity } from 'lucide-react';

const PortalPage: React.FC = () => {
    const navigate = useNavigate();

    const workflows = [
        {
            id: 'shopify-offer',
            title: 'Client Example 1: Shopify Cart Offer',
            description: 'Post-purchase confirmation page with embedded Scale Health offer.',
            path: '/w/scale-health/offer',
            icon: <Activity className="text-brand-primary" size={24} />,
            status: 'Live'
        },
        {
            id: 'scale-health',
            title: 'Client Example 2: Scale Health Landing',
            description: 'Standard Scale Health landing page with intake flow.',
            path: '/w/scale-health/landing',
            icon: <Layout className="text-brand-primary" size={24} />,
            status: 'Live'
        },
        {
            id: 'integrated-offer',
            title: 'Client Example 3: Integrated Landing',
            description: 'Landing page with Dr. Ho offer embedded (Reverted to Scheduler).',
            path: '/w/integrated-offer',
            icon: <Layout className="text-brand-primary" size={24} />,
            status: 'Live'
        },
        {
            id: 'shopify-modal',
            title: 'Client Example 4: Shopify Modal',
            description: 'Shopify Cart Offer with "Talk to Expert" opening a modal intake flow.',
            path: '/w/shopify-modal',
            icon: <Activity className="text-brand-primary" size={24} />,
            status: 'Live'
        },
        {
            id: 'insider',
            title: 'Journey 5: The Insider Club',
            description: 'VIP Concierge flow with dynamic therapist carousel and priority booking.',
            path: '/w/insider',
            icon: <Layout className="text-brand-primary" size={24} />,
            status: 'New'
        },
        {
            id: 'virtual-clinic',
            title: 'Journey 6: Virtual Clinic Intake',
            description: 'Patient check-in to provider match to video visit booking (prototype).',
            path: '/w/virtual-clinic',
            icon: <Activity className="text-brand-primary" size={24} />,
            status: 'New'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans p-8">
            <div className="max-w-5xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">Client Examples</h1>
                    <p className="text-gray-600">Select a journey to preview.</p>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workflows.map((flow) => (
                        <div key={flow.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
                            <div className="p-6 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="bg-brand-secondary/50 p-3 rounded-lg">
                                        {flow.icon}
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${flow.status === 'Live' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                        {flow.status}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{flow.title}</h3>
                                <p className="text-gray-500 text-sm mb-6 flex-grow">{flow.description}</p>

                                <button
                                    onClick={() => flow.path !== '#' && navigate(flow.path)}
                                    disabled={flow.path === '#'}
                                    className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 rounded-lg font-medium hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
                                >
                                    Launch Journey <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PortalPage;
