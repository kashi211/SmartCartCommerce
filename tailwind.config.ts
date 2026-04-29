import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#faf8f4',
          100: '#f2ede3',
          800: '#1c1917',
          900: '#0f0e0c',
          gold: '#b8860b',
          'gold-light': '#d4a017',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#1c1917',
            a: { color: '#b8860b', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
            code: { backgroundColor: '#f2ede3', borderRadius: '4px', padding: '2px 4px' },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
