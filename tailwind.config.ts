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
        // Semantic colors from CSS variables
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

        // LiveMentor-Inspired Brand Colors
        // Primary: Deep Forest Green
        forest: {
          DEFAULT: "#1B4D3E",
          light: "#2A6B54",
          dark: "#143D31",
          50: "#E8F5F0",
          100: "#C4E8DC",
          200: "#9CDAC7",
          300: "#74CCB2",
          400: "#4CBE9D",
          500: "#2A6B54",
          600: "#1B4D3E",
          700: "#143D31",
          800: "#0D2D24",
          900: "#061D17",
        },

        // Accent: Warm Cream/Beige (LiveMentor background)
        cream: {
          DEFAULT: "#F5EBD7",
          light: "#FBF7EF",
          dark: "#E8DCC4",
          50: "#FEFDFB",
          100: "#FBF7EF",
          200: "#F5EBD7",
          300: "#E8DCC4",
          400: "#DBCDB1",
          500: "#CEBE9E",
          600: "#B5A67E",
          700: "#9C8E5E",
          800: "#83763E",
          900: "#6A5E1E",
        },

        // Gold accent (for CTAs and highlights)
        gold: {
          DEFAULT: "#D4A853",
          light: "#E4BE73",
          dark: "#C49843",
          50: "#FDF8EE",
          100: "#FAEFD6",
          200: "#F5DFAD",
          300: "#EFCF84",
          400: "#EABF5B",
          500: "#D4A853",
          600: "#C49843",
          700: "#A47D33",
          800: "#846223",
          900: "#644713",
        },

        // Warm Gray for text
        "warm-gray": {
          50: "#FAF9F7",
          100: "#F0EEE9",
          200: "#E0DCD4",
          300: "#C9C4B8",
          400: "#A9A295",
          500: "#898172",
          600: "#6A6356",
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
        sans: ["'Inter'", "-apple-system", "BlinkMacSystemFont", "'SF Pro Display'", "'SF Pro Text'", "system-ui", "sans-serif"],
        display: ["'Playfair Display'", "Georgia", "serif"],
      },
      fontSize: {
        "display-1": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "900" }],
        "display-2": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "900" }],
        "display-3": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "800" }],
        "display-4": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "800" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(27, 77, 62, 0.04)",
        sm: "0 2px 4px rgba(27, 77, 62, 0.06)",
        md: "0 4px 8px rgba(27, 77, 62, 0.08)",
        lg: "0 8px 16px rgba(27, 77, 62, 0.10)",
        xl: "0 12px 24px rgba(27, 77, 62, 0.12)",
        "2xl": "0 20px 40px rgba(27, 77, 62, 0.15)",
        warm: "0 4px 20px rgba(27, 77, 62, 0.08)",
        "warm-lg": "0 8px 30px rgba(27, 77, 62, 0.12)",
        gold: "0 4px 20px rgba(212, 168, 83, 0.25)",
        soft: "0 2px 15px rgba(27, 77, 62, 0.05)",
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
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
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
        shimmer: "shimmer 2s infinite linear",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
