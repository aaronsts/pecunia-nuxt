<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

const user = useSupabaseUser();
const { accounts } = useAccountsStore();
const { payees } = usePayeeStore();
const { categories } = useCategoryStore();
const transactionStore = useTransactionStore();

const { type } = defineProps<{
	type: "expense" | "income";
}>();

const newTransactionSchema = toTypedSchema(
	z.object({
		amount: z.number(),
		transaction_date: z.date(),
		account_id: z.string(),
		description: z.string(),
		payee_id: z.string(),
		category_id: z.string(),
	})
);

const { handleSubmit, errors } = useForm({
	validationSchema: newTransactionSchema,
});

const createNewTransaction = handleSubmit((values) => {
	if (!user.value) return;

	console.log(type);

	// const formattedDate = values.transaction_date.toISOString();
	// const data = {
	// 	...values,
	// 	user_id: user.value.id,
	// 	transaction_date: formattedDate,
	// 	payee_id: parseInt(values.payee_id),
	// 	category_id: parseInt(values.category_id),
	// };

	// transactionStore.add(data);
});
</script>
<template>
	<div>
		<form class="space-y-6 max-w-sm" @submit="createNewTransaction">
			<div>
				<!-- <Input name="amount" type="number" label="Amount" placeholder="$0.00" /> -->
				<Input name="amount" type="number" label="Amount" placeholder="$0.00" />
			</div>
			<Button type="submit">Add Transaction</Button>
		</form>
	</div>
</template>
