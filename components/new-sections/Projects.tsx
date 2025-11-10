'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { projects } from '@/data/projects';

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  return (
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 py-32">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-5xl"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-20 md:mb-24 text-foreground leading-tight"
        >
          Projects
        </motion.h2>

        <div className="space-y-16 md:space-y-20">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
              className="group"
            >
              <button
                onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                className="w-full text-left"
              >
                <div className="flex items-start justify-between gap-8">
                  <div className="flex-1">
                    <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-foreground group-hover:opacity-70 transition-opacity duration-300">
                      {project.title}
                    </h3>

                    <p className="text-lg md:text-xl lg:text-2xl text-foreground/70 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <AnimatePresence>
                      {expandedProject === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 flex flex-wrap gap-6 md:gap-8">
                            {project.demo && (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-sm md:text-base text-foreground/60 hover:text-foreground transition-colors underline-offset-4 hover:underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                View Demo →
                              </a>
                            )}
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-sm md:text-base text-foreground/60 hover:text-foreground transition-colors underline-offset-4 hover:underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                GitHub →
                              </a>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.div
                    animate={{ rotate: expandedProject === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-3xl md:text-4xl text-foreground/30 group-hover:text-foreground/50 transition-colors flex-shrink-0 mt-2"
                  >
                    +
                  </motion.div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
