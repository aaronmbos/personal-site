const typography = require('@tailwindcss/typography');

module.exports = {
  // configure with path to all pages & components to tree-shake production builds
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    typography
  ],
}
