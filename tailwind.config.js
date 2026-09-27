/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bengali: ['"Galada"', '"Noto Sans Bengali"', 'cursive', 'sans-serif'],
        bengaliSans: ['"Noto Sans Bengali"', 'system-ui', 'sans-serif'],
        tagline: ['"Poppins"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"DM Serif Display"', 'serif'],
      },
      colors: {
        festiveGold: '#f1d449',
        glassBg: 'rgba(255, 255, 255, 0.07)',
        glassBorder: 'rgba(255, 255, 255, 0.15)',
      },
      animation: {
        'online-pulse': 'online-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink': 'blink 1.2s infinite',
        'fade-in': 'overlay-fade-in 0.25s ease-out forwards',
        'scale-in': 'overlay-scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        'online-pulse': {
          '0%': { opacity: '0.6', transform: 'scale(0.95)' },
          '50%': { opacity: '0.15', transform: 'scale(1.8)' },
          '100%': { opacity: '0', transform: 'scale(2.2)' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'overlay-fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'overlay-scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96) translateY(-4px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
