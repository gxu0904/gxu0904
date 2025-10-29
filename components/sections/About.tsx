"use client";
import { motion } from 'framer-motion';

export function About() {
  return (
    <section id="about" className="container py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-3xl"
      >
        <h2 className="text-xl md:text-2xl font-semibold">About</h2>
        <p className="mt-3 text-navy-700">
          I'm a Valley Christian High School senior passionate about building systems that scale social good.
          I serve as <strong>Software Lead @ FRC 3256</strong>, <strong>VP of Operations @ DECA</strong>, and co-founded
          <strong> LightAid</strong> and <strong>StudyAP</strong>.
        </p>
        <p className="mt-3 text-navy-700">
          Interests include smart systems, AI for education, and practical products at the intersection of
          technology, entrepreneurship, and community.
        </p>
      </motion.div>
    </section>
  );
}


