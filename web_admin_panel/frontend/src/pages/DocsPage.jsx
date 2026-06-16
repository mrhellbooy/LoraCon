import React from 'react';
import { motion } from 'framer-motion';
import { Book, Code, Shield, Cpu, Activity, ExternalLink, CreditCard, Zap } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="min-h-screen text-white">
      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-[#22c55e]/10">
              <Book className="w-8 h-8 text-[#22c55e]" />
            </div>
            <h1 className="text-5xl font-black tracking-tighter">Documentation <span className="text-slate-500 text-2xl font-light ml-4">v1.0.10</span></h1>
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
            <div className="md:col-span-2 space-y-20">
              <section id="introduction">
                <h2 className="text-4xl font-black mb-8 border-l-4 border-[#22c55e] pl-6">01. Introduction</h2>
                <div className="prose prose-invert text-slate-400 space-y-6 text-base leading-relaxed">
                  <p>LoraCon is a decentralized VPN orchestration engine designed for high-throughput encrypted tunneling. Unlike traditional VPNs, LoraCon utilizes an ephemeral node clustering methodology to ensure maximum invisibility.</p>
                  <p>Our stack combines the efficiency of **WireGuard** with the robust fallback mechanisms of **OpenVPN**, all managed via our signature Lorapok Labs cybernetic interface. This hybrid approach allows for speeds exceeding 1Gbps while maintaining a fingerprint-resistant posture.</p>
                </div>
              </section>

              <section id="research">
                <h2 className="text-4xl font-black mb-8 border-l-4 border-[#22c55e] pl-6">02. Research & Stealth</h2>
                <div className="prose prose-invert text-slate-400 space-y-6 text-base leading-relaxed">
                  <p>The **Lorapok Labs Research** division focuses on quantum-resistant obfuscation. We implement "Noise-as-a-Service" where packets are wrapped in synthetic entropy layers to defeat deep packet inspection (DPI) from state-level actors.</p>
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
                      <li className="flex gap-4">
                        <Cpu className="w-5 h-5 text-[#22c55e] shrink-0" />
                        <span><strong>Neural Balancing:</strong> AI-driven node selection based on global entropy maps.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="brand">
                <h2 className="text-4xl font-black mb-8 border-l-4 border-[#22c55e] pl-6">03. Brand & Aesthetic</h2>
                <div className="prose prose-invert text-slate-400 space-y-6 text-base leading-relaxed">
                  <p>The LoraCon visual identity is rooted in **Bio-Biological Geometry**. We blend organic curves with rigid monolithic structures to represent the symbiosis of human intent and machine precision.</p>
                  <p>The "Cyber Emerald" theme (#22c55e) represents the lifecycle of a secure connection—vibrant, living, and constantly evolving. Our interface is designed to be a "Super Admin Terminal," empowering users with raw data and elegant control.</p>
                </div>
              </section>

              <section id="economics">
                <h2 className="text-4xl font-black mb-8 border-l-4 border-[#22c55e] pl-6">04. Economic Layer</h2>
                <div className="prose prose-invert text-slate-400 space-y-6 text-base leading-relaxed">
                  <p>Access to LoraCon high-bandwidth clusters is managed via decentralized settlement. By utilizing on-chain verification, we ensure user anonymity while maintaining a sustainable infrastructure model.</p>
                </div>
              </section>

              <section id="crypto-integration">
                <h2 className="text-4xl font-black mb-8 border-l-4 border-[#22c55e] pl-6">05. Crypto Payment Integration</h2>
                <div className="prose prose-invert text-slate-400 space-y-8 text-base leading-relaxed">
                  <div>
                    <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-[#22c55e]" /> Payment Verification Protocol</h3>
                    <p>LoraCon supports peer-to-peer settlement via Solana and Binance Smart Chain. Transactions are verified in two stages: automated ledger polling and manual admin clearance for priority privilege keys.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                       <h4 className="text-[#22c55e] font-black uppercase text-[10px] tracking-widest mb-4">Solana (SOL/USDC)</h4>
                       <ul className="space-y-3 text-sm">
                          <li><strong>Endpoint:</strong> Any Phantom-compatible wallet.</li>
                          <li><strong>Verification:</strong> Solscan blockhash comparison.</li>
                          <li><strong>Confirmation:</strong> 1-3 slots (~400ms).</li>
                       </ul>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                       <h4 className="text-[#f3ba2f] font-black uppercase text-[10px] tracking-widest mb-4">Binance (BNB/USDT)</h4>
                       <ul className="space-y-3 text-sm">
                          <li><strong>Endpoint:</strong> BEP-20 compatible wallets.</li>
                          <li><strong>Verification:</strong> BscScan transaction event logs.</li>
                          <li><strong>Confirmation:</strong> 3-15 blocks (~3s).</li>
                       </ul>
                    </div>
                  </div>

                  <div className="p-8 rounded-3xl bg-[#050505] border border-white/5 font-mono text-sm">
                    <h4 className="text-[#22c55e] text-xs font-bold mb-4 uppercase tracking-[0.2em] italic">// Integration Workflow</h4>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <span className="text-slate-600">01.</span>
                        <span>Select Protocol Tier in Checkout Modal.</span>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-slate-600">02.</span>
                        <span>Transmit assets to documented Admin Endpoints.</span>
                      </div>
                      <div className="flex gap-4 border-b border-white/5 pb-4">
                        <span className="text-slate-600">03.</span>
                        <span>Input Transaction Hash for instant synchronization.</span>
                      </div>
                      <div className="pt-2">
                        <p className="text-slate-500 mb-2">// Initializing automated verification loop...</p>
                        <p className="text-white">poll: SOLANA_MAINNET [status: healthy]</p>
                        <p className="text-[#22c55e] mt-2">{ " >> " }PRIVILEGE_KEY_SYNC: OK</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="deployment">
                <h2 className="text-4xl font-black mb-8 border-l-4 border-[#22c55e] pl-6">06. Handshake Protocol</h2>
                <div className="bg-black/40 rounded-3xl p-8 border border-white/10 font-mono text-xs text-slate-300">
                  <span className="text-[#22c55e]"># Initialize LoraCon Node</span><br />
                  $ loracon init --mode stealth<br /><br />
                  <span className="text-[#22c55e]"># Check node health</span><br />
                  $ loracon health --node-id sentinel-01<br /><br />
                  <span className="text-slate-500">// Output: Node operational. Latency 14ms.</span>
                </div>
              </section>

              <div className="pt-10">
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
