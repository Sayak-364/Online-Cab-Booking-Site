
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: '#1089ff',
        primaryGreen: '#01d28e',
        primaryBlack: '#000000',
        headingBlack: 'rgba(0,0,0,0.8)',
        transparentBlack : '#00000033',
        customBlack: 'hsla(0, 0%, 0%, 0.75)',
        primaryGray : '#999999'
      },
      screens: {
        'xs': '350px',
        '3xl': '1680px',
        '4xl': '2200px',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"],
  },
}