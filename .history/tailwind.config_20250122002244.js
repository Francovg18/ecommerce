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
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #151b52, #151b50, #2A1351, #5D1245)',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
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