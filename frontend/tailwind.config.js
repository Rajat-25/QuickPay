/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        grayOne:"#5d5757",
        grayTwo:"#423e3e",
        grayLight:"#989494",
        grayDark:"#564e4e",
        greenHisIcon:"#29d56d",
        redHisIcon:"#ff5959",
        whiteAcc:"#f5f5f5"
      }
    },
  },
  plugins: [],
}

