// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		"@nuxtjs/supabase",
		"@pinia/nuxt",
		"@nuxtjs/tailwindcss",
		"shadcn-nuxt",
	],

	devtools: { enabled: true },
	components: [{ path: "~/components", pathPrefix: false }],
	shadcn: {
		prefix: "",
		componentDir: "./components/ui",
	},

	css: ["~/assets/css/main.css"],
});
