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
          950: "#041e32",
        },
        navy: {
          DEFAULT: "#060d19",
          light: "#0d1b2e",
          card: "#0a1526",
          border: "#182a44",
        },
        cyan: {
          accent: "#22d3ee",
          glow: "#67e8f9",
          bright: "#00f2fe",
        },
        luxury: {
          gold: "#d4af37",
          platinum: "#e5e7eb",
          silver: "#cbd5e1",
        }
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "var(--font-plus-jakarta)", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(34, 211, 238, 0.25), transparent), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(14, 165, 233, 0.15), transparent)",
        "glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 100%)",
        "dark-glass-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.01) 100%)",
        "radial-caustic":
          "radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(4, 30, 50, 0.25)",
        "glass-lg": "0 20px 50px rgba(4, 30, 50, 0.4)",
        "glass-dark": "0 8px 32px rgba(0, 0, 0, 0.4)",
        glow: "0 0 40px rgba(34, 211, 238, 0.3)",
        "glow-lg": "0 0 70px rgba(34, 211, 238, 0.45)",
        bottle: "0 30px 70px rgba(14, 165, 233, 0.4), 0 10px 25px rgba(6, 13, 25, 0.3)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out 2s infinite",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "wave-slow": "wave 10s ease-in-out infinite",
        "wave-medium": "wave 7s ease-in-out infinite reverse",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(1deg)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.04)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        wave: {
          "0%, 100%": { transform: "translateX(0) scaleY(1)" },
          "50%": { transform: "translateX(-2%) scaleY(1.06)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
