/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f0ff',
          100: '#ede0ff',
          200: '#dbc1ff',
          300: '#c193ff',
          400: '#a55aff',
          500: '#8b2cff',
          600: '#7b0cff',
          700: '#6b09e2',
          800: '#590cb7',
          900: '#4c0d94',
          950: '#2d0568',
        },
        accent: {
          50: '#fef1f7',
          100: '#fee5f0',
          200: '#feccdf',
          300: '#ffa4c4',
          400: '#ff6a9e',
          500: '#fa3678',
          600: '#eb1256',
          700: '#cc0742',
          800: '#a90a38',
          900: '#8c0c32',
          950: '#55021a',
        },
        dark: {
          100: '#31363f',
          200: '#292f38', 
          300: '#222831',
          400: '#1a1f28',
          500: '#15181f',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'border-dance': 'border-dance 8s linear infinite',
        'heart-beat': 'heart-beat 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'border-dance': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '400% 0%' },
        },
        'heart-beat': {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.1)' },
          '50%': { transform: 'scale(1)' },
          '75%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
};