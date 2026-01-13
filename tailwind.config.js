/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#F8F4F3',
        'brand-secondary': '#001B2F',
        'brand-accent': '#35D0C6',
      },
    },
  },
  plugins: [],
}
