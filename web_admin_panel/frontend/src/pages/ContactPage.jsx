import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, MapPin, Github, Twitter } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-20"
        >
          <div>
            <h1 className="text-5xl font-black tracking-tighter mb-8">Get in <span className="text-[#22c55e]">Touch</span></h1>
            <p className="text-slate-400 text-lg mb-12">
              Have questions about LoraCon architecture or node orchestration? Reach out to the Lorapok Labs collective.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'lorapokdev@gmail.com' },
                { icon: Github, label: 'GitHub', value: 'github.com/lorapok' },
                { icon: Twitter, label: 'X / Twitter', value: '@lorapoklabs' },
                { icon: MapPin, label: 'HQ', value: 'Bangladesh, South Asia' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#22c55e]/30 transition-all">
                  <div className="p-3 rounded-xl bg-[#22c55e]/10">
                    <item.icon className="w-5 h-5 text-[#22c55e]" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase">{item.label}</p>
                    <p className="text-slate-300 font-mono text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-10 rounded-[2.5rem] bg-[#0D0D0D] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#22c55e]/5 blur-[80px] rounded-full -mr-20 -mt-20" />
            <h3 className="text-2xl font-black mb-8 relative z-10">Direct Message</h3>
            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Identity</label>
                <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#22c55e]/50 transition-all font-mono text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Payload Address</label>
                <input type="email" placeholder="email@address.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#22c55e]/50 transition-all font-mono text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Transmission</label>
                <textarea placeholder="Message content..." rows="4" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-[#22c55e]/50 transition-all font-mono text-sm resize-none"></textarea>
              </div>
              <button disabled className="w-full py-5 rounded-2xl bg-[#22c55e] text-black font-black hover:brightness-110 transition-all opacity-50 cursor-not-allowed">
                SEND PAYLOAD (Maintenance)
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
