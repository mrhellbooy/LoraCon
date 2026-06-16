import React from 'react';
import { Outlet } from 'react-router-dom';
import FloatingAI from './FloatingAI';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#F1F5F9] font-mono">
      <Outlet />
      <FloatingAI />
    </div>
  );
}
