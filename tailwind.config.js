const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brandGreen: '#00dc02',
        altGreen: '#1DB954',
        lime: '#7fbd2f',
        limehover: '#6ea329',
      },
      fontFamily: {
        sans: ['Satoshi', ...defaultTheme.fontFamily.sans],
        roadrage: ['ROADRAGE', 'cursive'],
      },
      spacing: {
        18: '4.5rem',
        112: '28rem',
        120: '30rem',
      },
      backgroundImage: {
        auth: "url('../images/authbg.png')",
        pricing: "url('../images/pricingbg.png')",
        ready:
          "linear-gradient(to bottom, rgba(237, 245, 159, 0.5), rgba(237, 245, 159, 0.7)), url('../images/readyImage.png')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}
