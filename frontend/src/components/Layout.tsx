import React from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-display font-bold text-brand-primary">
                        Scale<span className="text-brand-accent">Health</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                        <Link to="#" className="hover:text-brand-primary transition-colors">Treatments</Link>
                        <Link to="#" className="hover:text-brand-primary transition-colors">Specialists</Link>
                        <Link to="#" className="hover:text-brand-primary transition-colors">About Us</Link>
                        <button className="btn-primary py-2 px-4 text-sm shadow-none">
                            Client Portal
                        </button>
                    </nav>
                </div>
            </header>

            <main className="flex-grow">
                {children}
            </main>

            <footer className="bg-brand-dark text-white py-12">
                <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-display font-bold mb-4">
                            Scale<span className="text-brand-accent">Health</span>
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Your partner in holistic wellness and recovery.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 text-brand-secondary">Services</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>Physiotherapy</li>
                            <li>Massage Therapy</li>
                            <li>Chiropractic</li>
                            <li>Mental Wellness</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 text-brand-secondary">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Contact</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4 text-brand-secondary">Contact</h4>
                        <p className="text-sm text-gray-300 mb-2">support@scalehealth.ca</p>
                        <p className="text-sm text-gray-300">1-800-555-0123</p>
                    </div>
                </div>
                <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center text-xs text-gray-500">
                    © {new Date().getFullYear()} Scale Health. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
