const { th } = require("date-fns/locale");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#08284F",
        secondary: "#F97200",
        third: "#395371",
        fourth: "#5a6f88",
        fifth: "#8d9cae",
        sixth: "#e6eaed",
        graycolor: "#E5E8EB",
        boldSecoundary: "#000000",
      },
      fontFamily: {
        Merriweather: ["Merriweather", "sans-serif"],
        Inter: ["Inter", "ans-serif"],
      },
      screens: {
        "l-mobile": "425px",
        "m-mobile": "375px",
        "s-mobile": "320px",
      },
      // backgroundImage: {
      //   'herobgimg': "url('')",
      // }
    },
  },
  plugins: [],
};
