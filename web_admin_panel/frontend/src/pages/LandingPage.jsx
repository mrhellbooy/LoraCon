import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Zap, Shield, Globe, Layout, Layers, RefreshCw, Twitter, Mail, ExternalLink, Linkedin, MessageSquare, UserCheck, X, CheckCircle2, Github, Instagram, Facebook, Send, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';
import { Link } from 'react-router-dom';

const ADDON_RELEASES_URL = 'https://github.com/Maijied/Lorapok-TabMan/releases/latest';
const ADDON_DOWNLOAD_URL = 'https://github.com/Maijied/Lorapok-TabMan/releases/latest/download/lorapok-tabman-latest.zip';

function InstallModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg bg-[#0a0f1a] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-sky-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <Logo size={40} />
            <div>
              <h2 className="text-xl font-black text-white">Install Lorapok TabMan</h2>
              <p className="text-slate-500 text-xs mt-0.5">Firefox Add-on · Free · Open Source</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <a
          href={ADDON_DOWNLOAD_URL}
          download="lorapok-tabman-latest.zip"
          className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-black text-white text-sm mb-6 group relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #0284c7 100%)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <Download className="w-5 h-5 relative" />
          <span className="relative">Download Latest ZIP</span>
        </a>
        <p className="text-center text-[10px] text-slate-600 mb-4">
          Or browse all releases:{' '}
          <a href={ADDON_RELEASES_URL} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">
            GitHub Releases <ExternalLink className="w-3 h-3 inline" />
          </a>
        </p>
        <div className="space-y-3">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">How to install locally</p>
          {[
            { step: '01', text: 'Click "Download Latest ZIP" above and download the file' },
            { step: '02', text: 'Extract the ZIP to a folder on your computer' },
            { step: '03', text: 'Open Firefox and go to about:debugging' },
            { step: '04', text: 'Click "This Firefox" → "Load Temporary Add-on..."' },
            { step: '05', text: 'Select the manifest.json file inside the extracted folder' },
            { step: '06', text: 'The TabMan icon appears in your Firefox toolbar — done!' },
          ].map(({ step, text }) => (
            <div key={step} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-[10px] font-black text-sky-500 font-mono mt-0.5 shrink-0">{step}</span>
              <p className="text-slate-300 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-amber-300/80 text-xs leading-relaxed">
              <strong>Note:</strong> Temporary add-ons are removed when Firefox restarts. For permanent installation, wait for Mozilla review approval — we've submitted to AMO and it's pending review.
            </p>
          </div>
        </div>
        <button onClick={onClose} className="w-full mt-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 font-bold text-sm transition-all border border-white/5">
          Got it
        </button>
      </motion.div>
    </div>
  );
}

export default function LandingPage() {
  const [showInstallModal, setShowInstallModal] = useState(false);

  return (
    <div className="relative overflow-hidden bg-[#030711]">
      <Navbar />

      <AnimatePresence>
        {showInstallModal && <InstallModal onClose={() => setShowInstallModal(false)} />}
      </AnimatePresence>

      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-sky-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-[400px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Logo size={12} className="hover:scale-100" /> A Product of Lorapok Labs
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[0.9]"
          >
            Collapse the <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">Chaos.</span><br />
            Save your <span className="text-white">Memory.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Lorapok TabMan instantly converts all your open tabs into a single, beautiful list.
            Reduce memory usage by up to 95% and reclaim your focus.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/admin">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(56,189,248,0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="group relative w-full sm:w-auto px-10 py-4 rounded-2xl font-black text-lg text-white overflow-hidden focus:outline-none focus:ring-4 focus:ring-sky-500/40"
                style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 50%, #0284c7 100%)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <div className="absolute inset-0 rounded-2xl shadow-[0_0_30px_rgba(56,189,248,0.35)] group-hover:shadow-[0_0_50px_rgba(56,189,248,0.55)] transition-shadow duration-300" />
                <span className="relative flex items-center gap-2.5">
                  <Layout className="w-5 h-5" />
                  Launch Dashboard
                </span>
              </motion.button>
            </Link>
            <motion.button
                onClick={() => setShowInstallModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-bold text-lg backdrop-blur-md transition-all flex items-center gap-2"
              >
                <Download className="w-5 h-5" /> Download Addon
              </motion.button>
            </motion.div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-white/10 bg-black/30 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 shrink-0">
            <Logo size={32} />
            <div>
              <span className="text-base font-bold text-slate-200 block">Lorapok Labs &middot; Bangladesh</span>
              <span className="text-sm text-slate-500">&copy; {new Date().getFullYear()} Lorapok Labs. All rights reserved.</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
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
              <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 hover:border-sky-500/30 transition-all"
                title={label}>{icon}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
