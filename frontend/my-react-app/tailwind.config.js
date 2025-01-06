/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Include this file to process the HTML file.
    "./src/**/*.{js,jsx,ts,tsx}", // Add all your source files to enable Tailwind processing in components.
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
