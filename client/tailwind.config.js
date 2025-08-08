/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { textShadow: '0 0 8px rgba(99, 102, 241, 0.4)' },
          '50%': { textShadow: '0 0 20px rgba(99, 102, 241, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
