/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1D3A6C',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to bottom, #000000, #18181b, #000000)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
