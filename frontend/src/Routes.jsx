import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Header from "components/ui/Header";
import Homepage from "pages/homepage";
import OurVisionMissionPage from "pages/our-vision-mission-page";
import AndolanTimelinePage from "pages/andolan-timeline-page";
import TeamLeadershipPage from "pages/team-leadership-page";
import AdminDashboard from "pages/admin-dashboard";
import MemberRegistrationModal from "pages/member-registration-modal";
import InformationCenterPage from "pages/information-center-page";
import AboutPage from "pages/about-page";
import YouthLeadershipProgramModal from "pages/youth-leadership-program-modal";
import Login from "pages/login";
import NotFound from "pages/NotFound";
import PrivateRoute from "components/PrivateRoute";
import { AuthProvider } from "contexts/AuthContext";

const Routes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
          <ScrollToTop />
          <RouterRoutes>
            {/* Public Routes */}
            <Route path="/" element={<><Header /><Homepage /></>} />
            <Route path="/homepage" element={<><Header /><Homepage /></>} />
            <Route path="/login" element={<Login />} />
            <Route path="/our-vision-mission-page" element={<><Header /><OurVisionMissionPage /></>} />
            <Route path="/andolan-timeline-page" element={<><Header /><AndolanTimelinePage /></>} />
            <Route path="/team-leadership-page" element={<><Header /><TeamLeadershipPage /></>} />
            <Route path="/member-registration-modal" element={<><Header /><MemberRegistrationModal /></>} />
            <Route path="/information-center-page" element={<><Header /><InformationCenterPage /></>} />
            <Route path="/about-page" element={<><Header /><AboutPage /></>} />
            <Route path="/youth-leadership-program-modal" element={<><Header /><YouthLeadershipProgramModal /></>} />
            
            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/admin-dashboard" element={<><Header /><AdminDashboard /></>} />
              <Route path="/admin-dashboard/*" element={<><Header /><AdminDashboard /></>} />
            </Route>
            
            <Route path="*" element={<><Header /><NotFound /></>} />
          </RouterRoutes>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routes;