<script lang="ts" setup>
import { ArrowDownLeft, ArrowUpRight, Plus } from "lucide-vue-next";
</script>
<template>
	<Sheet>
		<SheetTrigger as-child>
			<Button class="flex items-center gap-1">
				<Plus class="h-4 w-4" />
				New Transaction</Button
			>
		</SheetTrigger>
		<SheetContent class="space-y-4">
			<SheetHeader>
				<SheetTitle>New Transaction</SheetTitle>
				<SheetDescription>
					Add an expense or income to your account.
				</SheetDescription>
			</SheetHeader>
			<Tabs default-value="expense" class="w-full space-y-2">
				<TabsList>
					<TabsTrigger class="flex items-centers gap-1" value="expense">
						<ArrowDownLeft class="text-danger" /> Expense
					</TabsTrigger>
					<TabsTrigger class="flex items-centers gap-1" value="income"
						><ArrowUpRight class="text-success" /> Income
					</TabsTrigger>
				</TabsList>
				<TabsContent value="expense">
					<TransactionForm type="expense" />
				</TabsContent>
				<TabsContent value="income">
					<TransactionForm type="income" />
				</TabsContent>
			</Tabs>
		</SheetContent>
	</Sheet>
</template>
