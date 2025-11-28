import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds total loading time
    const steps = 100;
    const intervalTime = duration / steps;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    // Trigger completion slightly after counter hits 100
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, duration + 500);

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#F9F9F7] cursor-wait"
      initial={{ y: 0 }}
      exit={{ 
        y: '-100%', 
        transition: { 
          duration: 0.8, 
          ease: [0.76, 0, 0.24, 1] 
        } 
      }}
    >
      <div className="relative flex items-center justify-center overflow-hidden">
        <motion.span 
          className="text-[12vw] md:text-[8rem] font-serif font-medium text-neutral-900 tracking-tight tabular-nums leading-none"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {count}
        </motion.span>
      </div>
      
      <div className="flex flex-col items-center gap-3 mt-4">
         <div className="w-48 md:w-64 h-[2px] bg-neutral-200 relative overflow-hidden rounded-full">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-neutral-900"
              initial={{ width: "0%" }}
              animate={{ width: `${count}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
         </div>
      </div>
    </motion.div>
  );
};