import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, Linkedin, MessageSquare, UserCheck, Instagram, Facebook, ExternalLink } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black/40 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Logo size={40} className="text-[#22c55e]" />
              <span className="text-2xl font-black tracking-tighter text-white">LoraCon.</span>
            </div>
            <p className="text-slate-500 max-w-xs text-sm font-sans">
              Architecting secure tunnels for a decentralized future. A project by Lorapok Labs.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 sm:gap-24">
             <div>
               <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Mastery</h4>
               <div className="flex flex-col gap-4 text-slate-500 text-sm">
                 <Link to="/admin" className="hover:text-[#22c55e] transition-colors">Admin Console</Link>
                 <Link to="/docs" className="hover:text-[#22c55e] transition-colors">Documentation</Link>
                 <Link to="/about" className="hover:text-[#22c55e] transition-colors">About Labs</Link>
               </div>
             </div>
             <div>
               <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Legal</h4>
               <div className="flex flex-col gap-4 text-slate-500 text-sm">
                 <Link to="/privacy" className="hover:text-[#22c55e] transition-colors">Privacy Lexicon</Link>
                 <Link to="/license" className="hover:text-[#22c55e] transition-colors">MIT License</Link>
                 <Link to="/contact" className="hover:text-[#22c55e] transition-colors">Contact</Link>
               </div>
             </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t border-white/5">
          <div className="flex items-center gap-2">
            <p className="text-slate-600 text-[10px] font-mono tracking-tighter uppercase grayscale opacity-50">
              &copy; {new Date().getFullYear()} LORAPOK LABS - BANGLADESH - ALL RIGHTS RESERVED
            </p>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap justify-center md:justify-end">
            {[
              { href: 'https://github.com/lorapok', icon: <Github className="w-4 h-4" />, label: 'GitHub' },
              { href: 'https://x.com/lorapoklabs', icon: <Twitter className="w-4 h-4" />, label: 'X / Twitter' },
              { href: 'mailto:lorapokdev@gmail.com', icon: <Mail className="w-4 h-4" />, label: 'Email' },
              { href: 'https://www.linkedin.com/showcase/lorapok/', icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn' },
              { href: 'https://www.reddit.com/r/LorapokLabs/', icon: <MessageSquare className="w-4 h-4" />, label: 'Reddit' },
              { href: 'https://gravatar.com/lorapok', icon: <UserCheck className="w-4 h-4" />, label: 'Gravatar' },
              { href: 'https://www.instagram.com/lorapoklabs/', icon: <Instagram className="w-4 h-4" />, label: 'Instagram' },
              { href: 'https://www.facebook.com/lorapoklabs', icon: <Facebook className="w-4 h-4" />, label: 'Facebook' },
              { href: 'https://lorapok.com/contact', icon: <ExternalLink className="w-4 h-4" />, label: 'Contact' },
            ].map(({ href, icon, label }) => (
              <a 
                key={label} 
                href={href} 
                target={href.startsWith('mailto') ? undefined : '_blank'} 
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-[#22c55e] hover:bg-[#22c55e]/10 hover:border-[#22c55e]/30 transition-all"
                title={label}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
