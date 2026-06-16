import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Download, 
  X,
  Smartphone,
  Monitor,
  Apple,
  Terminal,
  ExternalLink,
  Github,
  Twitter,
  Mail,
  Linkedin,
  MessageSquare,
  UserCheck,
  Instagram,
  Facebook,
  Activity,
  Cpu,
  Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Logo from '../components/Logo';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(34,197,94,0.1)' }}
    className="relative p-8 rounded-[2rem] bg-[#0D0D0D] border border-white/5 hover:border-[#22c55e]/30 transition-all group overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#22c55e]/5 blur-[40px] rounded-full -mr-16 -mt-16 group-hover:bg-[#22c55e]/10 transition-colors" />
    <div className="relative z-10">
      <div className="w-14 h-14 rounded-2xl bg-[#22c55e]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7 text-[#22c55e]" />
      </div>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
    </div>
  </motion.div>
);

const TabManModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="w-full max-w-2xl bg-[#0D0D0D] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#22c55e]/10 flex items-center justify-center">
              <Download className="w-5 h-5 text-[#22c55e]" />
            </div>
            <div>
              <h3 className="text-xl font-bold">LORAPOK ECOSYSTEM</h3>
              <p className="text-xs text-slate-500 font-mono">v4.0.2 ARM64/X86_64</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors">
            <X size={24} className="text-slate-500" />
          </button>
        </div>
        <div className="p-8 gap-4 grid grid-cols-1 sm:grid-cols-2">
          {[
            { name: 'Android APK', size: '24.5 MB', icon: Smartphone, link: '#' },
            { name: 'Windows Client', size: '48.2 MB', icon: Monitor, link: '#' },
            { name: 'macOS DMG', size: '42.1 MB', icon: Apple, link: '#' },
            { name: 'Linux Binary', size: '18.9 MB', icon: Terminal, link: '#' },
          ].map((item, i) => (
            <motion.a
              key={item.name}
              href={item.link}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-[#22c55e]/50 hover:bg-[#22c55e]/5 transition-all group"
            >
              <item.icon className="w-8 h-8 text-slate-500 group-hover:text-[#22c55e] mb-4 transition-colors" />
              <div className="font-bold text-white mb-1">{item.name}</div>
              <div className="text-xs text-slate-500 font-mono">{item.size}</div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const LorapokVpnDemo = () => {
  const [status, setStatus] = useState('IDLE'); // IDLE, CONNECTING, CONNECTED

  return (
    <div className="relative w-full h-full bg-[#050505] p-8 flex flex-col font-mono text-[10px]">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Logo size={20} isConnecting={status === 'CONNECTING'} isConnected={status === 'CONNECTED'} />
          <span className="text-[#22c55e] font-bold">LORA-CON PORTAL v2</span>
        </div>
        <div className={`px-2 py-0.5 rounded-full border ${status === 'CONNECTED' ? 'bg-[#22c55e]/10 border-[#22c55e] text-[#22c55e]' : 'bg-white/5 border-white/10 text-slate-500'}`}>
          {status}
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-hidden">
        <p className="text-slate-600">$ lora --status</p>
        <p className="text-slate-400">Node: [NONE]</p>
        <p className="text-slate-400">Latency: 0ms</p>
        {status !== 'IDLE' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
            <p className="text-blue-400">$ lora --connect to us_east_sentinel</p>
            <p className="text-slate-500">>> Initiating Handshake [ChaCha20-Poly1305]</p>
            <p className="text-slate-500">>> Generating Ephemeral Keys [Curve25519]</p>
            {status === 'CONNECTED' && (
              <>
                <p className="text-[#22c55e]">>> ENCRYPTED TUNNEL ESTABLISHED</p>
                <p className="text-[#22c55e]">>> IP: 194.22.18.243 (MASKED)</p>
                <div className="pt-4 grid grid-cols-2 gap-4">
                   <div className="p-3 rounded-xl bg-[#22c55e]/5 border border-[#22c55e]/20">
                      <div className="text-slate-500 mb-1">DOWNLINK</div>
                      <div className="text-lg font-bold text-white">42.5 Mbps</div>
                   </div>
                   <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/20">
                      <div className="text-slate-500 mb-1">UPLINK</div>
                      <div className="text-lg font-bold text-white">12.8 Mbps</div>
                   </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>

      <button 
        onClick={() => {
          if (status === 'IDLE') {
            setStatus('CONNECTING');
            setTimeout(() => setStatus('CONNECTED'), 2000);
          } else {
            setStatus('IDLE');
          }
        }}
        className={`mt-4 w-full py-4 rounded-2xl font-bold transition-all ${status === 'CONNECTED' ? 'bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500/20' : 'bg-[#22c55e]/10 border border-[#22c55e]/50 text-[#22c55e] hover:bg-[#22c55e]/20'}`}
      >
        {status === 'CONNECTED' ? 'DISCONNECT' : status === 'CONNECTING' ? 'ARMING...' : 'INITIATE TUNNEL'}
      </button>
    </div>
  );
};

export default function LandingPage() {
  const [isTabManOpen, setIsTabManOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030711] text-white selection:bg-[#22c55e]/30 selection:text-[#22c55e]">
      <Navbar />
      <AnimatePresence>
        {isTabManOpen && <TabManModal isOpen={isTabManOpen} onClose={() => setIsTabManOpen(false)} />}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-[#22c55e]/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-[400px] bg-[#22c55e]/5 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs font-bold uppercase tracking-[0.2em] mb-8"
              >
                <Activity className="w-3.5 h-3.5" /> Lorapok Labs Protocol V2.0
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-6xl md:text-8xl font-black leading-[0.85] tracking-tighter mb-10"
              >
                SECURE THE <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#22c55e] to-[#166534]">EDGE</span>.<br />
                OWN THE <span className="text-white">FLOW.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-slate-400 text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-light"
              >
                LoraCon provides a decentralized, high-speed encrypted tunneling ecosystem 
                designed for the next generation of privacy. High-performance relays,
                military-grade encryption, and zero-latency routing.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-5"
              >
                <Link to="/admin">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34,197,94,0.3)' }}
                    whileTap={{ scale: 0.97 }}
                    className="px-10 py-5 rounded-2xl bg-[#22c55e] text-black font-black text-lg flex items-center gap-3 transition-shadow"
                  >
                    <Cpu className="w-5 h-5" /> Launch Terminal
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.08)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsTabManOpen(true)}
                  className="px-10 py-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md font-bold text-lg flex items-center gap-3"
                >
                  <Download className="w-5 h-5" /> Get App
                </motion.button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-[#22c55e]/20 blur-[120px] rounded-full" />
              <div className="relative z-10 bg-gradient-to-tr from-[#111] to-[#0D0D0D] p-1 rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden aspect-square">
                 <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="w-full h-full bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px]" />
                 </div>
                 <LorapokVpnDemo />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-32 px-6 bg-[#050505]/50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-20">
            <div className="max-w-2xl">
              <span className="text-[#22c55e] font-mono text-sm uppercase tracking-widest block mb-4">// CORE ARCHITECTURE</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Engineered for absolute invisibility.</h2>
            </div>
            <p className="text-slate-500 max-w-sm text-sm">
              Our infrastructure utilizes ephemeral node clustering to ensure your footprint remains non-existent across global networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Shield} 
              title="Military Privacy" 
              description="Full WireGuard & OpenVPN integration with AES-256 bit encryption and perfect forward secrecy."
              delay={0.1}
            />
            <FeatureCard 
              icon={Zap} 
              title="Quantum Routing" 
              description="Low-latency transit through our proprietary multi-hop relay network across 60+ global regions."
              delay={0.2}
            />
            <FeatureCard 
              icon={Lock} 
              title="Zero Ledger" 
              description="We enforce a strict no-logs policy, audited by automated Solana-based transparency tools."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Master Control Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#22c55e]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 text-xs font-bold uppercase tracking-wider">
               <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" /> Infrastructure Suite
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">
              Master <span className="text-[#22c55e]">Control</span> Gate.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
              Manage your global VPN node orchestration through our high-tech terminal interface. Monitor load telemetry, active sessions, and network health in real-time.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/admin">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  className="bg-white text-black px-8 py-4 rounded-2xl font-black flex items-center gap-2"
                >
                  Enter Console <Cpu className="w-4 h-4" />
                </motion.button>
              </Link>
              <a href="https://github.com/mrhellbooy/LoraCon" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-all font-bold flex items-center gap-2">
                Github Source <Github className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
             {/* CLI TERMINAL MOCKUP with Glowing Effect */}
             <div className="relative z-10 bg-[#0A0A0A] p-1 rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(34,197,94,0.1)] overflow-hidden">
                <div className="absolute inset-0 bg-[#22c55e]/5 animate-pulse pointer-events-none" />
                <div className="flex items-center gap-2 px-6 py-4 bg-white/5 border-b border-white/10">
                   <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                   </div>
                   <span className="text-[10px] font-mono text-slate-500 ml-4 font-bold tracking-widest uppercase">system_orch_v2 ⚡ bash</span>
                </div>
                <div className="p-8 font-mono text-xs space-y-3 min-h-[300px]">
                   <p className="text-slate-500">loracon_node_admin login --user sentinel_01</p>
                   <p className="text-[#22c55e]">[PROCESS]: Accessing encrypted core... SUCCESS</p>
                   <p className="text-slate-400"># system.status()</p>
                   <div className="grid grid-cols-2 gap-4 py-2">
                      <div className="space-y-1">
                         <p className="text-slate-600">>> CPU_LOAD</p>
                         <p className="text-white">12.4%</p>
                      </div>
                      <div className="space-y-1">
                         <p className="text-slate-600">>> ACTIVE_NODES</p>
                         <p className="text-white">42 / 64</p>
                      </div>
                   </div>
                   <p className="text-slate-400"># nodes.deploy(rk_swiss_alpine)</p>
                   <p className="text-yellow-500 animate-pulse">>> DEPLOYING NODE TO SOLANA DEVNET...</p>
                   <p className="text-[#22c55e]">>> DEPLOYMENT SUCCESS [7820ms]</p>
                   <div className="mt-6 flex items-center gap-2">
                      <span className="block w-2 h-4 bg-[#22c55e] animate-pulse" />
                   </div>
                </div>
             </div>
             {/* Glowing light behind */}
             <div className="absolute -inset-10 bg-[#22c55e]/10 blur-[100px] rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
