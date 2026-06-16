import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import FloatingAI from './FloatingAI';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-[#050505] text-[#F1F5F9] font-mono flex flex-col">
      {!isAdmin && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isAdmin && <Footer />}
      <FloatingAI />
    </div>
  );
}
