<script setup lang="ts">
import Sidebar from "~/components/ui/Sidebar.vue";

onMounted(() => {
	useLoadUserData();
});
</script>

<template>
	<div class="bg-gray-100 h-screen w-full">
		<Sidebar />
		<div class="flex md:ml-56 h-full lg:ml-72 flex-col">
			<slot />
		</div>
	</div>
</template>
