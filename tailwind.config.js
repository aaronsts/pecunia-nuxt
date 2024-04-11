const animate = require("tailwindcss-animate");

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	safelist: ["dark"],
	prefix: "",

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
				"primary-50": "rgb(var(--primary-50))",
				"primary-100": "rgb(var(--primary-100))",
				"primary-200": "rgb(var(--primary-200))",
				"primary-300": "rgb(var(--primary-300))",
				"primary-400": "rgb(var(--primary-400))",
				"primary-500": "rgb(var(--primary-500))",
				"primary-600": "rgb(var(--primary-600))",
				"primary-700": "rgb(var(--primary-700))",
				"primary-800": "rgb(var(--primary-800))",
				"primary-900": "rgb(var(--primary-900))",
				"primary-950": "rgb(var(--primary-950))",
				"surface-0": "rgb(var(--surface-0))",
				"surface-50": "rgb(var(--surface-50))",
				"surface-100": "rgb(var(--surface-100))",
				"surface-200": "rgb(var(--surface-200))",
				"surface-300": "rgb(var(--surface-300))",
				"surface-400": "rgb(var(--surface-400))",
				"surface-500": "rgb(var(--surface-500))",
				"surface-600": "rgb(var(--surface-600))",
				"surface-700": "rgb(var(--surface-700))",
				"surface-800": "rgb(var(--surface-800))",
				"surface-900": "rgb(var(--surface-900))",
				"surface-950": "rgb(var(--surface-950))",
			},
			borderRadius: {
				xl: "calc(var(--radius) + 4px)",
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
				"collapsible-down": {
					from: { height: 0 },
					to: { height: "var(--radix-collapsible-content-height)" },
				},
				"collapsible-up": {
					from: { height: "var(--radix-collapsible-content-height)" },
					to: { height: 0 },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"collapsible-down": "collapsible-down 0.2s ease-in-out",
				"collapsible-up": "collapsible-up 0.2s ease-in-out",
			},
		},
	},
	plugins: [animate],
};
