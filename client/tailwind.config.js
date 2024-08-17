/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto Condensed", " sans-serif"],
        Dosis: ["Dosis", "sans-serif"],
        playwright: ["Playwrite GB S", "cursive"],
        rubik: ["Rubik", "sans-serif"],
      },
    },
  },
  plugins: [],
};
