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
          // Deep blacks with subtle variations
          black: '#0d0d0d',
          blackLight: '#1a1a1a',
          blackDark: '#050505',

          // Rich gold spectrum (spotlight theme)
          gold: '#FFD700',
          goldLight: '#FFF4B3',
          goldDark: '#DAA520',
          goldBright: '#FFEB3B',

          // Deep burgundy reds (velvet curtain theme)
          red: '#8B0000',
          redLight: '#B22222',
          redDark: '#5C0000',
          burgundy: '#6B0F1A',

          // Accent colors
          spotlight: '#FFF9E6',
          amber: '#FFBF00',
          bronze: '#CD7F32',

          // UI colors
          green: '#2ecc71',
          greenLight: '#58d68d',
          blue: '#3498db',
          blueLight: '#5dade2',
          purple: '#9b59b6',
          purpleLight: '#bb8fce',

          // Overlays
          overlay: 'rgba(13,13,13,0.92)',
          spotlightGlow: 'rgba(255,215,0,0.15)',
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
