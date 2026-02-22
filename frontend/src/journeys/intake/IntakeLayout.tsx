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
                <div className="flex items-center gap-2.5">
                    <img
                        src="/logos/icon-mark-dark.svg"
                        alt="Scale Health Mark"
                        className="h-7 md:h-8 w-auto shrink-0"
                    />
                    <span className="text-2xl font-display font-bold text-[#0A0F1E] tracking-tight">
                        Scale<span className="text-[#00D46A]">Health</span>
                    </span>
                </div>
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
