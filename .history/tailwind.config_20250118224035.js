/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors:{
        "blue-2":'#151b52',
        "blue-3":'#2A1350',
        "degradado-1": '#C0102F',
        "degradado-2": '#8D113B',
        "degradado-3": '#751240',
        "degradado-4": '#5D1245',
        "degradado-5": '#151B52',
        "midnight-blue": '#151b52',
        "purple-night": '#2A1350',
        "crimson-red": '#C0102F',
        "deep-rose": '#8D113B',
        "dark-burgundy": '#751240',
        "royal-purple": '#5D1245',

      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        navbar: "0px 4px 20px 6px rgba(28, 105, 192, 0.85), 0 1px 2px -1px rgba(3, 3, 4, 0.03)",
        menuHover: "0px 6px 15px 3px rgba(0, 0, 0, 0.15)",
      },
      fontSize: {
        'xl': '1.25rem',  // Font size para mejorar la legibilidad
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [
    function({addUtilities}) {
      const extendUnderline = {
        '.underline': {
          'textDecoration': 'underline',
          'text-decoration-color': '#121740',
        },
      }
      addUtilities(extendUnderline)
    }
  ],
}
