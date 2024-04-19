<script lang="ts" setup>
definePageMeta({
	layout: "app",
	middleware: ["auth"],
});
</script>
<template>
	<div class="p4 lg:p-8">
		<TransactionList />
	</div>
</template>
