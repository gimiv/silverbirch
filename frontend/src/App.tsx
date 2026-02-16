import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import OfferPage from './workflows/scale-health/OfferPage';
import LandingPage from './workflows/scale-health/LandingPage';
import IntegratedLandingPage from './workflows/integrated-offer/LandingPage';
// import IntakePage from './workflows/intake/IntakePage'; // Deleted
import PortalPage from './pages/PortalPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

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
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<PortalPage />} />
          {/* <Route path="/w/intake" element={<IntakePage />} /> */}
          <Route path="/w/integrated-offer" element={<IntegratedLandingPage />} />
          <Route path="/w/scale-health/offer" element={<OfferPage />} />
          <Route path="/w/scale-health/landing" element={<LandingPage />} />
          <Route path="/scale-health" element={<LandingPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
