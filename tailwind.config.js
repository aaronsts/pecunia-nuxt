const animate = require("tailwindcss-animate");

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx,vue}",
		"./components/**/*.{ts,tsx,vue}",
		"./app/**/*.{ts,tsx,vue}",
		"./src/**/*.{ts,tsx,vue}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		fontFamily: {
			sans: ["Ubuntu", ...defaultTheme.fontFamily.sans],
		},
		extend: {
			colors: {
				gray: {
					50: "hsl(210, 20%, 98%)",
					100: "hsl(220, 14%, 96%)",
					200: "hsl(220, 13%, 91%)",
					300: "hsl(216, 12%, 84%)",
					400: "hsl(218, 11%, 65%)",
					500: "hsl(220, 9%, 46%)",
					600: "hsl(215, 14%, 34%)",
					700: "hsl(217, 19%, 27%)",
					800: "hsl(215, 28%, 17%)",
					900: "hsl(221, 39%, 11%)",
				},
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
		},
	},
	plugins: [animate],
};
