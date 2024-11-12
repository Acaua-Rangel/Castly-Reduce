/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      'background': 'var(--background)',
      'dark-background': 'var(--dark-background)',
      'sub-background' : 'var(--sub-background)',
      'dark-sub-background': 'var(--dark-sub-background)',
      'gray': 'var(--gray)',
      'transparent': 'transparent',
      'purple': 'var(--purple)',
      'red': 'red',
      'black': 'black',
      'white': 'white',
      'blue': 'blue',
      'green': 'green',
    },
    extend: {},
  },
  plugins: [],
}

