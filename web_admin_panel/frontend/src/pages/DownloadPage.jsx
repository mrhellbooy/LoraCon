import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Shield, Cpu, Zap, Activity } from 'lucide-react';

export default function DownloadPage() {
  const features = [
    { icon: Shield, title: "Secure Armor", desc: "Charcoal metallic plating fused with AES-256 encryption." },
    { icon: Cpu, title: "Deep Optimization", desc: "Consumes network latency bottlenecks, streamlining packet flows." },
    { icon: Zap, title: "Active Metamorphosis", desc: "Dynamic route evolution in response to environmental resistance." }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#F1F5F9] font-sans">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center pt-24 pb-16 px-6 text-center"
      >
        <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="mb-6">
          <span className="text-green-500 font-mono tracking-widest text-sm uppercase">Lorapok Labs</span>
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Products That <span className="text-green-500">Feel Alive.</span></h1>
        <p className="text-gray-400 mb-10 max-w-xl text-lg">Meet your Cybernetic Black Soldier Fly Larva. A friendly, plump system optimizer that silently consumes bottlenecks and protects your data.</p>
        
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-green-500 text-black px-8 py-4 rounded-md font-bold hover:bg-green-400 transition">
            <ArrowDown size={20} /> Download APK
          </button>
          <a href="/admin" className="flex items-center gap-2 bg-[#1A1A1A] text-white px-8 py-4 rounded-md font-bold hover:bg-[#222] transition">
            <Activity size={20} /> Admin Dashboard
          </a>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl hover:border-green-900 transition"
          >
            <f.icon className="text-green-500 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-700 text-sm border-t border-[#111]">
        <p>© 2026 Lorapok Labs Partners. High-Availability Tunneling Protocol.</p>
      </footer>
    </div>
  );
}
