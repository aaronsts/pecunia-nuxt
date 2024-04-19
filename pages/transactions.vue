<script lang="ts" setup>
import Header from "~/components/ui/Header.vue";

definePageMeta({
	layout: "app",
	middleware: ["auth"],
});
</script>
<template>
	<div>
		<Header text="Transactions" />
		<TransactionList />
	</div>
</template>
