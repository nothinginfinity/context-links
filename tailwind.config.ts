import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#080a12',
        panel: 'rgba(255,255,255,0.065)',
        border: 'rgba(255,255,255,0.11)',
        muted: '#9aa8bf',
        soft: '#d5def0',
        green: '#35f2a6',
        blue: '#78a7ff',
        purple: '#c29bff',
        yellow: '#ffd166',
        red: '#ff6b6b',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        card: '24px',
        inner: '16px',
        pill: '9999px',
      },
    },
  },
  plugins: [],
};

export default config;
