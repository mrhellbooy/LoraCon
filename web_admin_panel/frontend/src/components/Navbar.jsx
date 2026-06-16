import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center bg-black/50 backdrop-blur-md">
    <Link to="/" className="flex items-center gap-2 text-white font-bold">
      <Logo size={24} /> LoraCon
    </Link>
    <div className="flex gap-4">
      <Link to="/login" className="text-sm text-slate-400 hover:text-white">Login</Link>
      <Link to="/admin" className="text-sm text-slate-400 hover:text-white">Dashboard</Link>
    </div>
  </nav>
);

export default Navbar;
