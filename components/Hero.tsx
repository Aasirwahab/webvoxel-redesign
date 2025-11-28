import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const marqueeItems = ["STRATEGY", "DESIGN", "DEVELOPMENT", "CREATIVE", "IMMERSIVE", "WEBVOXEL"];

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-vignette"
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center flex-grow pt-32 pb-12">
        
        {/* Top Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8, ease: "easeOut" }}
          className="mb-8 md:mb-12"
        >
          <div className="px-5 py-2 rounded-full border border-neutral-200 bg-white/50 backdrop-blur-sm flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            <span className="text-[10px] md:text-xs font-sans uppercase tracking-[0.15em] text-neutral-500 font-medium">
              London • Est. 2024
            </span>
          </div>
        </motion.div>

        {/* Massive Typography */}
        <motion.div 
          style={{ y, opacity }}
          className="flex flex-col items-center relative z-20"
        >
          <div className="overflow-visible">
             <motion.h1
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, delay: 2.4, ease: [0.22, 1, 0.36, 1] }}
               className="font-serif text-[13vw] md:text-[8rem] lg:text-[9.5rem] leading-[0.9] text-neutral-900 tracking-tight"
             >
               Digital Reality
             </motion.h1>
          </div>
          
          <div className="overflow-visible -mt-2 md:-mt-4">
             <motion.h2
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
               className="font-serif italic text-[8vw] md:text-[5rem] lg:text-[6rem] leading-none text-neutral-400"
             >
               by Webvoxel Studio
             </motion.h2>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.9, duration: 1 }}
          className="mt-10 md:mt-14 text-neutral-600 text-sm md:text-lg max-w-xl leading-relaxed font-sans font-light tracking-wide"
        >
          We craft immersive digital experiences that define brands. 
          A blend of strategic design, motion interactions, and technical excellence.
        </motion.p>
        
        {/* Actions - Single Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.1, duration: 0.8 }}
          className="mt-10 md:mt-12"
        >
          <Button className="!bg-neutral-900 !text-white hover:!bg-black px-12 py-5 text-lg">
            Explore Our Work <ArrowRight size={18} className="ml-2" />
          </Button>
        </motion.div>
      </div>

      {/* Infinite Scroll Marquee */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="w-full border-t border-neutral-200/60 bg-white/40 backdrop-blur-md overflow-hidden flex relative z-10"
      >
        <motion.div
          className="flex items-center gap-16 md:gap-24 py-6 md:py-8 whitespace-nowrap"
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30, 
          }}
        >
          {/* Double loop for seamless scroll */}
          {[...Array(2)].map((_, groupIndex) => (
             <div key={groupIndex} className="flex items-center gap-16 md:gap-24">
               {marqueeItems.map((item, i) => (
                 <span
                   key={i}
                   className={`text-5xl md:text-7xl font-serif tracking-tight ${
                     i % 2 === 0 
                     ? 'text-neutral-900' 
                     : 'text-transparent'
                   }`}
                   style={{
                     WebkitTextStroke: i % 2 !== 0 ? '1px #d4d4d4' : 'none',
                   }}
                 >
                   {item}
                 </span>
               ))}
             </div>
          ))}
        </motion.div>
      </motion.div>

    </section>
  );
}