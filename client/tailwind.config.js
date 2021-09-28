const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        qdark: '#222831',
        qgrey: '#393e46',
        qorange: {
          light: colors.amber['600'],
          DEFAULT: '#b55400',
        },
        qlight: '#eeeeee',
        qerror: '#fa8072',
      },
      fontFamily: {
        display: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Cantarell',
          '"Fira Sans"',
          '"Droid Sans"',
          '"Helvetica Neue"',
          'sans-serif',
        ],
        badaboombb: '"BadaBoom BB"',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
