<script setup lang="ts">
definePageMeta({
	layout: "app",
	middleware: ["auth"],
});

import { onMounted } from "vue";
import { initFlowbite } from "flowbite";

// initialize components based on data attribute selectors
onMounted(() => {
	initFlowbite();
});
</script>
<template>
	<!-- <NewTransaction />
  <TransactionList /> -->
	<div></div>
</template>
