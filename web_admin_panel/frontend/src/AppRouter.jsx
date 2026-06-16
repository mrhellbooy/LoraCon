import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminPanel from './pages/AdminPanel';
import DownloadPage from './pages/DownloadPage';

export default function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DownloadPage />} />
          <Route path="admin" element={<AdminPanel />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
