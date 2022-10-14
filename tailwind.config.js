const typography = require("@tailwindcss/typography");
const form = require("@tailwindcss/forms");
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
      mono: ["Recursive", "ui-monospace"],
    },
  },
  plugins: [typography, form],
  darkMode: "class",
};
