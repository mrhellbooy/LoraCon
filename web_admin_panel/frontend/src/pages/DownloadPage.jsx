import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Terminal } from 'lucide-react';

export default function DownloadPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#050505] text-[#F1F5F9]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">LoraCon VPN</h1>
        <p className="text-gray-400 mb-8 max-w-md">Secure, decentralized VPN tunneling for the cognitive era.</p>
        
        <div className="flex gap-4 justify-center">
          <button className="flex items-center gap-2 bg-green-500 text-black px-6 py-3 rounded font-bold hover:bg-green-400">
            <ArrowDown size={18} /> Download v2.0
          </button>
          <a href="#" className="flex items-center gap-2 bg-[#1A1A1A] text-white px-6 py-3 rounded font-bold hover:bg-[#222]">
            <Github size={18} /> View Source
          </a>
        </div>
      </motion.div>
    </div>
  );
}
