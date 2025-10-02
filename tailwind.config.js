/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5ff',
          100: '#e5edff',
          200: '#d0ddff',
          300: '#a8c1ff',
          400: '#7a9eff',
          500: '#007aff', // Apple SF Blue
          600: '#0062cc',
          700: '#004c99',
          800: '#003d7a',
          900: '#002952',
        },
        gray: {
          50: '#f9fafb',
          100: '#f4f5f7',
          200: '#e5e7eb',
          300: '#d2d5da',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        accent: {
          blue: '#0a84ff',
          green: '#30d158',
          orange: '#ff9f0a',
          red: '#ff453a',
          pink: '#ff375f',
          purple: '#bf5af2',
          indigo: '#5e5ce6',
          teal: '#64d2ff'
        }
      },
      fontFamily: {
        sans: ['Inter','-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'apple': '0 2px 8px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'apple-sm': '0 1px 3px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.12)',
        'apple-lg': '0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)',
        'apple-xl': '0 16px 48px rgba(0, 0, 0, 0.16), 0 4px 12px rgba(0, 0, 0, 0.10)',
        'inner-thin': 'inset 0 0 0 0.5px rgba(255,255,255,0.4)',
      },
      backdropBlur: {
        'apple': '20px',
      },
      borderRadius: {
        'apple': '12px',
        'apple-sm': '10px',
        'apple-lg': '16px',
        'apple-xl': '20px',
        'apple-2xl': '28px'
      },
      transitionTimingFunction: {
        'swift-out': 'cubic-bezier(0.4, 0.14, 0.3, 1)',
        'swift-in': 'cubic-bezier(0.5, 0, 0.7, 0.2)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms'
      },
      keyframes: {
        'fade-in': { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        'scale-in': { '0%': { opacity: 0, transform: 'scale(.96)' }, '100%': { opacity: 1, transform: 'scale(1)' } },
        'slide-up-fade': { '0%': { opacity: 0, transform: 'translateY(12px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        'pulse-soft': { '0%,100%': { opacity: 1 }, '50%': { opacity: .5 } }
      },
      animation: {
        'fade-in': 'fade-in .5s ease-out',
        'scale-in': 'scale-in .45s cubic-bezier(.32,.72,.28,.99)',
        'slide-up-fade': 'slide-up-fade .55s cubic-bezier(.22,.61,.36,1)',
        'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite'
      },
      backgroundImage: {
        'radial-soft': 'radial-gradient(circle at 40% 35%, rgba(0,122,255,0.12), transparent 60%)',
        'grid-light': 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid-sm': '28px 28px'
      }
    },
  },
  plugins: [],
}
