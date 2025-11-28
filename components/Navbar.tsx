import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem } from '../types';
import { Button } from './ui/Button';

const navItems: NavItem[] = [
  { label: 'Studio', href: '#' },
  { label: 'Works', href: '#' },
  { label: 'Services', href: '#' },
  { 
    label: 'Resources', 
    href: '#', 
    children: [
      { label: 'FAQ', href: '#' },
      { label: 'Journal', href: '#' }
    ]
  },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? 'py-3' : 'py-8'
      }`}
    >
      <div className={`mx-auto max-w-[95%] md:max-w-7xl px-8 transition-all duration-700 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md rounded-full border border-neutral-100/50 shadow-sm py-3' : 'bg-transparent'
      }`}>
        <div className="flex items-center justify-between relative">
          {/* Logo */}
          <a href="#" className="relative z-50 group flex items-center gap-2">
            <span className="font-serif font-bold text-xl tracking-tight text-neutral-900">
              Webvoxel<span className="text-neutral-300">.</span>
            </span>
          </a>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <div 
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center gap-1 text-sm font-sans font-medium text-neutral-500 hover:text-black transition-colors py-2"
                >
                  <span className="relative">
                    {item.label}
                  </span>
                  {item.children && (
                    <ChevronDown size={12} className={`transition-transform duration-300 ml-1 text-neutral-400 group-hover:text-black ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                  )}
                </a>
                
                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-40 bg-white border border-neutral-100 rounded-lg shadow-lg shadow-black/5 p-1 overflow-hidden"
                    >
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          className="block px-4 py-2.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 rounded-md transition-all"
                        >
                          {child.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors font-sans flex items-center gap-1">
              Get Started <ArrowRight size={14} className="inline" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden relative z-50 p-2 text-black"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-40 flex items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-6 text-center p-6 w-full relative z-10">
              {navItems.map((item, idx) => (
                <div key={item.label} className="w-full flex flex-col items-center">
                  <motion.a 
                    href={item.href}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-3xl font-serif text-neutral-900 hover:text-neutral-500 transition-colors"
                    onClick={() => !item.children && setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                  
                  {/* Mobile Dropdown items */}
                  {item.children && (
                    <div className="mt-3 flex flex-col gap-3">
                      {item.children.map((child, childIdx) => (
                        <motion.a
                          key={child.label}
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: idx * 0.1 + (childIdx + 1) * 0.1 }}
                          href={child.href}
                          className="text-sm text-neutral-500 font-sans"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.label}
                        </motion.a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};