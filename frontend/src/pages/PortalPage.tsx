import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Layout, Activity } from 'lucide-react';

const PortalPage: React.FC = () => {
    const navigate = useNavigate();

    const workflows = [
        {
            id: 'scale-health',
            title: 'Scale Health Partner Flow',
            description: 'Post-purchase offer from Dr. Ho → Scale Health Landing Page → Scheduler.',
            path: '/w/scale-health/offer',
            icon: <Activity className="text-brand-primary" size={24} />,
            status: 'Live'
        },
        // Future workflows can be added here
        {
            id: 'coming-soon',
            title: 'Future Workflow',
            description: 'Placeholder for the next prototype iteration.',
            path: '#',
            icon: <Layout className="text-gray-400" size={24} />,
            status: 'Draft'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans p-8">
            <div className="max-w-5xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">Sample Workflows</h1>
                    <p className="text-gray-600">Select a workflow to preview.</p>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workflows.map((flow) => (
                        <div key={flow.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6">
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
                                <p className="text-gray-500 text-sm mb-6 h-10">{flow.description}</p>

                                <button
                                    onClick={() => flow.path !== '#' && navigate(flow.path)}
                                    disabled={flow.path === '#'}
                                    className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 rounded-lg font-medium hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Launch Workflow <ArrowRight size={16} />
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
