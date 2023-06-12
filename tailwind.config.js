/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8DBDFF",
        secondary: "#0082B4",
        blueTransparant: "rgba(45, 156, 219, 0.15)",
        text: "#7D7D7D",
        title: "#464255",
        red: "#FF5B5B",
        redTransparant: "rgba(255, 91, 91, 0.15)",
        purple: "#6558F5",
        aqua: "#06AFA0",
      },
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "3rem",
          xl: "6rem",
        },
        screens: {
          sm: "600px",
          md: "728px",
          lg: "984px",
          xl: "1240px",
        },
      },
    },
  },
  plugins: [],
};
