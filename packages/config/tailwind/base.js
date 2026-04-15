// Tailwind base compartilhado — estende este em cada app/pacote
/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [],
  theme: {
    extend: {
      // Tokens de cor do CampLog (HSL para fácil variação de opacidade)
      colors: {
        brand: {
          50:  "hsl(245, 100%, 96%)",
          100: "hsl(245, 90%, 90%)",
          200: "hsl(245, 85%, 80%)",
          300: "hsl(245, 80%, 68%)",
          400: "hsl(245, 75%, 58%)",
          500: "hsl(245, 70%, 50%)", // principal
          600: "hsl(245, 75%, 42%)",
          700: "hsl(245, 80%, 34%)",
          800: "hsl(245, 85%, 24%)",
          900: "hsl(245, 90%, 14%)",
        },
        surface: {
          DEFAULT: "hsl(220, 15%, 10%)",
          raised: "hsl(220, 15%, 14%)",
          overlay: "hsl(220, 15%, 18%)",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        mono: ["JetBrains Mono", "ui-monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

module.exports = config;
