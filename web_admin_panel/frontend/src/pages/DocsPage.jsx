import React from 'react';
import { motion } from 'framer-motion';
import { Book, Code, Shield, Cpu, Activity, ExternalLink } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#030711] text-white">
      <Navbar />
      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-[#22c55e]/10">
              <Book className="w-8 h-8 text-[#22c55e]" />
            </div>
            <h1 className="text-5xl font-black tracking-tighter">Documentation <span className="text-slate-500 text-2xl font-light ml-4">v2.0.4</span></h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar-style Nav */}
            <div className="md:col-span-1 space-y-4">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-4">Architecture</h3>
              <nav className="flex flex-col gap-2">
                {['Introduction', 'Quick Start', 'Core Protocols', 'Node Configuration', 'Security Lexicon', 'API Reference'].map((item) => (
                  <button key={item} className="text-left px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-[#22c55e] transition-all text-sm font-bold border border-transparent hover:border-white/5">
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            {/* Main Content Area */}
            <div className="md:col-span-2 space-y-12">
              <section id="introduction">
                <h2 className="text-3xl font-black mb-6">Introduction</h2>
                <div className="prose prose-invert text-slate-400 space-y-4 text-sm leading-relaxed">
                  <p>LoraCon is a decentralized VPN orchestration engine designed for high-throughput encrypted tunneling. Unlike traditional VPNs, LoraCon utilizes an ephemeral node clustering methodology to ensure maximum invisibility.</p>
                  <p>Our stack combines the efficiency of **WireGuard** with the robust fallback mechanisms of **OpenVPN**, all managed via our signature Lorapok Labs cybernetic interface.</p>
                </div>
              </section>

              <section id="features" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                   <Shield className="w-5 h-5 text-[#22c55e] mb-4" />
                   <h4 className="font-bold text-white mb-2">AES-256-GCM</h4>
                   <p className="text-slate-500 text-xs">Military grade encryption for every packet in the tunnel.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                   <Activity className="w-5 h-5 text-[#22c55e] mb-4" />
                   <h4 className="font-bold text-white mb-2">Load Telemetry</h4>
                   <p className="text-slate-500 text-xs">Real-time bandwidth and latency tracking across the node map.</p>
                </div>
              </section>

              <section id="deployment">
                <h2 className="text-3xl font-black mb-6 flex items-center gap-2">Handshake Protocol <Code className="w-6 h-6 text-slate-600" /></h2>
                <div className="bg-black/40 rounded-2xl p-6 border border-white/10 font-mono text-xs text-slate-300">
                  <span className="text-[#22c55e]"># Initialize LoraCon Node</span><br />
                  $ loracon init --mode stealth<br /><br />
                  <span className="text-[#22c55e]"># Check node health</span><br />
                  $ loracon health --node-id sentinel-01<br /><br />
                  <span className="text-slate-500">// Output: Node operational. Latency 14ms.</span>
                </div>
              </section>

              <a href="https://github.com/mrhellbooy/LoraCon" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-black text-[#22c55e] hover:underline">
                View Full Technical Specs on GitHub <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
