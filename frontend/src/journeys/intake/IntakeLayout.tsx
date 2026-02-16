import React from 'react';

interface IntakeLayoutProps {
    children: React.ReactNode;
    currentStep: number;
    totalSteps: number;
}

const IntakeLayout: React.FC<IntakeLayoutProps> = ({ children, currentStep, totalSteps }) => {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="min-h-screen bg-[#F4FAF6] font-sans">
            {/* Minimal Header */}
            <header className="bg-white border-b border-gray-100 h-20 flex items-center justify-center sticky top-0 z-10">
                <img
                    src="https://www.scalehealth.ca/assets/logo/scale-health_wordmark.svg"
                    alt="Scale Health"
                    className="h-8"
                />
            </header>

            {/* Progress Bar */}
            <div className="h-1 bg-gray-200 w-full">
                <div
                    className="h-full bg-[#51C580] transition-all duration-500 ease-in-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
                {children}
            </main>
        </div>
    );
};

export default IntakeLayout;
