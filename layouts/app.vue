<script setup lang="ts">
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
onMounted(() => {
  useLoadUserData();
});
</script>

<template>
  <div>
    <nav
      class="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 md:px-8"
    >
      <h2>Pecunia</h2>
      <div v-if="user" class="flex gap-3">
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
        <button
          type="button"
          class="h-fit rounded-md bg-danger px-3 py-2 text-sm text-white"
          @click="userStore.logout"
        >
          Logout
        </button>
      </div>
    </nav>
    <main class="mx-auto max-w-6xl px-4 md:px-8">
      <slot />
    </main>
  </div>
</template>
