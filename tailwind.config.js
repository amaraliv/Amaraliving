/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        ink: '#2A2A2A',
        gold: '#C9A84C',
        'gold-light': '#D4AF37',
        'gold-bright': '#DEC06A',
        dark: '#1A1008',
        charcoal: '#252525',
        stone: '#E8DDD0',
        bronze: '#B8941F',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(3.25rem,7.5vw,7rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        section: ['clamp(2.25rem,4.5vw,4.75rem)', { lineHeight: '1.06', letterSpacing: '-0.02em' }],
        display: ['clamp(4rem,10vw,9rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
      },
      backgroundImage: {
        'hero-veil': 'linear-gradient(115deg, rgba(26,16,8,0.92) 0%, rgba(26,16,8,0.55) 48%, rgba(26,16,8,0.25) 100%)',
        'glass-light': 'linear-gradient(145deg, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.06) 100%)',
        'glass-dark': 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
      },
      boxShadow: {
        editorial: '0 30px 80px -20px rgba(26,16,8,0.28)',
        glow: '0 0 70px rgba(201,168,76,0.22)',
        'glow-sm': '0 0 30px rgba(201,168,76,0.16)',
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
