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
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 py-40">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="max-w-4xl text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.15, delay: 0.05 }}
          className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold mb-12 md:mb-16 text-foreground leading-tight"
        >
          Let's create something meaningful.
        </motion.h2>


        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.15, delay: 0.15, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href={`mailto:${person.email}`}
            className="px-8 py-3 bg-foreground text-background font-sans text-base font-medium rounded-sm hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
          >
            Email me
          </a>
          <a
            href="/resume.txt"
            download
            className="px-8 py-3 border border-foreground/20 text-foreground font-sans text-base font-medium rounded-sm hover:bg-foreground/5 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background"
          >
            Download résumé
          </a>
        </motion.div>

        {/* Secondary links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target={link.name === 'Email' ? undefined : '_blank'}
              rel={link.name === 'Email' ? undefined : 'noopener noreferrer'}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.15, delay: 0.2 + index * 0.05, ease: 'easeOut' }}
              className="font-mono text-sm md:text-base text-foreground/60 hover:text-foreground transition-colors underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:ring-offset-2 focus:ring-offset-background rounded"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

      </motion.div>
    </section>
  );
}
