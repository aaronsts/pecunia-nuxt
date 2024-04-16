<script setup lang="ts">
import Header from "~/components/ui/Header.vue";
import MobileSidebar from "~/components/ui/MobileSidebar.vue";
import Sidebar from "~/components/ui/Sidebar.vue";

// import Header from "~/components/ui/Header.vue";

onMounted(() => {
	useLoadUserData();
});
</script>

<template>
	<div
		class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
	>
		<Sidebar />
		<div class="flex flex-col">
			<!-- <MobileSidebar /> -->
			<slot />
		</div>
	</div>
</template>
