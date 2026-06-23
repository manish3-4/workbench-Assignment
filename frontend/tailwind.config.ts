import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#172026',
        line: '#DCE3EA',
        brand: {
          50: '#F1F7FF',
          100: '#DCEEFF',
          500: '#246BFE',
          600: '#1857D5',
          700: '#1647A5',
        },
      },
      boxShadow: {
        panel: '0 1px 2px rgba(23, 32, 38, 0.08), 0 12px 28px rgba(23, 32, 38, 0.06)',
      },
    },
  },
  plugins: [],
} satisfies Config;
