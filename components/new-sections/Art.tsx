'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { artPieces } from '@/data/art';

export function Art() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);

  if (artPieces.length === 0) {
    return null; // Don't render if no art pieces
  }

  return (
    <section ref={ref} className="min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 py-40">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="w-full max-w-6xl"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.15, delay: 0.05 }}
          className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold mb-20 md:mb-24 text-foreground leading-tight"
        >
          Art
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {artPieces.map((piece, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.15, delay: 0.1 + index * 0.05, ease: 'easeOut' }}
              className="group cursor-pointer"
              onClick={() => setSelectedPiece(selectedPiece === index ? null : index)}
            >
              <div className="relative aspect-square overflow-hidden mb-4 bg-foreground/5">
                <img
                  src={piece.image}
                  alt={piece.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-1 group-hover:underline transition-all">
                {piece.title}
              </h3>
              {piece.year && (
                <p className="font-mono text-xs text-foreground/50 mb-2">{piece.year}</p>
              )}
              {piece.description && (
                <p className="text-sm text-foreground/70 leading-relaxed mb-3">
                  {piece.description}
                </p>
              )}
              {piece.tags && piece.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {piece.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-0.5 text-xs font-mono text-foreground/50 border border-foreground/20 rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <AnimatePresence>
                {selectedPiece === index && piece.medium && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 pt-3 border-t border-foreground/10"
                  >
                    <p className="text-xs font-mono text-foreground/60">
                      Medium: {piece.medium}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

