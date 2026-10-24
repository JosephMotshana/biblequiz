/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          800: '#0f2347',
          900: '#0B1B3D',
          950: '#060e20',
        },
        gold: {
          300: '#f3e5ab',
          400: '#E6C200',
          500: '#D4AF37',
          600: '#AA820A',
        },
      },
    },
  },
  plugins: [],
}