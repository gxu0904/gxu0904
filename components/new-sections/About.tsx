'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-40">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="max-w-4xl"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.15, delay: 0.05 }}
          className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold mb-20 md:mb-24 text-foreground leading-tight"
        >
          About
        </motion.h2>

        <div className="space-y-8 md:space-y-10 text-lg md:text-xl lg:text-2xl text-foreground/90" style={{ maxWidth: '65ch', lineHeight: '1.6' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.15, delay: 0.1 }}
          >
            I build systems that bridge <span className="highlight-hover">technical complexity</span> with <span className="highlight-hover">human needs</span>—from smart lighting solutions for disaster relief to AI-powered educational tools.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.15, delay: 0.15 }}
          >
            My work spans <span className="highlight-hover">robotics research</span>, <span className="highlight-hover">full-stack development</span>, and <span className="highlight-hover">product design</span>. I'm passionate about creating technology that creates meaningful impact.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.15, delay: 0.2 }}
          >
            Currently exploring the intersection of <span className="highlight-hover">machine learning</span>, <span className="highlight-hover">systems engineering</span>, and <span className="highlight-hover">thoughtful design</span>.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
