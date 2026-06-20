import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#16231C',
          800: '#243329',
        },
        stone: {
          600: '#6E7D67',
        },
        amber: {
          100: '#F5E6C8',
          600: '#D98A2B',
          700: '#B86F1C',
        },
        moss: {
          500: '#4F7A52',
        },
        linen: {
          50: '#F8F4EC',
        },
        ink: '#232A20',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-inter-mono)', 'monospace'],
      },
      maxWidth: {
        '7xl': '1280px',
      },
    },
  },
  plugins: [],
};

export default config;
