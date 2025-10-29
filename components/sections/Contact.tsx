"use client";
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function Contact() {
  return (
    <section id="contact" className="container py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-3xl"
      >
        <h2 className="text-xl md:text-2xl font-semibold">Resume & Contact</h2>
        <p className="text-navy-700 mt-2">Reach out for collaborations and opportunities.</p>
        <div className="mt-4 flex gap-3">
          <a href="/resume.pdf" target="_blank" rel="noreferrer">
            <Button>Download Resume</Button>
          </a>
          <a href="mailto:hello@gracexu.dev">
            <Button variant="outline">Email Grace</Button>
          </a>
        </div>
      </motion.div>
    </section>
  );
}


