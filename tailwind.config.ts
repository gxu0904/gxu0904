import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(222 47% 11%)',
        navy: {
          50: '#f3f6fc',
          100: '#e6eefc',
          200: '#d9e2f2',
          300: '#b3c6ea',
          400: '#6ba3ff',
          500: '#2b6bd6',
          600: '#1f4aa8',
          700: '#0f1b33',
          800: '#0a1324',
          900: '#08101e',
        },
      },
      boxShadow: {
        soft: '0 6px 20px rgba(15, 27, 51, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;


