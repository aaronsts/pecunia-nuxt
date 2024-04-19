<script setup lang="ts">
import Header from "~/components/ui/Header.vue";
import { moneyFormatter } from "~/lib/utils";

definePageMeta({
	layout: "app",
	middleware: ["auth"],
});

const accountStore = useAccountsStore();
const { balance } = storeToRefs(accountStore);

const transactionStore = useTransactionStore();
const { monthlyExpenses, monthlyIncome } = storeToRefs(transactionStore);
</script>
<template>
	<div class="h-full">
		<Header text="Dashboard" />
		<main class="grid grid-cols-3 p-4 gap-4">
			<Card>
				<CardHeader class="gap-2 pb-4">
					<CardTitle>Monthly Expenses</CardTitle>
				</CardHeader>
				<CardContent class="space-y-2">
					<p class="text-3xl text-gray-700">
						{{ moneyFormatter.format(monthlyExpenses) }}
					</p>
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
					<p class="text-3xl text-gray-700">
						{{ moneyFormatter.format(monthlyIncome) }}
					</p>
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
					<p class="text-3xl text-gray-700">
						{{ moneyFormatter.format(monthlyIncome + monthlyExpenses) }}
					</p>
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
