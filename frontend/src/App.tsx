import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import OfferPage from './journeys/scale-health/OfferPage';
import LandingPage from './journeys/scale-health/LandingPage';
import IntegratedLandingPage from './journeys/integrated-offer/LandingPage';
import ShopifyIntakePage from './journeys/scale-health/ShopifyIntakePage';
import InsiderLandingPage from './journeys/insider/LandingPage';
import VirtualClinicLandingPage from './journeys/virtual-clinic/LandingPage';
import { IntakeFlow } from './components/IntakeFlow';
import PortalPage from './pages/PortalPage';
import LoginPage from './pages/LoginPage';
// import ProtectedRoute from './components/ProtectedRoute';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        {/* Public Routes (Auth Removed) */}
        <Route path="/" element={<PortalPage />} />
        <Route path="/w/scale-health/offer" element={<OfferPage />} />
        <Route path="/w/shopify-modal" element={<ShopifyIntakePage />} />
        <Route path="/w/integrated-offer" element={<IntegratedLandingPage />} />
        <Route path="/w/insider" element={<InsiderLandingPage />} />
        <Route path="/w/scale-health/landing" element={<LandingPage />} />
        <Route path="/w/virtual-clinic" element={<VirtualClinicLandingPage />} />
        <Route path="/scale-health" element={<LandingPage />} />
        <Route path="/w/intake" element={<IntakeFlow />} />
      </Routes>
    </Router>
  );
};

export default App;
