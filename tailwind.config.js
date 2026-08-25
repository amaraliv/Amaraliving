/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F4F2EC',
        ink: '#2A2A2A',
        gold: '#C8102E',
        'gold-light': '#E32B40',
        'gold-bright': '#F24456',
        dark: '#140406',
        charcoal: '#252525',
        stone: '#DCDCD4',
        bronze: '#980C1C',
        red: '#C8102E',
        'red-primary': '#C8102E',
        'red-deep': '#980C1C',
        'red-light': '#E32B40',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(2.5rem,5.5vw,5.5rem)', { lineHeight: '1.04', letterSpacing: '-0.03em' }],
        section: ['clamp(1.75rem,3.5vw,3.75rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        display: ['clamp(3rem,7.5vw,7rem)', { lineHeight: '0.97', letterSpacing: '-0.03em' }],
      },
      backgroundImage: {
        'hero-veil': 'linear-gradient(115deg, rgba(20, 4, 6, 0.92) 0%, rgba(34, 10, 15, 0.60) 48%, rgba(20, 4, 6, 0.30) 100%)',
        'glass-light': 'linear-gradient(145deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.06) 100%)',
        'glass-dark': 'linear-gradient(145deg, rgba(34, 10, 15, 0.85) 0%, rgba(20, 4, 6, 0.65) 100%)',
      },
      boxShadow: {
        editorial: '0 30px 80px -20px rgba(34, 38, 42, 0.28)',
        glow: '0 0 70px rgba(200, 16, 46, 0.30)',
        'glow-sm': '0 0 30px rgba(200, 16, 46, 0.20)',
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};