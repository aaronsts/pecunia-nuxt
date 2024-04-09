// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	modules: [
		"@nuxtjs/supabase",
		"@nuxtjs/tailwindcss",
		"@pinia/nuxt",
		"shadcn-nuxt",
	],
	devtools: { enabled: true },
	components: [{ path: "~/components", pathPrefix: false }],
	tailwindcss: {
		viewer: false,
	},
	shadcn: {
		/**
		 * Prefix for all the imported component
		 */
		prefix: "",
		/**
		 * Directory that the component lives in.
		 * @default "./components/ui"
		 */
		componentDir: "./components/ui",
	},
});
