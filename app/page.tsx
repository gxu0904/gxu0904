'use client';

import { Hero } from '@/components/new-sections/Hero';
import { About } from '@/components/new-sections/About';
import { Projects } from '@/components/new-sections/Projects';
import { Contact } from '@/components/new-sections/Contact';
import { CommandPalette } from '@/components/CommandPalette';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Cursor } from '@/components/Cursor';
import { useEffect } from 'react';

export default function Home() {
  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    if (!savedTheme) {
      localStorage.setItem('theme', theme);
    }
  }, []);

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <Cursor />
      <ThemeToggle />
      <CommandPalette sections={sections} />
      <main className="min-h-screen bg-background">
        <div id="hero">
          <Hero />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="projects">
          <Projects />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>
    </>
  );
}


