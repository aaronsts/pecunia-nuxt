/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],

	theme: {
		colors: {
			primary: {
				DEFAULT: "hsl(191, 88%, 24%)",
				100: "hsl(188, 100%, 33%)",
				200: "hsl(189, 97%, 26%)",
				300: "hsl(191, 88%, 24%)",
				400: "hsl(193, 100%, 16%)",
			},
			secondary: {
				DEFAULT: "hsl(85, 40%, 55%)",
				100: "hsl(84, 46%, 80%)",
				200: "hsl(84, 44%, 67%)",
				300: "hsl(85, 40%, 55%)",
				400: "hsl(86, 42%, 44%)",
			},

			success: {
				DEFAULT: "hsl(125, 50%, 55%)",
			},
			danger: {
				DEFAULT: "hsl(0, 50%, 55%)",
			},
			info: {
				DEFAULT: "hsl(185, 50%, 55%)",
			},
			warning: {
				DEFAULT: "hsl(48, 60%, 55%)",
			},

			neutral: {
				50: "hsl(60, 10%, 96%)",
				100: "hsl(60, 10%, 92%)",
				200: "hsl(60, 9%, 83%)",
				300: "hsl(60, 9%, 72%)",
				400: "hsl(54, 10%, 61%)",
				500: "hsl(50, 10%, 53%)",
				600: "hsl(49, 9%, 48%)",
				700: "hsl(43, 9%, 40%)",
				800: "hsl(43, 8%, 34%)",
				900: "hsl(36, 7%, 28%)",
				950: "hsl(40, 8%, 10%)",
			},
			white: {
				DEFAULT: "hsl(60, 10%, 96%)",
			},
			black: {
				DEFAULT: "hsl(40, 8%, 10%)",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
