import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AdminPanel from './pages/AdminPanel';
import DownloadPage from './pages/DownloadPage';
import LoginPage from './pages/LoginPage';

const ProtectedRoute = ({ children }) => {
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
  return isAdmin ? children : <Navigate to="/login" />;
};

export default function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DownloadPage />} />
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
