/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'fade-in-up-delay-100': 'fade-in-up 0.5s ease-out 0.1s forwards',
        'fade-in-up-delay-200': 'fade-in-up 0.5s ease-out 0.2s forwards',
        'fade-in-up-delay-300': 'fade-in-up 0.5s ease-out 0.3s forwards',
        'fade-in-up-delay-400': 'fade-in-up 0.5s ease-out 0.4s forwards',
        'fade-in-up-delay-500': 'fade-in-up 0.5s ease-out 0.5s forwards',
        'fade-in-up-delay-600': 'fade-in-up 0.5s ease-out 0.6s forwards',
        'fade-in-up-delay-700': 'fade-in-up 0.5s ease-out 0.7s forwards'
      }
    },
  },
  plugins: [],
} 