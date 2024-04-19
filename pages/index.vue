<script setup lang="ts">
import Header from "~/components/ui/Header.vue";

definePageMeta({
	layout: "app",
	middleware: ["auth"],
});
</script>
<template>
	<div>
		<Header />
		<main class="grid grid-cols-[384px_1fr] p-4 lg:p-8 gap-4 lg:gap-8">
			<CreateTransaction />
			<TransactionList />
			<AccountTable />
		</main>
	</div>
</template>
