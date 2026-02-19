import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Harissa Warmth Theme - Inspired by Tunisian chili paste
        brand: {
          // Primary - Warm red-orange (harissa)
          50: '#fff1f0',
          100: '#ffe1de',
          200: '#ffc7c2',
          300: '#ffa198',
          400: '#ff6b5d',
          500: '#f94f3d',  // Main brand color
          600: '#e6281a',
          700: '#c21e13',
          800: '#a01e15',
          900: '#842019',
          950: '#480c08',
        },
        terracotta: {
          // Secondary - Earthy terracotta
          50: '#fdf6f3',
          100: '#f9e9e0',
          200: '#f3d1c0',
          300: '#e9af95',
          400: '#dd8468',
          500: '#d36647',  // Terracotta accent
          600: '#c4503c',
          700: '#a33e33',
          800: '#863631',
          900: '#6e302c',
          950: '#3b1615',
        },
        sand: {
          // Warm backgrounds - Desert sand
          50: '#fdfcfb',
          100: '#f9f6f1',
          200: '#f3ede3',
          300: '#e9dcc9',
          400: '#dcc6a7',
          500: '#cab189',
          600: '#b69972',
          700: '#9d8160',
          800: '#826951',
          900: '#6a5644',
          950: '#382c22',
        },
        olive: {
          // Accent - Olive green
          50: '#f7f8f3',
          100: '#edeee2',
          200: '#dbdfc6',
          300: '#c2c99f',
          400: '#a7b077',
          500: '#8d955a',
          600: '#707844',
          700: '#575d36',
          800: '#474b2f',
          900: '#3d4029',
          950: '#1f2214',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
