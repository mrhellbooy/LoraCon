import React from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import AdminPanel from './pages/AdminPanel';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';
import DocsPage from './pages/DocsPage';
import LicensePage from './pages/LicensePage';
import { ToastProvider } from './components/Toast';

const ProtectedRoute = ({ children }) => {
  const role = sessionStorage.getItem('role');
  return role ? children : <Navigate to="/login" />;
};

const pageTransitions = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3 }
};

const AnimatedRoute = ({ children }) => (
  <motion.div {...pageTransitions}>
    {children}
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<AnimatedRoute><LandingPage /></AnimatedRoute>} />
          <Route path="login" element={<AnimatedRoute><LoginPage /></AnimatedRoute>} />
          <Route path="register" element={<AnimatedRoute><RegisterPage /></AnimatedRoute>} />
          <Route path="reset-password" element={<AnimatedRoute><ResetPasswordPage /></AnimatedRoute>} />
          <Route path="about" element={<AnimatedRoute><AboutPage /></AnimatedRoute>} />
          <Route path="privacy" element={<AnimatedRoute><PrivacyPage /></AnimatedRoute>} />
          <Route path="contact" element={<AnimatedRoute><ContactPage /></AnimatedRoute>} />
          <Route path="docs" element={<AnimatedRoute><DocsPage /></AnimatedRoute>} />
          <Route path="license" element={<AnimatedRoute><LicensePage /></AnimatedRoute>} />
          <Route path="admin" element={
            <ProtectedRoute>
              <AnimatedRoute><AdminPanel /></AnimatedRoute>
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function AppRouter() {
  return (
    <ToastProvider>
      <HashRouter>
        <AnimatedRoutes />
      </HashRouter>
    </ToastProvider>
  );
}
