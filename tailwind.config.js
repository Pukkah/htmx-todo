/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      ringColor: {
        DEFAULT: "black",
      },
      ringOpacity: {
        DEFAULT: "1",
      },
    },
  },
  plugins: [],
};
