const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  mode: 'jit',
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
        badaboombb: '"BadaBoom BB"',
      },
      gridTemplateColumns: {
        'qm-selection': '1fr minmax(min-content, 25%) 1fr',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
