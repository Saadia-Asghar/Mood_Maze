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

          // Maroon Red spectrum (main theme - replaces gold)
          gold: '#8B0000',           // Dark maroon (replaces gold)
          goldLight: '#B22222',      // Firebrick red (replaces goldLight)
          goldDark: '#5C0000',       // Deep maroon (replaces goldDark)
          goldBright: '#DC143C',     // Crimson (replaces goldBright)

          // Deep burgundy reds (velvet curtain theme)
          red: '#8B0000',            // Dark maroon
          redLight: '#B22222',       // Firebrick
          redDark: '#5C0000',        // Deep maroon
          burgundy: '#6B0F1A',       // Burgundy

          // Accent colors (maroon theme)
          spotlight: '#FFE6E6',      // Light pink tint
          amber: '#A52A2A',          // Brown-red
          bronze: '#8B4513',         // Saddle brown

          // UI colors
          green: '#2ecc71',
          greenLight: '#58d68d',
          blue: '#3498db',
          blueLight: '#5dade2',
          purple: '#9b59b6',
          purpleLight: '#bb8fce',

          // Overlays
          overlay: 'rgba(13,13,13,0.92)',
          spotlightGlow: 'rgba(139,0,0,0.15)',  // Maroon glow
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
