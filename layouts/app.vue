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
	<div class="bg-gray-100 h-screen w-full">
		<Sidebar />
		<div class="flex md:ml-56 h-full lg:ml-72 flex-col">
			<!-- <MobileSidebar /> -->

			<slot />
		</div>
	</div>
</template>
