<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next";
import { toDate } from "radix-vue/date";
import Header from "~/components/ui/Header.vue";
import { moneyFormatter, dateFormatter } from "~/lib/utils";

const transactionStore = useTransactionStore();
const { transactions } = storeToRefs(transactionStore);

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
			<Card class="w-full h-fit row-span-2">
				<CardHeader>
					<CardTitle>Recent Transactions</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableCaption>A list of your recent transactions.</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead> Date </TableHead>
								<TableHead> Account </TableHead>
								<TableHead> Payee </TableHead>
								<TableHead> Category </TableHead>
								<TableHead class="text-right"> Amount </TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow
								v-for="transaction in transactions"
								:key="transaction.id"
							>
								<TableCell>{{
									dateFormatter(transaction.transaction_date)
								}}</TableCell>
								<TableCell>{{ transaction.account?.name }}</TableCell>
								<TableCell>{{ transaction.payee?.name }}</TableCell>
								<TableCell>{{ transaction.category?.name }}</TableCell>
								<TableCell
									class="text-right flex items-center justify-end gap-2"
								>
									{{ moneyFormatter.format(transaction.amount)
									}}<Button variant="secondary" size="icon"
										><ChevronRight class="w-4 h-4"
									/></Button>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>
			</Card>
			<AccountTable />
		</main>
	</div>
</template>
