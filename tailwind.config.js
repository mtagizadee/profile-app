/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#ef1f4d'
      },
      fontFamily: {
        Poppins: ['Poppins', 'system-ui', 'sans-serif']
      },
      maxWidth: {
        main: '1200px'
      }
    },
  },
  plugins: [],
}
