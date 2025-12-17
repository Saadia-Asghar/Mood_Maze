/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cinema: {
          black: '#0a0a0a',
          gold: '#d4af37',
          goldLight: '#f4d03f',
          goldDark: '#b8941f',
          red: '#8a0303',
          redLight: '#c0392b',
          green: '#2ecc71',
          greenLight: '#58d68d',
          blue: '#3498db',
          blueLight: '#5dade2',
          purple: '#9b59b6',
          purpleLight: '#bb8fce',
          orange: '#e67e22',
          orangeLight: '#f39c12',
          overlay: 'rgba(0,0,0,0.85)',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'Montserrat', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'flip': 'flip 0.6s ease-in-out',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
      },
    },
  },
  plugins: [],
}
