import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Shield, Cpu, Zap, Activity, ChevronRight, Lock, Server, Cloud } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function DownloadPage() {
  const features = [
    { icon: Shield, title: "Military-Grade Security", desc: "Charcoal metallic plating fused with AES-256 multi-layer encryption." },
    { icon: Cpu, title: "Neural Optimization", desc: "Consumes network latency bottlenecks, streamlining complex packet flows." },
    { icon: Lock, title: "Zero-Knowledge Core", desc: "Private tunneling environment, ensuring absolute user confidentiality." },
    { icon: Server, title: "Distributed Interconnect", desc: "High-speed multi-routing fabric for global content delivery." }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#F1F5F9] font-sans selection:bg-green-500 selection:text-black">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center pt-32 pb-24 px-6 text-center"
      >
        <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="mb-6 flex gap-2 items-center bg-[#111] px-4 py-1.5 rounded-full border border-[#222]">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-green-500 font-mono text-xs uppercase tracking-widest">System Operational</span>
        </motion.div>
        <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight">
          VPN tunneling that <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Feels Alive.</span>
        </h1>
        <p className="text-gray-400 mb-12 max-w-xl text-lg md:text-xl font-light leading-relaxed">
          Meet the Cybernetic Black Soldier Fly Larva. A friendly, plump system optimizer that silently consumes network bottlenecks and protects your data flow.
        </p>
        
        <div className="flex gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-green-500 text-black px-8 py-4 rounded-md font-bold hover:bg-green-400 transition"
          >
            <ArrowDown size={20} /> Download APK
          </motion.button>
          <motion.a 
            href="/admin" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-[#111] border border-[#222] text-white px-8 py-4 rounded-md font-bold hover:bg-[#1A1A1A] transition"
          >
            Access Dashboard <ChevronRight size={20} />
          </motion.a>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-7xl mx-auto px-6 py-24 border-t border-[#111]"
      >
        <div className="mb-16">
            <h2 className="text-sm font-mono text-green-500 mb-4 uppercase tracking-widest text-center">Core Capabilities</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-center tracking-tight">Engineered for the cognitive era.</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className="p-8 bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl hover:border-green-900 transition flex flex-col items-start shadow-xl"
            >
              <div className="bg-[#111] p-3 rounded-lg mb-6 border border-[#222]">
                <f.icon className="text-green-500" size={24} />
              </div>
              <h4 className="text-lg font-bold mb-2">{f.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-20 px-6 text-center text-gray-700 text-sm border-t border-[#111]">
        <div className="flex justify-center gap-8 mb-6">
            <span className="font-bold text-white">Lorapok Labs</span>
            <span className="hover:text-green-500 cursor-pointer">Protocol docs</span>
            <span className="hover:text-green-500 cursor-pointer">API reference</span>
            <span className="hover:text-green-500 cursor-pointer">Enterprise</span>
        </div>
        <p>© 2026 Lorapok Labs. Infrastructure suite for secure, high-availability tunneling.</p>
      </footer>
    </div>
  );
}
