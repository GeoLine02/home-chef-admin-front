/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark_backgorund_color: "#16a34a",
        light_background_color: "#86efac",
        divider_color: "#bbf7d0",
        border_color: "#166534",
      },
    },
  },
  plugins: [],
};
