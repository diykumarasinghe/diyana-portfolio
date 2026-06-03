/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#050816',
        sectionDark: '#07091a',
        cardBg: 'rgba(15, 23, 42, 0.45)',
        cardBorder: 'rgba(148, 163, 184, 0.12)',
        primaryBlue: '#38BDF8',
        deepBlue: '#2563EB',
        cyanAccent: '#06B6D4',
        purpleAccent: '#8B5CF6',
        greenAccent: '#22C55E',
        whiteText: '#F8FAFC',
        mutedText: '#94A3B8',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        softBlue: '0 0 30px rgba(56, 189, 248, 0.15)',
        glowBlue: '0 0 20px rgba(56, 189, 248, 0.25)',
      }
    },
  },
  plugins: [],
}
