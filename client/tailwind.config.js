/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      minHeight: {
        'available': 'stretch', // Add this line
      },
    },
  },
  plugins: [],
}

