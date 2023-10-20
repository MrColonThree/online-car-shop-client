const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        error:
          "url('https://www.myphukettravel.com/assets/front-end/images/404.gif')",
        contact:
          "url('https://i.ibb.co/jVrYNjg/Audi-Approved-plus-Audi-Mumbai-South-1-1644828914237-1644828921626.jpg')",
        login:
          "url('https://i.ibb.co/nCZ1Vd1/photo-1519641471654-76ce0107ad1b.jpg')",
      },
    },
  },
  plugins: [],
});
