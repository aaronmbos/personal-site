const typography = require("@tailwindcss/typography");
const form = require("@tailwindcss/forms");
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} \*/
module.exports = {
  // configure with path to all pages & components to tree-shake production builds
  content: [
    "./pages/**/*.js",
    "./components/**/*.js",
    "./pages/**/*.tsx",
    "./components/**/*.tsx",
  ],
  theme: {
    extend: {},
    fontFamily: {
      mono: ["var(--font-ibm-plex-mono)", ...fontFamily.mono],
    },
  },
  plugins: [typography, form],
  darkMode: "class",
};
