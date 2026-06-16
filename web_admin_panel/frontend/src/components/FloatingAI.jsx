import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

export default function FloatingAI() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        className="fixed bottom-8 right-8 z-50 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute -inset-8 bg-[#22c55e] blur-[30px] rounded-full pointer-events-none" 
          />
          <div className="absolute -inset-4 bg-[#22c55e]/20 blur-[20px] rounded-full group-hover:bg-[#22c55e]/30 transition-all" />
          <Logo size={60} isConnected={true} className="relative z-10" />
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-28 right-8 w-80 h-[480px] bg-[#030711] border border-white/10 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden backdrop-blur-xl"
          >
            <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Logo size={24} />
                <span className="text-xs font-bold tracking-widest text-[#22c55e]">LORA-CON AI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 text-xs text-slate-400 font-mono space-y-4">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5 self-start mr-8">
                <p className="text-[#22c55e] mb-1">$ system.init()</p>
                Greetings Pioneer. I am LoraCon's sentient network companion. ask me any security, crypto, or Lorapok protocol queries.
              </div>
            </div>

            <div className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
              <input 
                className="flex-1 bg-[#111] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#22c55e]/50 transition-all font-mono" 
                placeholder="Type command..." 
              />
              <button className="bg-[#22c55e] p-2 rounded-xl text-black hover:scale-105 transition-transform">
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
