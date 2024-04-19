<script lang="ts" setup>
definePageMeta({
	layout: "app",
	middleware: ["auth"],
});
</script>
<template>
	<div>
		<header class="text-gray-700 p-4 lg:p-8 bg-white border-b border-gray-300">
			<h3 class="text-gray-700">Transactions</h3>
		</header>
		<TransactionList />
	</div>
</template>
