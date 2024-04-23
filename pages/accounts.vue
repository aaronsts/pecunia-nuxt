<script setup lang="ts">
import Header from "~/components/ui/Header.vue";

definePageMeta({
	layout: "app",
	middleware: ["auth"],
});
</script>
<template>
	<div>
		<Header text="Accounts" />
		<div class="p-4">
			<AccountList />
		</div>
	</div>
</template>
