import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Code, Shield, Cpu, Activity, ExternalLink, CreditCard, Zap } from 'lucide-react';

export default function DocsPage() {
  const [activeTab, setActiveTab] = React.useState('Introduction');

  const content = {
    'Introduction': (
      <section id="introduction">
        <h2 className="text-4xl font-black mb-8 border-l-4 border-[#22c55e] pl-6">01. Introduction</h2>
        <div className="prose prose-invert text-slate-400 space-y-6 text-base leading-relaxed">
          <p>LoraCon is a decentralized VPN orchestration engine designed for high-throughput encrypted tunneling. Unlike traditional VPNs, LoraCon utilizes an ephemeral node clustering methodology to ensure maximum invisibility.</p>
          <p>Our stack combines the efficiency of **WireGuard** with the robust fallback mechanisms of **OpenVPN**, all managed via our signature Lorapok Labs cybernetic interface. This hybrid approach allows for speeds exceeding 1Gbps while maintaining a fingerprint-resistant posture.</p>
        </div>
      </section>
    ),
    'Quick Start': (
      <section id="deployment">
        <h2 className="text-4xl font-black mb-8 border-l-4 border-[#22c55e] pl-6">02. Quick Start Handshake</h2>
        <div className="prose prose-invert text-slate-400 space-y-6 text-base leading-relaxed mb-8">
           <p>Get your node running in seconds. All privilege keys are delivered via your admin terminal upon subscription confirmation.</p>
        </div>
        <div className="bg-black/40 rounded-3xl p-8 border border-white/10 font-mono text-xs text-slate-300">
          <span className="text-[#22c55e]"># Initialize LoraCon Node</span><br />
          $ loracon init --mode stealth<br /><br />
          <span className="text-[#22c55e]"># Check node health</span><br />
          $ loracon health --node-id sentinel-01<br /><br />
          <span className="text-slate-500">// Output: Node operational. Latency 14ms.</span>
        </div>
      </section>
    ),
    'Core Protocols': (
      <section id="research">
        <h2 className="text-4xl font-black mb-8 border-l-4 border-[#22c55e] pl-6">03. Core Protocols</h2>
        <div className="prose prose-invert text-slate-400 space-y-6 text-base leading-relaxed">
          <p>The **Lorapok Labs Research** division focuses on quantum-resistant obfuscation. We implement "Noise-as-a-Service" where packets are wrapped in synthetic entropy layers.</p>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4">
            <h4 className="text-[#22c55e] font-black uppercase text-xs tracking-widest">Stealth Methodologies</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-4">
                <Zap className="w-5 h-5 text-[#22c55e] shrink-0" />
                <span><strong>Fragment Polling:</strong> Breaking traffic into micro-shards routed via multi-hop nodes.</span>
              </li>
              <li className="flex gap-4">
                <Activity className="w-5 h-5 text-[#22c55e] shrink-0" />
                <span><strong>Traffic Mimicry:</strong> Shaping VPN traffic to resemble HTTPS, SRT, or standard VoIP streams.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    ),
    'Node Configuration': (
      <section id="config">
        <h2 className="text-4xl font-black mb-8 border-l-4 border-[#22c55e] pl-6">04. Node Configuration</h2>
        <div className="prose prose-invert text-slate-400 space-y-6 text-base leading-relaxed">
          <p>Manual orchestration allows for granular control over entry and exit locations. We support various transport protocols including TCP, UDP, and QUIC-based tunneling for extreme latency reduction.</p>
          <div className="p-8 rounded-3xl bg-[#030711] border border-white/5 font-mono text-sm">
            <p className="text-slate-500 mb-2">// Current active configuration...</p>
            <p className="text-white">transport: stealth_quic</p>
            <p className="text-white">fragment_size: 1500_mtu</p>
            <p className="text-[#22c55e] mt-2">{ " >> " }CONFIG_PUSH: SUCCESS</p>
          </div>
        </div>
      </section>
    ),
    'Security Lexicon': (
      <section id="lexicon">
        <h2 className="text-4xl font-black mb-8 border-l-4 border-[#22c55e] pl-6">05. Security Lexicon</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h4 className="text-white font-bold mb-2 uppercase tracking-tighter">Ephemeral Leakage</h4>
            <p className="text-xs text-slate-500 font-light leading-relaxed">The trace of data left behind during a handshake rotation. Our system minimizes this to zero-trace standards.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h4 className="text-white font-bold mb-2 uppercase tracking-tighter">Chain Entropy</h4>
            <p className="text-xs text-slate-500 font-light leading-relaxed">The randomness of node selection across the global mesh. High entropy ensures low predictability.</p>
          </div>
        </div>
      </section>
    ),
    'API Reference': (
      <section id="crypto-integration">
        <h2 className="text-4xl font-black mb-8 border-l-4 border-[#22c55e] pl-6">06. API Reference (Payment)</h2>
        <div className="prose prose-invert text-slate-400 space-y-8 text-base leading-relaxed">
          <div>
            <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-[#22c55e]" /> Verification Protocol</h3>
            <p>LoraCon supports peer-to-peer settlement via Solana and Binance Smart Chain.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
               <h4 className="text-[#22c55e] font-black uppercase text-[10px] tracking-widest mb-4">Solana (SOL)</h4>
               <ul className="space-y-3 text-sm">
                  <li><strong>Endpoint:</strong> Phantom-supported.</li>
                  <li><strong>Confirmation:</strong> ~400ms.</li>
               </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
               <h4 className="text-[#f3ba2f] font-black uppercase text-[10px] tracking-widest mb-4">Binance (BNB)</h4>
               <ul className="space-y-3 text-sm">
                  <li><strong>Endpoint:</strong> BEP-20.</li>
                  <li><strong>Confirmation:</strong> ~3s.</li>
               </ul>
            </div>
          </div>
        </div>
      </section>
    )
  };

  return (
    <div className="min-h-screen text-white">
      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 mb-12">
            <div className="p-4 rounded-2xl bg-[#22c55e]/10">
              <Book className="w-8 h-8 text-[#22c55e]" />
            </div>
            <h1 className="text-5xl font-black tracking-tighter">Documentation <span className="text-slate-500 text-2xl font-light ml-4">v1.0.10</span></h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Sidebar Nav */}
            <div className="md:col-span-1 space-y-4">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-4">Architecture</h3>
              <nav className="flex flex-col gap-2">
                {Object.keys(content).map((item) => (
                  <button 
                    key={item} 
                    onClick={() => setActiveTab(item)}
                    className={`text-left px-4 py-3 rounded-xl transition-all text-sm font-bold border ${
                      activeTab === item 
                        ? 'bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/30' 
                        : 'text-slate-400 hover:text-white border-transparent hover:bg-white/5'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            {/* Main Content Area */}
            <div className="md:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {content[activeTab]}
                </motion.div>
              </AnimatePresence>

              <div className="pt-20 border-t border-white/5 mt-20">
                <a href="https://github.com/mrhellbooy/LoraCon" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 font-black text-[#22c55e] hover:bg-[#22c55e] hover:text-black transition-all">
                  View Full Technical Specs on GitHub <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
