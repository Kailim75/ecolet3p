import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // LiveMentor Brand Colors
        forest: {
          DEFAULT: "#1B4D3E",
          light: "#2A6B54",
          dark: "#143D31",
        },
        cream: {
          DEFAULT: "#F5EBD7",
          light: "#FBF7EF",
          dark: "#E8DCC4",
        },
        gold: {
          DEFAULT: "#D4A853",
          light: "#E4BE73",
          dark: "#C49843",
        },
        "warm-gray": {
          50: "#FAF9F7",
          100: "#F0EEE9",
          200: "#E0DCD4",
          300: "#C9C4B8",
          400: "#A9A295",
          500: "#898172",
          600: "#6B6B6B",
          700: "#4B463C",
          800: "#2C2922",
          900: "#1A1814",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      fontFamily: {
        sans: ["'Inter'", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "'Inter'", "sans-serif"],
      },
      fontSize: {
        "display-1": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "900" }],
        "display-2": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "900" }],
        "display-3": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "800" }],
      },
      boxShadow: {
        soft: "0 2px 15px rgba(27, 77, 62, 0.05)",
        warm: "0 4px 20px rgba(27, 77, 62, 0.08)",
        "warm-lg": "0 8px 30px rgba(27, 77, 62, 0.12)",
        gold: "0 4px 20px rgba(212, 168, 83, 0.25)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
