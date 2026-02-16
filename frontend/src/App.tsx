import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import OfferPage from './workflows/scale-health/OfferPage';
import LandingPage from './workflows/scale-health/LandingPage';
import PortalPage from './pages/PortalPage';

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
        <Route path="/" element={<PortalPage />} />
        <Route path="/w/scale-health/offer" element={<OfferPage />} />
        <Route path="/w/scale-health/landing" element={<LandingPage />} />
        {/* Redirect old routes to new workflow for backward compatibility/dev testing */}
        <Route path="/scale-health" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
