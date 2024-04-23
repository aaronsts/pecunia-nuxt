<script lang="ts" setup>
import { ArrowDownLeft, ArrowUpRight, Plus } from "lucide-vue-next";
import { moneyFormatter, dateFormatter } from "~/lib/utils";

const transactionStore = useTransactionStore();
const { transactions } = storeToRefs(transactionStore);
</script>
<template>
	<div class="p-4">
		<Card>
			<CardHeader class="flex flex-row justify-between">
				<CardTitle>Recent Transactions</CardTitle>
				<NewTransaction />
			</CardHeader>
			<CardContent>
				<Table>
					<TableCaption>A list of your transactions.</TableCaption>
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
						<TableRow v-for="transaction in transactions" :key="transaction.id">
							<TableCell>{{
								dateFormatter(transaction.transaction_date)
							}}</TableCell>
							<TableCell>{{ transaction.account?.name }}</TableCell>
							<TableCell>{{ transaction.payee?.name }}</TableCell>
							<TableCell>{{ transaction.category?.name }}</TableCell>
							<TableCell class="text-right flex items-center justify-end gap-2">
								<div
									class="w-max text-success"
									v-if="transaction.transaction_type === 'income'"
								>
									+{{ moneyFormatter.format(transaction.amount) }}
								</div>
								<div class="w-max text-danger" v-else>
									-{{ moneyFormatter.format(transaction.amount) }}
								</div>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	</div>
</template>
