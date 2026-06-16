import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AdminPanel from './pages/AdminPanel';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';

const ProtectedRoute = ({ children }) => {
  const role = sessionStorage.getItem('role');
  return role ? children : <Navigate to="/login" />;
};

export default function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="admin" element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </HashRouter>
  );
}
