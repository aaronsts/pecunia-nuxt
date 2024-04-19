<script lang="ts" setup>
import { ChevronRight, Plus } from "lucide-vue-next";
import { moneyFormatter } from "~/lib/utils";

const { accounts } = useAccountsStore();
</script>
<template>
	<Card>
		<CardHeader class="flex flex-row justify-between"
			><CardTitle>All Accounts</CardTitle>
			<NewAccount />
		</CardHeader>
		<CardContent>
			<Table>
				<TableCaption>A list of your accounts.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead> Account </TableHead>
						<TableHead>Description</TableHead>
						<TableHead class="text-right"> Amount </TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow v-for="account in accounts" :key="account.id">
						<TableCell>{{ account.name }}</TableCell>
						<TableCell>{{ account.description }}</TableCell>
						<TableCell class="text-right flex items-center justify-end gap-2">
							{{ moneyFormatter.format(account.amount) }}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</CardContent>
	</Card>
</template>
