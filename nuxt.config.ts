// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ["@nuxtjs/supabase", "@pinia/nuxt"],

	devtools: { enabled: true },

	components: [{ path: "~/components", pathPrefix: false }],

	css: ["~/assets/css/main.css"],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});
