import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'tb-port': '600px',
        'tb-land': '1024px',
      },
      colors: {
        mt: {
          bg: '#050505',
          'bg-secondary': '#0B0B0B',
          card: '#121212',
          elevated: '#181818',
          gold: '#F5B800',
          'gold-bright': '#FFD54A',
          'gold-muted': '#B88600',
          text: '#FFFFFF',
          'text-secondary': '#A0A0A0',
          muted: '#777777',
          border: 'rgba(255, 255, 255, 0.08)',
          'gold-border': 'rgba(245, 184, 0, 0.18)',
        },
      },
      borderRadius: {
        card: '14px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.5)',
        gold: '0 0 0 1px rgba(212, 167, 44, 0.15)',
      },
      transitionDuration: {
        premium: '200ms',
      },
      minHeight: {
        touch: '48px',
      },
      minWidth: {
        touch: '48px',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
