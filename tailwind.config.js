// const colors = require('tailwindcss/colors')

module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
  theme: {
    extend: {
      screen: {
        "xs": "320px",
      }
    },
  },
  plugins: [],
};
