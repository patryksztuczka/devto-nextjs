/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        header: "0 1px 1px 0 rgba(0, 0, 0, 0.1)",
        shadow1: "0 0 0 1px rgba(23, 23, 23, 0.1);",
        top: "0 -1px 5px 0 rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
