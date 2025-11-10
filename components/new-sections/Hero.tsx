'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY || document.documentElement.scrollTop);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.max(0, 1 - scrollY / 300);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 relative bg-background">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center max-w-6xl"
      >
        <h1 className="font-serif text-7xl md:text-9xl lg:text-[12rem] font-bold mb-8 md:mb-12 text-foreground leading-[0.9] tracking-tight">
          Grace Xu
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground/80 mb-12 md:mb-16 leading-relaxed max-w-3xl mx-auto"
        >
          Designing logic, systems, and stories.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-mono text-sm md:text-base text-foreground/60 tracking-wider uppercase"
        >
          Engineer · Researcher · Builder
        </motion.p>
      </motion.div>

      {/* Fading scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs font-mono text-foreground/40 tracking-widest uppercase">scroll to explore</span>
          <motion.svg
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-5 text-foreground/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </div>
      </motion.div>
    </section>
  );
}
