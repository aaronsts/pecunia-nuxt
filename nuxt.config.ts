// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "path";

export default defineNuxtConfig({
	modules: [
		"@nuxtjs/supabase",
		"@nuxtjs/tailwindcss",
		"@pinia/nuxt",
		"shadcn-nuxt",
		"nuxt-primevue",
	],
	devtools: { enabled: true },
	components: [{ path: "~/components", pathPrefix: false }],
	tailwindcss: {
		viewer: false,
	},
	shadcn: {
		prefix: "",
		componentDir: "./components/ui",
	},
	primevue: {
		options: {
			unstyled: true,
		},
		importPT: {
			from: path.resolve(__dirname, "./components/presets/data-table/"),
		}, //import and apply preset
	},
});
