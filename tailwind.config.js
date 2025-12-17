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
          // Deep Maroon Backgrounds (replacing black)
          black: '#5e0a0a',          // Rich deep maroon (Primary background)
          blackLight: '#7a121d',     // Lighter burgundy (Card/Modal backgrounds)
          blackDark: '#3b0404',      // Very dark maroon (Shadows/Darker areas)

          // Luxury Gold Spectrum (Text, Icons, Buttons)
          gold: '#FFD700',           // Standard vibrant gold
          goldLight: '#FFE566',      // Lighter, brighter gold (Highlights)
          goldDark: '#C5A000',       // Darker antique gold
          goldBright: '#FFFF33',     // High-intensity gold (Active states)

          // Decorative Reds
          red: '#8B0000',            // Classic dark red
          redLight: '#B22222',       // Firebrick
          redDark: '#5C0000',        // Deepest red
          burgundy: '#6B0F1A',       // Burgundy trim

          // Accents
          spotlight: '#FFF9C4',      // Warm gold spotlight
          amber: '#FFC107',          // Amber
          bronze: '#CD7F32',         // Bronze details

          // UI colors
          green: '#27AE60',          // Emerald green
          greenLight: '#2ECC71',
          blue: '#2980B9',
          blueLight: '#3498DB',
          purple: '#8E44AD',
          purpleLight: '#9B59B6',

          // Overlays
          overlay: 'rgba(59, 4, 4, 0.95)',       // Dark maroon overlay
          spotlightGlow: 'rgba(255, 215, 0, 0.2)', // Stronger gold glow
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
