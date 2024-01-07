/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "menu-color": "#F7F7F2",
        "menu-color-hover": "#35CDDB",
        "content-bg": "#3498db",
        "content-box": "#F7F7F2",
        "content-box-hover": "#ECF0F1",
        "content-btn": "#ADD8E6",
        "content-btn-hover": "#2980b9",
      },
    },
    fontFamily: {
      // sans: ["Pretendard", "sans-serif"],
      sans: ["Pretendard", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
