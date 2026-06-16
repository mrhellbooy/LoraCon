import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <section>
            <h1 className="text-5xl font-black tracking-tighter mb-8">Privacy <span className="text-[#22c55e]">Lexicon</span></h1>
            <div className="prose prose-invert max-w-none text-slate-400 space-y-6">
              <p>At LoraCon, your privacy is not a feature; it is the foundation. We operate under a strict **No-Logs Policy**.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We do not record browsing history.</li>
                <li>We do not record traffic destination or content.</li>
                <li>We do not record DNS queries.</li>
                <li>We do not record IP addresses (except for active session routing which is volatile).</li>
              </ul>
            </div>
          </section>

          <section className="pt-10 border-t border-white/10">
            <h2 className="text-3xl font-black tracking-tighter mb-6">License Agreement</h2>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 font-mono text-xs text-slate-500 overflow-x-auto whitespace-pre-wrap">
              MIT License

              Copyright (c) 2026 Lorapok Labs

              Permission is hereby granted, free of charge, to any person obtaining a copy
              of this software and associated documentation files (the "Software"), to deal
              in the Software without restriction, including without limitation the rights
              to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
              copies of the Software, and to permit persons to whom the Software is
              furnished to do so, subject to the following conditions:

              The above copyright notice and this permission notice shall be included in all
              copies or substantial portions of the Software.
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
