'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { person } from '@/data/person';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const socialLinks = [
    { name: 'GitHub', url: person.socials.github },
    { name: 'LinkedIn', url: person.socials.linkedin },
    { name: 'Email', url: `mailto:${person.email}` },
  ];

  return (
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 py-32">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-4xl text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-12 md:mb-16 text-foreground leading-tight"
        >
          Let's create something meaningful.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl lg:text-2xl text-foreground/80 mb-16 md:mb-20 leading-relaxed max-w-2xl mx-auto"
        >
          I'm always interested in new <span className="highlight-hover">opportunities</span>, <span className="highlight-hover">collaborations</span>, and conversations about <span className="highlight-hover">technology</span> and <span className="highlight-hover">design</span>.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
              className="font-mono text-base md:text-lg text-foreground/60 hover:text-foreground transition-colors underline-offset-4 hover:underline"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 md:mt-32 text-xs md:text-sm text-foreground/30 font-mono tracking-wider"
        >
          Built with Next.js, TypeScript, and Framer Motion
        </motion.div>
      </motion.div>
    </section>
  );
}
