/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bbc-red': '#BB0A21',
        'bbc-black': '#1A1A1A',
        'bbc-gray': {
          50: '#F5F5F5',
          100: '#E5E5E5',
          200: '#CCCCCC',
          300: '#999999',
          400: '#666666',
          500: '#333333',
          600: '#1A1A1A',
        },
      },
      fontFamily: {
        sans: ['Noto Sans', 'Arial', 'Helvetica', 'sans-serif'],
        serif: ['Noto Serif', 'Georgia', 'serif'],
      },
      maxWidth: {
        'bbc': '1280px',
      },
    },
  },
  plugins: [],
}
