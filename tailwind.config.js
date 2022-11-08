/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#ef1f4d',
        loading: 'rgb(229 231 235)'
      },
      fontFamily: {
        Poppins: ['Poppins', 'system-ui', 'sans-serif']
      },
      maxWidth: {
        main: '1200px'
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px'
      }
    },
  },
  plugins: [],
}
