<script setup lang="ts">
import { TrendingUp } from "lucide-vue-next";
import Header from "~/components/ui/Header.vue";

definePageMeta({
	layout: "app",
	middleware: ["auth"],
});
</script>
<template>
	<div class="h-full">
		<Header />
		<main class="grid grid-cols-3 p-4 gap-4">
			<Card>
				<CardHeader class="gap-2 pb-4">
					<CardTitle>Monthly Expenses</CardTitle>
				</CardHeader>
				<CardContent class="space-y-2">
					<p class="text-3xl text-gray-700">$2,000.00</p>
					<p class="text-sm text-gray-500">
						<span class="text-danger">+5.0%</span> from last month
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader class="gap-2 pb-4">
					<CardTitle>Monthly Income</CardTitle>
				</CardHeader>
				<CardContent class="space-y-2">
					<p class="text-3xl text-gray-700">$2,000.00</p>
					<p class="text-sm text-gray-500">
						<span class="text-success">+5.0%</span> from last month
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader class="gap-2 pb-4">
					<CardTitle>Monthly Balance</CardTitle>
				</CardHeader>
				<CardContent class="space-y-2">
					<p class="text-3xl text-gray-700">$1,000.00</p>
					<p class="text-sm text-gray-500">
						<span class="text-success">+3.0%</span> from last month
					</p>
				</CardContent>
			</Card>

			<AccountTable />
			<RecentTransactions />
		</main>
	</div>
</template>
