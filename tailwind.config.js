const animate = require("tailwindcss-animate");
const defaultTheme = require("tailwindcss/defaultTheme");

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
				success: "hsl(160, 52%, 59%)",
				danger: "hsl(342, 64%, 65%)",
				white: "hsl(0, 0%, 100%)",
				// gray: {
				// 	50: "hsl(210, 20%, 98%)",
				// 	100: "hsl(220, 14%, 96%)",
				// 	200: "hsl(220, 13%, 91%)",
				// 	300: "hsl(216, 12%, 84%)",
				// 	400: "hsl(218, 11%, 65%)",
				// 	500: "hsl(220, 9%, 46%)",
				// 	600: "hsl(215, 14%, 34%)",
				// 	700: "hsl(217, 19%, 27%)",
				// 	800: "hsl(215, 28%, 17%)",
				// 	900: "hsl(221, 39%, 11%)",
				// },
				primary: {
					50: "hsl(147, 43%, 96%)",
					100: "hsl(141, 45%, 90%)",
					200: "hsl(144, 42%, 80%)",
					300: "hsl(149, 40%, 67%)",
					400: "hsl(150, 36%, 52%)",
					500: "hsl(152, 47%, 41%)",
					600: "hsl(153, 52%, 30%)",
					700: "hsl(155, 53%, 24%)",
					800: "hsl(154, 49%, 20%)",
					900: "hsl(156, 48%, 17%)",
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
