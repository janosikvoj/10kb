import type { Config } from 'tailwindcss';
import containerQueries from '@tailwindcss/container-queries';
import tailwindAnimate from 'tailwindcss-animate';

const config: Config = {
  content: ['./src/**/*'],
  theme: {
    fontFamily: {
      sans: ['var(--font-fira-code)'],
    },
    colors: {
      // light
      white: {
        lighter: '#FFFFFF',
        DEFAULT: '#D9D9D9',
        darker: '#B8B8B8',
      },

      // neutral
      neutral: {
        lighter: '#5C5C5C',
        DEFAULT: '#4C4C4C',
        darker: '#323232',
      },

      // dark
      black: {
        lighter: '#181818',
        DEFAULT: '#101010',
        darker: '#080808',
      },

      // semantic
      error: '#C35466',
      info: '#0BCFC5',
      success: '#CED65E',

      // other
      transparent: '#00000000',
    },
  },
  plugins: [containerQueries, tailwindAnimate],
};
export default config;
