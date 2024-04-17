<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import Header from "~/components/ui/Header.vue";

definePageMeta({
	layout: "app",
	middleware: ["auth"],
});
</script>
<template>
	<main class="flex flex-1 flex-col">
		<Header />
		<div class="grid p-4 lg:p-8 gap-4 lg:gap-8">
			<CreateTransaction />
			<Card class="w-96">
				<CardHeader class="flex flex-row justify-between"
					><CardTitle>All Accounts</CardTitle>
					<Button class="flex items-center gap-1">
						<Plus class="h-4 w-4" />
						New Account</Button
					>
				</CardHeader>
			</Card>
		</div>
	</main>
</template>
