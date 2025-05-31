/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ["Merriweather", "serif"],
        cursive: ["Dancing Script", "cursive"],
        mono: ["Fira Code", "monospace"],
        display: ["Playfair Display", "serif"],
      },
      colors: {
        "midnight-blue": '#151b52',
        "purple-night": '#2A1350',
        "crimson-red": '#C0102F',
        "deep-rose": '#8D113B',
        "dark-burgundy": '#751240',
        "royal-purple": '#5D1245',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #151b52, #151b50, #151b50, #2A1351, #2A1351, #5D1245)',
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
      boxShadow: {
        navbar: "0px 4px 20px 6px rgba(28, 105, 192, 0.85), 0 1px 2px -1px rgba(3, 3, 4, 0.03)",
        menuHover: "0px 6px 15px 3px rgba(0, 0, 0, 0.15)",
      },
      fontSize: {
        'xl': '1.25rem',  
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const extendUnderline = {
        '.underline': {
          textDecoration: 'underline',
          textDecorationColor: '#121740',
        },
      };
      addUtilities(extendUnderline);
    },
    require('@tailwindcss/line-clamp'),
  ],
  
};
