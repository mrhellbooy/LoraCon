import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <h1 className="text-5xl font-black tracking-tighter">About <span className="text-[#22c55e]">Lorapok Labs</span></h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Lorapok Labs is a specialized research and development collective focused on high-availability networking and decentralized security protocols. Founded in Bangladesh, we strive to build tools that prioritize user sovereignty and absolute privacy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#22c55e]/30 transition-all">
              <h3 className="text-xl font-bold mb-4">Our Mission</h3>
              <p className="text-slate-500 text-sm">To architect secure tunnels that bypass censorship and surveillance, ensuring information remains free and accessible globally.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#22c55e]/30 transition-all">
              <h3 className="text-xl font-bold mb-4">The Vision</h3>
              <p className="text-slate-500 text-sm">A decentralized internet where every node is a bastion of privacy, powered by light-weight, high-performance LoraCon protocols.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
