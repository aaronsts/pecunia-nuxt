<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

const user = useSupabaseUser();
const { accounts } = useAccountsStore();
const { payees } = usePayeeStore();
const { categories } = useCategoryStore();
const transactionStore = useTransactionStore();

const newTransactionSchema = toTypedSchema(
	z.object({
		account_id: z.string(),
		payee_id: z.number(),
		category_id: z.number(),
		amount: z.number(),
		description: z.string(),
		transaction_date: z.string(),
	})
);

const { handleSubmit, errors, defineField } = useForm({
	validationSchema: newTransactionSchema,
});

// Fields
const [description, descriptionProps] = defineField("description");
const [account, accountProps] = defineField("account_id");
const [amount, amountProps] = defineField("amount");
const [payee, payeeProps] = defineField("payee_id");
const [category, categoryProps] = defineField("category_id");
const [date, dateProps] = defineField("transaction_date");

const createNewTransaction = handleSubmit((values) => {
	if (!user.value) return;
	const data = {
		...values,
		user_id: user.value.id,
	};
	transactionStore.add(data);
});
</script>
<template>
	<div>
		<form @submit="createNewTransaction">
			<div>
				<label
					for="description"
					class="block text-sm font-medium leading-6 text-neutral-900"
					>Description</label
				>
				<input
					id="description"
					type="text"
					v-bind="descriptionProps"
					v-model="description"
					class="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-primary-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
					:class="{ '!ring-danger': errors.description }"
				/>
				<span class="text-danger text-sm">{{ errors.description }}</span>
			</div>
			<div>
				<label
					for="amount"
					class="block text-sm font-medium leading-6 text-neutral-900"
					>Amount</label
				>
				<input
					id="amount"
					type="number"
					v-bind="amountProps"
					v-model="amount"
					class="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-primary-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
					:class="{ '!ring-danger': errors.amount }"
				/>
				<span class="text-danger text-sm">{{ errors.amount }}</span>
			</div>
			<div>
				<label
					for="account"
					class="block text-sm font-medium leading-6 text-neutral-900"
					>Account</label
				>
				<select
					id="account"
					v-model="account"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					:class="{ '!ring-danger': errors.account_id }"
				>
					<option
						v-for="account in accounts"
						v-bind="accountProps"
						:key="account.id"
						:value="account.id"
					>
						{{ account.name }}
					</option>
				</select>
				<span class="text-danger text-sm">{{ errors.account_id }}</span>
			</div>
			<div>
				<label
					for="payee"
					class="block text-sm font-medium leading-6 text-neutral-900"
					>Payee</label
				>
				<select
					id="payee"
					v-model="payee"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					:class="{ '!ring-danger': errors.payee_id }"
				>
					<option
						v-for="payee in payees"
						v-bind="payeeProps"
						:key="payee.id"
						:value="payee.id"
					>
						{{ payee.name }}
					</option>
				</select>
				<span class="text-danger text-sm">{{ errors.payee_id }}</span>
			</div>
			<div>
				<label
					for="category"
					class="block text-sm font-medium leading-6 text-neutral-900"
					>Category</label
				>
				<select
					id="category"
					v-model="category"
					class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					:class="{ '!ring-danger': errors.category_id }"
				>
					<option
						v-for="category in categories"
						v-bind="categoryProps"
						:key="category.id"
						:value="category.id"
					>
						{{ category.name }}
					</option>
				</select>
				<span class="text-danger text-sm">{{ errors.category_id }}</span>
			</div>
			<div>
				<label
					for="date"
					class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>
					Date of transaction</label
				>
				<input
					type="date"
					name="date"
					id="date"
					v-model="date"
					v-bind="dateProps"
				/>
			</div>
			<button
				type="submit"
				class="rounded-md mt-4 hover:bg-primary-200 transition-colors px-3 py-2 bg-primary block text-white"
			>
				Add Transaction
			</button>
		</form>
	</div>
</template>
