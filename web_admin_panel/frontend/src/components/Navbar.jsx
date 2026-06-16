import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full px-8 py-6 z-[100] flex justify-between items-center group">
    <div className="absolute inset-0 bg-black/40 backdrop-blur-xl border-b border-white/5 pointer-events-none group-hover:bg-black/60 transition-all" />
    <Link to="/" className="relative flex items-center gap-3 text-white font-black tracking-tighter hover:scale-105 transition-transform">
      <Logo size={36} className="text-[#22c55e]" /> 
      <span className="hidden sm:block">LoraCon.</span>
    </Link>
    
    <div className="relative flex items-center gap-1 sm:gap-6">
      <div className="hidden md:flex items-center gap-6 mr-6 pr-6 border-r border-white/10">
        <Link to="/docs" className="text-xs font-bold text-slate-400 hover:text-[#22c55e] transition-colors uppercase tracking-widest">Docs</Link>
        <Link to="/about" className="text-xs font-bold text-slate-400 hover:text-[#22c55e] transition-colors uppercase tracking-widest">About</Link>
        <Link to="/contact" className="text-xs font-bold text-slate-400 hover:text-[#22c55e] transition-colors uppercase tracking-widest">Contact</Link>
      </div>

      <Link to="/login" className="px-5 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors">Login</Link>
      <Link to="/admin">
        <button className="px-5 py-2 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs font-black uppercase tracking-widest hover:bg-[#22c55e] hover:text-black transition-all">
          Terminal
        </button>
      </Link>
    </div>
  </nav>
);

export default Navbar;
