const typography = require("@tailwindcss/typography");

module.exports = {
  // configure with path to all pages & components to tree-shake production builds
  content: ["./pages/**/*.js", "./components/**/*.js"],
  theme: {
    extend: {},
    fontFamily: {
      mono: ["JetBrainsMono", "ui-monospace"],
    },
  },
  plugins: [typography],
  darkMode: "class",
};
