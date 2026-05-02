import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f7f2e7',
        'paper-2': '#efe7d3',
        cream: '#fbf8f0',
        ink: '#181412',
        'ink-70': '#4a3f3a',
        'ink-50': '#7a6e67',
        'ink-20': '#d8cfc0',
        accent: 'rgb(250 80 35)',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        page: '1280px',
      },
      borderWidth: {
        '1.5': '1.5px',
      },
      letterSpacing: {
        tighter2: '-0.03em',
      },
      boxShadow: {
        offset: '6px 8px 0 #181412',
        'offset-sm': '3px 4px 0 #181412',
      },
    },
  },
  plugins: [],
};

export default config;
