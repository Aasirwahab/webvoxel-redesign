import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Preloader } from './components/Preloader';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-white text-black selection:bg-brand-500 selection:text-white overflow-x-hidden min-h-screen">
      <AnimatePresence mode='wait'>
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className={isLoading ? 'h-screen overflow-hidden' : 'relative'}>
        <Navbar />
        <Hero />
        
        {/* Placeholder for scroll demonstration */}
        <section className="py-20 px-6 max-w-7xl mx-auto opacity-30 mt-20">
          <div className="flex flex-col gap-4">
             <div className="h-6 w-1/3 bg-neutral-200 rounded animate-pulse" />
             <div className="h-6 w-2/3 bg-neutral-200 rounded animate-pulse" />
             <div className="h-96 bg-neutral-100 border border-neutral-200 border-dashed rounded-2xl flex items-center justify-center mt-8">
               <p className="font-mono text-neutral-400 text-sm">SCROLL FOR MORE CONTENT</p>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
}