import type { Config } from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#0A0A0A",
        dark: "#111111",
        dark2: "#1A1A1A",
        dark3: "#222222",
        dark4: "#2C2C2C",
        gold: "#C9A84C",
        "gold-l": "#E8C96A",
        "gold-d": "#A07830",
        text: "#F2EDE0",
        text2: "#B5AD98",
        text3: "#6A6255",
        ivory: "#FDFAF5",
        green: "#7AB87A",
        amber: "#D4A847",
        red: "#E07272",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        arabic: ["Cairo", "sans-serif"],
        ui: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C9A84C, #E8C96A, #A07830)",
      },
    },
  },
  plugins: [],
} satisfies Config;
