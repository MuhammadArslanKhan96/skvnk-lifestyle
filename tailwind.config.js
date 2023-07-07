/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,jsx}"],
  theme: {
    extend: {
      colors: {
        brandGreen: '#00dc02',
      },
    },
    
  },
  plugins: [
    'tailwindcss',
    'postcss-preset-env',
  ],
}
