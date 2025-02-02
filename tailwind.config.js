import animate from "tailwindcss-animate"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: {
          DEFAULT: "var(--color-border)",
          hover: "var(--color-border-hover)"
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--color-background)",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "hsl(var(--primary-foreground))",
          hover: "var(--color-primary-hover)",
          soft: "var(--color-primary-soft)",
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
          hover: "var(--color-card-hover)",
        },
        'dark-surface': '#1f2937', // You can adjust this color value
        surface: {
          DEFAULT: 'var(--color-surface)',
          dark: 'hsl(var(--surface-dark))',
          hover: 'hsl(var(--surface-hover))',
          soft: "var(--color-surface-soft)",
        },
        'primary-hover': 'var(--color-primary-hover)',
        'primary-text': 'var(--color-text-primary)',
        'secondary-text': 'var(--color-text-secondary)',
        text: {
          DEFAULT: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
        },
        error: "var(--color-error)",
        success: "var(--color-success)",
        warning: "var(--color-warning)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        'soft-xl': '0 20px 27px rgba(0, 0, 0, 0.05)',
        'soft-md': '0 4px 7px rgba(0, 0, 0, 0.07)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              color: 'var(--primary)',
              '&:hover': {
                color: 'var(--primary-dark)',
              },
            },
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      textColor: {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
      }
    },
  },
  plugins: [
    animate,
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
