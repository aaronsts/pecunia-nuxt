<script lang="ts" setup>
import { ArrowDownLeft, ArrowUpRight } from "lucide-vue-next";
</script>
<template>
	<Card class="w-96">
		<CardHeader>
			<CardTitle>New Transaction</CardTitle>
		</CardHeader>
		<CardContent>
			<Tabs default-value="expense" class="w-full space-y-4">
				<TabsList>
					<TabsTrigger class="flex items-centers gap-1" value="expense">
						<ArrowDownLeft class="text-danger" /> Expense
					</TabsTrigger>
					<TabsTrigger class="flex items-centers gap-1" value="income"
						><ArrowUpRight class="text-success" /> Income
					</TabsTrigger>
				</TabsList>
				<TabsContent value="expense">
					<Dialog>
						<DialogTrigger as-child
							><Button class="w-full">Add Expense</Button></DialogTrigger
						>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>New Expense</DialogTitle>
								<DialogDescription>
									<NewTransaction type="expense" />
								</DialogDescription>
							</DialogHeader>
						</DialogContent>
					</Dialog>
				</TabsContent>
				<TabsContent value="income">
					<Dialog>
						<DialogTrigger as-child
							><Button class="w-full">Add Income</Button></DialogTrigger
						>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>New Income</DialogTitle>
								<DialogDescription>
									<NewTransaction type="income" />
								</DialogDescription>
							</DialogHeader>
						</DialogContent>
					</Dialog>
				</TabsContent>
			</Tabs>
		</CardContent>
	</Card>
</template>
