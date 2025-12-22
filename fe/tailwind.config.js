/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx,css}'],
  theme: {
    extend: {
      screens: {
        lg: '1440px',   // override lg
        xl: '1765px',   // override xl
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
