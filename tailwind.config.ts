import type { Config } from 'tailwindcss';
import containerQueries from '@tailwindcss/container-queries';
import tailwindAnimate from 'tailwindcss-animate';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-fira-code)'],
    },
    colors: {
      white: '#FFFFFF',
      text: '#D9D9D9',
      muted: '#B8B8B8',
      surface: '#5C5C5C',
      background: '#101010',
      footer: '#181818',
      error: '#C35466',
      info: '#0BCFC5',
      success: '#CED65E',
      transparent: '#00000000',
    },
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {},
    },
  },
  plugins: [containerQueries, tailwindAnimate],
};
export default config;
