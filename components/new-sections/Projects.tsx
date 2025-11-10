'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { projects } from '@/data/projects';

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  return (
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 py-40">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="w-full max-w-5xl"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.15, delay: 0.05 }}
          className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold mb-20 md:mb-24 text-foreground leading-tight"
        >
          Projects
        </motion.h2>

        <div className="space-y-12 md:space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.15, delay: 0.1 + index * 0.05, ease: 'easeOut' }}
              className="group"
            >
              <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 pb-8 border-b border-foreground/10 hover:border-foreground/20 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight group-hover:underline transition-all">
                      {project.title}
                    </h3>
                  </div>
                  
                  <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-3">
                    {project.description}
                  </p>

                  <p className="font-mono text-sm text-foreground/60 mb-4">
                    {project.impact}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2.5 py-1 text-xs font-mono text-foreground/50 border border-foreground/20 rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {expandedProject === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 space-y-3 border-t border-foreground/10">
                          {project.metrics && (
                            <p className="text-sm text-foreground/70 leading-relaxed">
                              {project.metrics}
                            </p>
                          )}
                          {project.techStack && (
                            <div>
                              <p className="text-xs font-mono text-foreground/50 mb-2">Tech Stack:</p>
                              <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech, techIndex) => (
                                  <span
                                    key={techIndex}
                                    className="text-xs font-mono text-foreground/60"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="flex flex-wrap gap-4 pt-2">
                            {project.demo && (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:ring-offset-2 focus:ring-offset-background rounded"
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
                                className="font-mono text-sm text-foreground/60 hover:text-foreground transition-colors underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:ring-offset-2 focus:ring-offset-background rounded"
                                onClick={(e) => e.stopPropagation()}
                              >
                                GitHub →
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                  className="px-4 py-2 text-sm font-sans text-foreground/60 hover:text-foreground border border-foreground/20 hover:border-foreground/40 rounded-sm transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/50 focus:ring-offset-2 focus:ring-offset-background whitespace-nowrap"
                  aria-label={expandedProject === index ? 'Hide details' : 'View details'}
                >
                  {expandedProject === index ? 'Hide details' : 'View details'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
