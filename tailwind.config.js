/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
const customClass = plugin(function ({ addUtilities }) {
  addUtilities({
    '.rotate-y-180': {
      transform: 'rotateY(180deg)',
      duration: 500,
    },
    '.preserver-3d': {
      transformStyle: 'preserve-3d',
    },
    '.perspective': {
      perspective: '5000px',
    },
    '.backface-hidden': {
      backfaceVisibility: 'hidden',
    },
  });
});
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        snow: "url('https://images.unsplash.com/photo-1519863436079-8436f74be632?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=5342&q=80')",
        landscape:
          "url('https://images.unsplash.com/photo-1511884642898-4c92249e20b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80')",
        weather:
          "url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80')",
        mountains:
          "url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80')",
      },
      screens: {
        portrait: '@media (orientation: portrait)',
        landcape: '@media (orientation: landscape)',
      },
    },
  },
  plugins: [customClass],
};
