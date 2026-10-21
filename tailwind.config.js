/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nc-black': '#050505',
        'nc-charcoal': '#0F1012',
        'nc-purple': '#7C3AED',
        'nc-neon-purple': '#A855F7', 
        'nc-electric-blue': '#3B82F6',
        'nc-magenta': '#EC4899',
        'nc-gray': '#9CA3AF',
        'nc-white': '#F3F4F6',
      },
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        body: ['"Satoshi"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #7C3AED 0deg, #3B82F6 180deg, #EC4899 360deg)',
      },
      animation: {
        'slow-spin': 'spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
