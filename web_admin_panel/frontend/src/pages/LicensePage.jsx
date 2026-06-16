import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LicensePage() {
  return (
    <div className="min-h-screen">
      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <section>
            <h1 className="text-5xl font-black tracking-tighter mb-8">MIT <span className="text-[#22c55e]">License</span></h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-10">
              The LoraCon suite is open-source software, licensed under the MIT License. This ensures the protocol remains transparent, auditable, and free for the community to improve.
            </p>
            <div className="p-10 rounded-[2rem] bg-white/5 border border-white/10 font-mono text-sm text-slate-400 leading-relaxed overflow-x-auto whitespace-pre-wrap">
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

              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
              IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
              AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
              LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
              SOFTWARE.
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
