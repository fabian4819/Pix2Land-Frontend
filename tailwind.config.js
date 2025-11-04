/**@type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/Admin/**/*.{js,ts,jsx,tsx}",
    "./src/Customer/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "sidebar-green": "#1E8449",
        "sidebar-active": "#28A745",
      },
    },
  },
  plugins: [],
};
