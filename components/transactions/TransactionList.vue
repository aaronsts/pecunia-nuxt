<script lang="ts" setup>
import { moneyFormatter, dateFormatter } from "~/lib/utils";
import { TableSkeleton } from "@/components/ui/skeleton";

const transactionStore = useTransactionStore();
const { transactions, fetching } = storeToRefs(transactionStore);
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
					<TableBody v-if="!fetching">
						<TableRow v-for="transaction in transactions" :key="transaction.id">
							<TableCell>{{
								dateFormatter(transaction.transaction_date)
							}}</TableCell>
							<TableCell>{{ transaction.account?.name }}</TableCell>
							<TableCell>{{ transaction.payee?.name }}</TableCell>
							<TableCell>{{ transaction.category?.name }}</TableCell>
							<TableCell class="text-right">
								<span
									class="w-max text-success"
									v-if="transaction.transaction_type === 'income'"
								>
									+{{ moneyFormatter.format(transaction.amount) }}
								</span>
								<span class="w-max text-danger" v-else>
									-{{ moneyFormatter.format(transaction.amount) }}
								</span>
							</TableCell>
							<TableCell class="text-center">
								<EditTransaction :transaction="transaction" />
							</TableCell>
						</TableRow>
					</TableBody>
					<TableBody v-else>
						<TableSkeleton />
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	</div>
</template>
