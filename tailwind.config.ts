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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        accent: {
          light: '#F2A900',
          dark: '#99CFFF',
        },
        navy: {
          50: '#f3f6fc',
          100: '#e6eefc',
          200: '#d9e2f2',
          300: '#b3c6ea',
          400: '#6ba3ff',
          500: '#2b6bd6',
          600: '#1f4aa8',
          700: '#11193C',
          800: '#0A0E2A',
          900: '#08101e',
        },
        gold: {
          DEFAULT: '#F2A900',
          50: '#FFF9E6',
          100: '#FFF3CC',
          200: '#FFE799',
          300: '#FFDB66',
          400: '#FFCF33',
          500: '#F2A900',
          600: '#CC8F00',
          700: '#997500',
          800: '#665B00',
          900: '#334100',
        },
        sky: {
          DEFAULT: '#99CFFF',
          50: '#F0F8FF',
          100: '#E6F4FF',
          200: '#CCE9FF',
          300: '#B3DEFF',
          400: '#99CFFF',
          500: '#66B8FF',
          600: '#33A1FF',
          700: '#0088FF',
          800: '#0066CC',
          900: '#004499',
        },
      },
      boxShadow: {
        soft: '0 6px 20px rgba(15, 27, 51, 0.08)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'monospace'],
      },
      lineHeight: {
        relaxed: '1.6',
      },
      spacing: {
        '10vh': '10vh',
        '15vh': '15vh',
        '20vh': '20vh',
        '30vh': '30vh',
      },
    },
  },
  plugins: [],
};

export default config;


