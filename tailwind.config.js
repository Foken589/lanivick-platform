/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          50: '#fdf2f4',
          100: '#fbe6ea',
          200: '#f7ced7',
          300: '#f0a6b7',
          400: '#e3708e',
          500: '#d04369',
          600: '#b82b51',
          700: '#9b1e41',
          800: '#871439',
          900: '#7A1234', // Official Burgundy / Deep Wine
          950: '#4a081d',
        },
        gold: {
          50: '#fcf9ee',
          100: '#f7f1d4',
          200: '#eee2a9',
          300: '#e3cc75',
          400: '#d8a83e', // Brand Primary Gold
          500: '#c5952d',
          600: '#aa7823',
          700: '#88581f',
          800: '#71461f',
          900: '#603b1e',
        },
        cream: {
          50: '#fffbf7',
          100: '#FFF7F0', // Official Cream / Ivory
          200: '#fdf0db',
          300: '#fae3c1',
          400: '#f4ce9d',
        },
        ink: {
          50: '#f7f5f6',
          100: '#eeeaec',
          200: '#dfd7da',
          500: '#756a70', // Muted
          800: '#362b31',
          900: '#241c20', // Brand Deep Charcoal Ink
        },
        berry: {
          50: '#fef2f6',
          100: '#fde6ee',
          200: '#fbcfe0',
          300: '#f8a8c5',
          400: '#f273a0',
          500: '#e8336d', // Strawberry Pink Accent
          600: '#d81b60',
          700: '#b8104c',
          800: '#991141',
          900: '#80133a',
        },
        chocolate: {
          800: '#4a1c27',
          900: '#38161f', // Deep Cocoa Base
          950: '#240d14',
        },
        borderLine: '#eadfd5',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Caveat"', '"Great Vibes"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 50px -10px rgba(122, 18, 52, 0.12), 0 10px 20px -5px rgba(216, 168, 62, 0.08)',
        'soft': '0 4px 20px -2px rgba(36, 28, 32, 0.06)',
        'elevated': '0 12px 36px -4px rgba(36, 28, 32, 0.12)',
      },
    },
  },
  plugins: [],
}
