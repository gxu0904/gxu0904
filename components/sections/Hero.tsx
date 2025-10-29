"use client";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="container py-16 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-3xl"
      >
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
          Grace Xu — builder at the intersection of tech and impact.
        </h1>
        <p className="mt-3 text-navy-600">Engineer | Entrepreneur | Community Builder.</p>
        <div className="mt-6 flex gap-3">
          <a href="#projects"><Button>View Projects</Button></a>
          <a href="#contact"><Button variant="outline">Contact</Button></a>
        </div>
      </motion.div>
    </section>
  );
}


