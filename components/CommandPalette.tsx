'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandPaletteProps {
  sections: Array<{ id: string; label: string }>;
}

export function CommandPalette({ sections }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredSections = sections.filter((section) =>
    section.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
      setSearch('');
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const navigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
    setSearch('');
  };

  return (
    <>
      {/* Trigger hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="fixed top-8 left-8 z-50"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="font-mono text-xs text-foreground/30 hover:text-foreground/60 transition-colors tracking-wider uppercase"
        >
          <span className="hidden md:inline">⌘K </span>
          <span className="md:hidden">Menu</span>
        </button>
      </motion.div>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-lg z-50 px-4"
            >
              <div className="bg-background rounded-lg shadow-lg border border-foreground/10 overflow-hidden">
                {/* Search Input */}
                <div className="p-4 border-b border-foreground/10">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Jump to section..."
                    className="w-full bg-transparent border-none outline-none text-base font-sans text-foreground placeholder-foreground/30"
                    autoFocus
                  />
                </div>

                {/* Options */}
                <div className="max-h-80 overflow-y-auto">
                  {filteredSections.length > 0 ? (
                    filteredSections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => navigateToSection(section.id)}
                        className="w-full px-4 py-3 text-left hover:bg-foreground/5 transition-colors font-sans text-foreground"
                      >
                        {section.label}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-foreground/30 font-mono text-sm">
                      No sections found
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-4 py-2.5 border-t border-foreground/10 flex items-center justify-between text-xs text-foreground/30 font-mono">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>ESC Close</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
