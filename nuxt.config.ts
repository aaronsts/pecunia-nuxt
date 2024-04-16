// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["@nuxtjs/supabase", "@pinia/nuxt", "shadcn-nuxt"],

	devtools: { enabled: true },

	components: [{ path: "~/components", pathPrefix: false }],

	shadcn: {
		prefix: "ui",
		componentDir: "./components/ui",
	},

	css: ["~/assets/css/main.css"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});
