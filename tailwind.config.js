/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'green-200': 'hsl(148, 38%, 91%)',
      'green-600': 'hsl(169, 82%, 27%)',
      red: 'hsl(0, 66%, 54%)',
      white: 'hsl(0, 0%, 100%)',
      'grey-500': 'hsl(186, 15%, 59%)',
      'grey-900': 'hsl(187, 24%, 22%)',
      transparent: 'rgba(255,255,255,0)',
    },
    fontFamily: {
      karla: ['Karla', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
