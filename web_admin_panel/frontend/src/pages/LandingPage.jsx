import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Shield, Cpu, Zap, Activity, ChevronRight, Lock, Server, Cloud, Globe } from 'lucide-react';

const Terminal = () => {
  const [lines, setLines] = useState([]);
  
  useEffect(() => {
    const sequence = [
      { text: "root@loracon:~# ./initialize_larva_core.sh", delay: 0 },
      { text: "[OK] Plating armor initialized...", delay: 1500 },
      { text: "[OK] Neon-green sensors active...", delay: 3000 },
      { text: "Larva is now consuming latency.", delay: 4500, color: "text-cyan-400" },
    ];
    
    sequence.forEach((line) => {
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
      }, line.delay);
    });
  }, []);

  return (
    <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 font-mono text-sm text-green-500 text-left w-full max-w-lg mb-12 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-cyan-500"></div>
      <div className="text-xs text-gray-500 mb-4 uppercase tracking-wider">sys.log</div>
      {lines.map((line, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, x: -10 }} 
          animate={{ opacity: 1, x: 0 }}
          className={`mb-2 ${line.color || ""}`}
        >
          {line.text}
        </motion.div>
      ))}
    </div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function LandingPage() {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const startDownload = () => {
    setIsDownloading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setDownloadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        window.location.href = 'downloads/loracon-latest.apk';
        setIsDownloading(false);
        setDownloadProgress(0);
      }
    }, 30);
  };
  const features = [
    { icon: Shield, title: "Military-Grade Security", desc: "Charcoal metallic plating fused with AES-256 multi-layer encryption." },
    { icon: Cpu, title: "Neural Optimization", desc: "Consumes network latency bottlenecks, streamlining complex packet flows." },
    { icon: Lock, title: "Zero-Knowledge Core", desc: "Private tunneling environment, ensuring absolute user confidentiality." },
    { icon: Server, title: "Distributed Interconnect", desc: "High-speed multi-routing fabric for global content delivery." },
    { icon: Globe, title: "Global Relay Points", desc: "Latency-minimized edge relay nodes for rapid content access." },
    { icon: Zap, title: "Dynamic Routing", desc: "Self-healing tunnel paths optimized in millisecond cycles." }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-green-500 selection:text-black">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center pt-32 pb-24 px-6 text-center"
      >
        <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="mb-6 flex gap-2 items-center bg-[#111] px-4 py-1.5 rounded-full border border-[#222]">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-green-500 font-mono text-xs uppercase tracking-widest">Powered by Lorapok Labs</span>
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter">
          Tunneling that <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Feels Alive.</span>
        </h1>
        
        <p className="text-gray-400 mb-12 max-w-2xl text-lg md:text-xl font-light leading-relaxed">
          The Cybernetic Black Soldier Fly Larva is your silent system optimizer. It consumes network bottlenecks and protects your data flow with adaptive, military-grade protocol shielding.
        </p>

        <Terminal />
        
        <div className="flex flex-col items-center gap-4">
          <motion.button 
            onClick={startDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isDownloading}
            className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition disabled:opacity-50"
          >
            <ArrowDown size={20} /> {isDownloading ? "Downloading..." : "Download Client"}
          </motion.button>
          
          {isDownloading && (
            <div className="w-64 h-2 bg-[#111] rounded-full overflow-hidden">
                <motion.div className="h-full bg-green-500" style={{ width: `${downloadProgress}%` }} />
            </div>
          )}
          
          <motion.a 
            href="#/admin" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-[#111] border border-[#222] text-gray-300 px-8 py-3 rounded-full font-bold hover:bg-[#1A1A1A] transition"
          >
            Dashboard <ChevronRight size={16} />
          </motion.a>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto px-6 py-24 border-t border-[#111]"
      >
        <div className="mb-16">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight">Core Infrastructure.</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className="p-8 bg-[#0a0a0a] border border-[#1a1a1a] rounded-2xl hover:border-green-900 transition flex flex-col items-start"
            >
              <div className="bg-[#111] p-3 rounded-xl mb-6 border border-[#222]">
                <f.icon className="text-green-500" size={24} />
              </div>
              <h4 className="text-xl font-semibold mb-2">{f.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-[#111]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
                <span className="font-bold text-white text-lg">Lorapok Labs</span>
            </div>
            <div className="flex flex-col gap-3">
                <span className="font-semibold text-gray-200">Protocol</span>
                <span className="hover:text-green-500 cursor-pointer text-gray-500 text-sm">Documentation</span>
                <span className="hover:text-green-500 cursor-pointer text-gray-500 text-sm">API Reference</span>
            </div>
            <div className="flex flex-col gap-3">
                <span className="font-semibold text-gray-200">Company</span>
                <span className="hover:text-green-500 cursor-pointer text-gray-500 text-sm">About Us</span>
                <span className="hover:text-green-500 cursor-pointer text-gray-500 text-sm">Careers</span>
            </div>
            <div className="flex flex-col gap-3">
                <span className="font-semibold text-gray-200">Legal</span>
                <span className="hover:text-green-500 cursor-pointer text-gray-500 text-sm">Privacy</span>
                <span className="hover:text-green-500 cursor-pointer text-gray-500 text-sm">Terms</span>
            </div>
        </div>
        <p className="text-center text-gray-700 text-xs mt-16 pt-8 border-t border-[#111]">© 2026 Lorapok Labs. Infrastructure suite for secure, high-availability tunneling.</p>
      </footer>
    </div>
  );
}
