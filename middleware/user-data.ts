export default defineNuxtRouteMiddleware(() => {
  const nuxtApp = useNuxtApp()
  // Single execution client-only actions
  if (process.server || (process.client && !nuxtApp.isHydrating)) return
  // any code below this line will be run once on the client side
  useLoadUserData()
})