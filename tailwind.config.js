/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto:["Roboto", "sans-serif"],
        Montserrat:["Montserrat", "sans-serif"],
        OpenSans: ["Open Sans", "sans-serif"],
        Lilita:["Lilita One", "sans-serif"],
        Audiowide:["Audiowide", "sans-serif"]
      },
      colors: {
        Cyan: '#0D9488', // Cyan
        DeepViolet: '#7C3AED', // Deep Violet
        primary: '#000000', // Black
        secondary: '#FFFFFF', // White
        accent: '#1A1A1A', // Dark Gray (for hover effects)
        background: '#F5F5F5', // Very Light Gray (for cards/containers)
        text: '#1A1A1A', // Dark Gray (for text and headings)
        muted: '#B3B3B3', // Muted Gray (for disabled items, subtext)
        coral_red:'#ef4444'
      },
    },
  },
  plugins: [],
}