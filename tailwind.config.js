/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",        // your main HTML file
    "./src/**/*.{js,ts,jsx,tsx,vue}"  // all JS/TS/JSX/TSX/Vue files in src folder
  ],
  theme: {
    extend: {
      // Customize your theme here if needed
      colors: {
        // example custom color
        'brand-blue': '#3b82f6',
      },
    },
  },
  plugins: [],
}
