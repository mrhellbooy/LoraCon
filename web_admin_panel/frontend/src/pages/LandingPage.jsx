import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  Download, 
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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030711] text-white selection:bg-[#22c55e]/30 selection:text-[#22c55e]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-[#22c55e]/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-[400px] bg-[#22c55e]/5 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
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
              className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tighter mb-10"
            >
              SECURE THE <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#22c55e] to-[#166534]">EDGE</span>.<br />
              OWN THE <span className="text-white">FLOW.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            >
              LoraCon provides a decentralized, high-speed encrypted tunneling ecosystem 
              designed for the next generation of privacy. High-performance relays,
              military-grade encryption, and zero-latency routing.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-5"
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
                className="px-10 py-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md font-bold text-lg flex items-center gap-3"
              >
                <Link to="/register" className="flex items-center gap-3">
                  <Shield className="w-5 h-5" /> Get Started
                </Link>
              </motion.button>
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
             <div className="relative z-10 bg-gradient-to-tr from-[#111] to-[#0D0D0D] p-1 rounded-[2.5rem] border border-white/10 shadow-2xl">
                <div className="bg-[#050505] rounded-[2.3rem] overflow-hidden aspect-video relative group">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#22c55e]/10 group-hover:to-[#22c55e]/20 transition-all pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Shield className="w-20 h-20 text-[#22c55e] mx-auto mb-6 opacity-40" />
                      <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.3em]">Visualizing Interface...</p>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10">
                    <div className="flex items-center justify-between">
                       <span className="text-xs font-bold text-[#22c55e]">LORA-CON MASTER NODE</span>
                       <div className="flex gap-1">
                         <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                         <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                         <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                       </div>
                    </div>
                  </div>
                </div>
             </div>
             {/* Decorative glow */}
             <div className="absolute -inset-4 bg-[#22c55e]/10 blur-[60px] rounded-full pointer-events-none opacity-50" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Logo size={40} className="text-[#22c55e]" />
                <span className="text-2xl font-black tracking-tighter">LoraCon.</span>
              </div>
              <p className="text-slate-500 max-w-xs text-sm">
                Architecting secure tunnels for a decentralized future. A project by Lorapok Labs.
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 sm:gap-24">
               <div>
                 <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Mastery</h4>
                 <div className="flex flex-col gap-4 text-slate-500 text-sm">
                   <Link to="/admin" className="hover:text-[#22c55e] transition-colors">Admin Console</Link>
                   <a href="#" className="hover:text-[#22c55e] transition-colors">Node Health</a>
                   <a href="#" className="hover:text-[#22c55e] transition-colors">Documentation</a>
                 </div>
               </div>
               <div>
                 <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
                 <div className="flex flex-col gap-4 text-slate-500 text-sm">
                   <a href="#" className="hover:text-[#22c55e] transition-colors">About Labs</a>
                   <a href="#" className="hover:text-[#22c55e] transition-colors">Privacy Lexicon</a>
                   <a href="#" className="hover:text-[#22c55e] transition-colors">Contact</a>
                 </div>
               </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t border-white/5">
            <div className="flex items-center gap-2">
              <p className="text-slate-600 text-xs font-mono tracking-tighter">
                &copy; {new Date().getFullYear()} LORAPOK LABS - BANGLADESH - ALL RIGHTS RESERVED
              </p>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap justify-center md:justify-end">
              {[
                { href: 'https://github.com/lorapok', icon: <Github className="w-5 h-5" />, label: 'GitHub' },
                { href: 'https://x.com/lorapoklabs', icon: <Twitter className="w-5 h-5" />, label: 'X / Twitter' },
                { href: 'mailto:lorapokdev@gmail.com', icon: <Mail className="w-5 h-5" />, label: 'Email' },
                { href: 'https://www.linkedin.com/showcase/lorapok/', icon: <Linkedin className="w-5 h-5" />, label: 'LinkedIn' },
                { href: 'https://www.reddit.com/r/LorapokLabs/', icon: <MessageSquare className="w-5 h-5" />, label: 'Reddit' },
                { href: 'https://gravatar.com/lorapok', icon: <UserCheck className="w-5 h-5" />, label: 'Gravatar' },
                { href: 'https://www.instagram.com/lorapoklabs/', icon: <Instagram className="w-5 h-5" />, label: 'Instagram' },
                { href: 'https://www.facebook.com/lorapoklabs', icon: <Facebook className="w-5 h-5" />, label: 'Facebook' },
                { href: 'https://lorapok.com/contact', icon: <ExternalLink className="w-5 h-5" />, label: 'Contact' },
              ].map(({ href, icon, label }) => (
                <a 
                  key={label} 
                  href={href} 
                  target={href.startsWith('mailto') ? undefined : '_blank'} 
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-[#22c55e] hover:bg-[#22c55e]/10 hover:border-[#22c55e]/30 transition-all"
                  title={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
