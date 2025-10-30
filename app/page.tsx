'use client';

import { Terminal } from '@/components/Terminal';
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-black dark:via-gray-950 dark:to-gray-900 p-4 md:p-8 flex items-center justify-center">
      <Terminal />
    </main>
  );
}


