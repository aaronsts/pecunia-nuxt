<script setup lang="ts">
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(() => {
	useLoadUserData();
});
</script>

<template>
	<div class="antialiased">
		<Sidebar />
		<main class="mx-auto max-w-6xl px-4 md:px-8">
			<slot />
		</main>
	</div>
</template>
