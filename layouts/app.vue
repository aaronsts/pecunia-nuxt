<script setup lang="ts">
import Header from "~/components/ui/Header.vue";

onMounted(() => {
	useLoadUserData();
});
</script>

<template>
	<div class="antialiased">
		<Sidebar />
		<main class="ml-[320px] mx-auto max-w-6xl p-8">
			<Header />
			<slot />
		</main>
	</div>
</template>
