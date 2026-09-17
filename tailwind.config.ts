import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Canvas & Surfaces
        surface: {
          DEFAULT: "#0b1326",
          dim: "#0b1326",
          bright: "#31394d",
          container: {
            DEFAULT: "#171f33",
            lowest: "#060e20",
            low: "#131b2e",
            high: "#222a3d",
            highest: "#2d3449",
          },
          variant: "#2d3449",
          tint: "#aec6ff",
        },
        background: "#0b1326",

        // Primary
        primary: {
          DEFAULT: "#aec6ff",
          container: "#0070f2",
          fixed: {
            DEFAULT: "#d8e2ff",
            dim: "#aec6ff",
          },
        },
        "on-primary": {
          DEFAULT: "#002e6b",
          container: "#fffeff",
          fixed: {
            DEFAULT: "#001a42",
            variant: "#004396",
          },
        },

        // Secondary
        secondary: {
          DEFAULT: "#a4c9ff",
          container: "#2c93f9",
          fixed: {
            DEFAULT: "#d4e3ff",
            dim: "#a4c9ff",
          },
        },
        "on-secondary": {
          DEFAULT: "#00315d",
          container: "#002a51",
          fixed: {
            DEFAULT: "#001c39",
            variant: "#004883",
          },
        },

        // Tertiary
        tertiary: {
          DEFAULT: "#7bd0ff",
          container: "#007fac",
          fixed: {
            DEFAULT: "#c4e7ff",
            dim: "#7bd0ff",
          },
        },
        "on-tertiary": {
          DEFAULT: "#00354a",
          container: "#ffffff",
          fixed: {
            DEFAULT: "#001e2c",
            variant: "#004c69",
          },
        },

        // Error
        error: {
          DEFAULT: "#ffb4ab",
          container: "#93000a",
        },
        "on-error": {
          DEFAULT: "#690005",
          container: "#ffdad6",
        },

        // On Surface
        "on-surface": {
          DEFAULT: "#dae2fd",
          variant: "#c1c6d7",
        },
        "on-background": "#dae2fd",

        // Outline
        outline: {
          DEFAULT: "#8b90a0",
          variant: "#414754",
        },

        // Inverse
        "inverse-surface": "#dae2fd",
        "inverse-on-surface": "#283044",
        "inverse-primary": "#005ac4",

        // Accent aliases
        "sap-blue": "#0070f2",
        "cobalt": "#0a85ea",
        "sky-accent": "#38bdf8",
      },
      fontFamily: {
        inter: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": [
          "3.5rem",
          { lineHeight: "4rem", letterSpacing: "-0.03em", fontWeight: "700" },
        ],
        "display-lg-mobile": [
          "2.25rem",
          {
            lineHeight: "2.75rem",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
        "headline-lg": [
          "2.25rem",
          {
            lineHeight: "2.75rem",
            letterSpacing: "-0.02em",
            fontWeight: "600",
          },
        ],
        "headline-lg-mobile": [
          "1.75rem",
          {
            lineHeight: "2.25rem",
            letterSpacing: "-0.015em",
            fontWeight: "600",
          },
        ],
        "headline-md": [
          "1.5rem",
          { lineHeight: "2rem", letterSpacing: "-0.015em", fontWeight: "600" },
        ],
        "headline-sm": [
          "1.25rem",
          {
            lineHeight: "1.75rem",
            letterSpacing: "-0.01em",
            fontWeight: "600",
          },
        ],
        "body-lg": [
          "1.125rem",
          {
            lineHeight: "1.75rem",
            letterSpacing: "-0.005em",
            fontWeight: "400",
          },
        ],
        "body-md": [
          "0.875rem",
          { lineHeight: "1.375rem", letterSpacing: "0em", fontWeight: "400" },
        ],
        "body-sm": [
          "0.75rem",
          {
            lineHeight: "1.125rem",
            letterSpacing: "0.005em",
            fontWeight: "400",
          },
        ],
        "label-lg": [
          "0.875rem",
          { lineHeight: "1.25rem", letterSpacing: "0.01em", fontWeight: "500" },
        ],
        "label-md": [
          "0.75rem",
          { lineHeight: "1rem", letterSpacing: "0.02em", fontWeight: "600" },
        ],
        "label-sm": [
          "0.6875rem",
          {
            lineHeight: "0.875rem",
            letterSpacing: "0.04em",
            fontWeight: "600",
          },
        ],
        "metric-xl": [
          "2.5rem",
          { lineHeight: "3rem", letterSpacing: "-0.025em", fontWeight: "700" },
        ],
        "metric-md": [
          "1.5rem",
          { lineHeight: "2rem", letterSpacing: "-0.015em", fontWeight: "600" },
        ],
      },
      borderRadius: {
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2rem",
        gutter: "1.5rem",
        "gutter-sm": "0.75rem",
        "gutter-lg": "2rem",
        margin: "2rem",
        "margin-sm": "1rem",
        "margin-lg": "3rem",
      },
      keyframes: {
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 10s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
