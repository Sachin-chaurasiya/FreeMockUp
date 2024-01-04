/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FCEEE8',
          100: '#FADDD1',
          200: '#F5BCA3',
          300: '#F09D7A',
          400: '#EB7C4C',
          500: '#E65B1E',
          600: '#BC4715',
          700: '#8E3610',
          800: '#5C230A',
          900: '#2E1105',
          950: '#170903',
        },
      },
      screens: {
        xs: '468px',
        xss: '320px',
      },
    },
  },
  plugins: [require('daisyui')],
};
