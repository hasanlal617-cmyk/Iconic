import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        navy: {
          DEFAULT: "#0a1628",
          light: "#132337",
        },
        cyan: {
          accent: "#22d3ee",
          glow: "#67e8f9",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(34, 211, 238, 0.25), transparent), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(14, 165, 233, 0.15), transparent)",
        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(8, 47, 73, 0.12)",
        "glass-lg": "0 16px 48px rgba(8, 47, 73, 0.18)",
        bottle: "0 25px 60px rgba(14, 165, 233, 0.35), 0 10px 20px rgba(8, 47, 73, 0.2)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "wave-slow": "wave 8s ease-in-out infinite",
        "wave-medium": "wave 6s ease-in-out infinite reverse",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        wave: {
          "0%, 100%": { transform: "translateX(0) scaleY(1)" },
          "50%": { transform: "translateX(-2%) scaleY(1.05)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
