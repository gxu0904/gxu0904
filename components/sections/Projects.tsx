"use client";
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { Button } from '@/components/ui/button';

export function Projects() {
  return (
    <section id="projects" className="container py-12 md:py-16">
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold">Projects</h2>
        <p className="text-navy-700 mt-2">Selected work with links to demos and code.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {projects.slice(0, 4).map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="card p-5 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-navy-700 mt-1">{p.description}</p>
            <div className="mt-4 flex gap-2">
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noreferrer">
                  <Button size="sm">Demo</Button>
                </a>
              )}
              {p.github && (
                <a href={p.github} target="_blank" rel="noreferrer">
                  <Button size="sm" variant="outline">GitHub</Button>
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}


