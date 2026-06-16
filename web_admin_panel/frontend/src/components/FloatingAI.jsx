import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingAI() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 p-4 bg-green-500 text-black rounded-full shadow-lg z-50 hover:bg-green-400"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-[#0D0D0D] border border-[#222222] rounded-lg shadow-2xl z-50 p-4 flex flex-col"
          >
            <div className="flex-1 overflow-y-auto text-xs text-gray-300 font-mono">
              <p className="mb-2 text-green-500">[System]: AI Sentinel Active.</p>
              <p>How can I assist you with LoraCon configuration today?</p>
            </div>
            <div className="mt-2 flex gap-2">
              <input className="flex-1 bg-[#1A1A1A] border border-[#333] rounded px-2 py-1 text-xs text-white" placeholder="Ask AI..." />
              <button className="bg-green-500 p-2 rounded text-black"><Send size={14} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
