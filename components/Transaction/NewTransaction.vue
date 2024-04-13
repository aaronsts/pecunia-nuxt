<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

const user = useSupabaseUser();
const { accounts } = useAccountsStore();
const { payees } = usePayeeStore();
const { categories } = useCategoryStore();
const transactionStore = useTransactionStore();

const TRANSACTION_TYPES = ["expense", "income"] as const;

const newTransactionSchema = toTypedSchema(
	z.object({
		amount: z.number(),
		transaction_date: z.date(),
		transaction_type: z.enum(TRANSACTION_TYPES, {
			required_error: "You need to select a notification type.",
		}),
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

	const formattedDate = values.transaction_date.toISOString();
	const data = {
		...values,
		user_id: user.value.id,
		transaction_date: formattedDate,
		payee_id: parseInt(values.payee_id),
		category_id: parseInt(values.category_id),
	};

	transactionStore.add(data);
});
</script>
<template>
	<div>
		<form class="space-y-6 max-w-sm" @submit="createNewTransaction">
			<Button type="submit">Add Transaction</Button>
		</form>
	</div>
</template>
