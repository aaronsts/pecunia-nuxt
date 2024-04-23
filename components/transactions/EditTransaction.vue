<script lang="ts" setup>
import { SquarePen } from "lucide-vue-next";
import type { ITransaction } from "~/types";

const { transaction } = defineProps<{ transaction: ITransaction }>();
</script>
<template>
	<Sheet>
		<SheetTrigger as-child>
			<Button size="icon" variant="ghost">
				<SquarePen stroke-width="1.5" class="w-5 text-gray-500"
			/></Button>
		</SheetTrigger>
		<SheetContent>
			<SheetHeader>
				<SheetTitle>Edit Transaction</SheetTitle>
			</SheetHeader>
			<div class="grid gap-4 py-4">
				<EditTransactionForm :transaction="transaction" />
			</div>
		</SheetContent>
	</Sheet>
</template>
