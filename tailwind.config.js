/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0b0f14",
          800: "#141a22",
          700: "#1b2430"
        },
        brand: {
          600: "#3b82f6",
          700: "#2563eb"
        }
      }
    }
  },
  plugins: []
};
