/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
	darkMode: "class",
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./app.vue",
		"./error.vue",
		"./node_modules/flowbite/**/*.{js,ts}",
	],
	theme: {
		fontFamily: {
			sans: ["Ubuntu", ...defaultTheme.fontFamily.sans],
		},
		extend: {
			colors: {
				success: "hsl(160, 52%, 59%)",
				danger: "hsl(342, 64%, 65%)",
				white: "hsl(0, 0%, 100%)",
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
				primary: {
					50: "#f1fcf5",
					100: "#dff9e7",
					200: "#c1f1d1",
					300: "#91e4ad",
					400: "#42c86f",
					500: "#33b45e",
					600: "#25944b",
					700: "#20753e",
					800: "#1e5d34",
					900: "#1a4d2d",
					950: "#092a16",
				},
			},
		},
	},
	plugins: [require("flowbite/plugin")],
};
