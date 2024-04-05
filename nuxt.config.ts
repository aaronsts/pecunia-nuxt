// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	devtools: { enabled: true },
	components: [{ path: "~/components", pathPrefix: false }],
	tailwindcss: {
		viewer: false,
	},
	modules: ["@nuxtjs/supabase", "@nuxtjs/tailwindcss", "@pinia/nuxt"],
});
