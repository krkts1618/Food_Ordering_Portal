/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: "#171717",
          card: "#242424",
          elevated: "#2C2C2C",
          border: "#383838",
        },
        brand: {
          DEFAULT: "#F97316",
          hover: "#EA580C",
          soft: "#431407",
        },
        surface: {
          DEFAULT: "#FAFAFA",
          muted: "#A3A3A3",
          subtle: "#737373",
        },
        success: "#22C55E",
        danger: "#EF4444",
        warning: "#FACC15",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px rgba(0,0,0,0.15)",
        elevated: "0 12px 35px rgba(0,0,0,0.3)",
        brand: "0 4px 14px rgba(249,115,22,0.18)",
      },
      borderRadius: {
        card: "14px",
        panel: "20px",
      },
      transitionDuration: {
        250: "250ms",
      },
    },
  },
  plugins: [],
};
