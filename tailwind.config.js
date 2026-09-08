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
          800: '#811c38',
          900: '#6d1530', // Brand Primary Wine
          950: '#3e0717',
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
          50: '#fffdfa',
          100: '#fff8ed', // Brand Cream
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
        borderLine: '#eadfd5',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 50px -10px rgba(109, 21, 48, 0.12), 0 10px 20px -5px rgba(216, 168, 62, 0.08)',
        'soft': '0 4px 20px -2px rgba(36, 28, 32, 0.06)',
        'elevated': '0 12px 36px -4px rgba(36, 28, 32, 0.12)',
      },
    },
  },
  plugins: [],
}
