<template>
  <nav class="max-w-6xl mx-auto px-4 md:px-8 py-6 flex justify-between items-center">
    <h2>Pecunia</h2>
    <ul class="flex items-center gap-3 text-lg">
      <li>
        <NuxtLink to="/">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="profile">Profile</NuxtLink>
      </li>
      <li>
        <NuxtLink to="accounts">Accounts</NuxtLink>
      </li>
    </ul>
    <button @click="userStore.logout" v-if="user" type="button"
      class="h-fit text-sm bg-danger text-white py-2 px-3 rounded-md">Logout</button>
  </nav>
  <main class="max-w-6xl mx-auto px-4 md:px-8">
    <slot />
  </main>
</template>

<script setup lang="ts">
const { isInitialized, initialized } = useAccountsStore()
const userStore = useUserStore()

const { user } = storeToRefs(userStore)

const accountActions = useAccounts()

onMounted(() => {
  if (!isInitialized) {
    accountActions.fetchAll()
    initialized()
  }
})
</script>