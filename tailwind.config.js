const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        error:
          "url('https://www.myphukettravel.com/assets/front-end/images/404.gif')",
      },
    },
  },
  plugins: [],
});
