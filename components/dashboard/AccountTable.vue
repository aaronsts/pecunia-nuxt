<script lang="ts" setup>
import { ChevronRight, Plus } from "lucide-vue-next";
import { moneyFormatter } from "~/lib/utils";

const { accounts } = useAccountsStore();
</script>
<template>
	<Card class="w-96">
		<CardHeader class="flex flex-row justify-between"
			><CardTitle>All Accounts</CardTitle>
			<Dialog>
				<DialogTrigger as-child
					><Button class="flex items-center gap-1">
						<Plus class="h-4 w-4" />
						New Account</Button
					></DialogTrigger
				>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>New Account</DialogTitle>
						<DialogDescription>
							<NewAccount />
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</CardHeader>
		<CardContent>
			<Table>
				<TableCaption>A list of your accounts.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead> Account </TableHead>
						<TableHead class="text-right"> Amount </TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow v-for="account in accounts" :key="account.id">
						<TableCell>{{ account.name }}</TableCell>
						<TableCell class="text-right flex items-center justify-end gap-2">
							{{ moneyFormatter.format(account.amount)
							}}<Button variant="secondary" size="icon"
								><ChevronRight class="w-4 h-4"
							/></Button>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</CardContent>
	</Card>
</template>
