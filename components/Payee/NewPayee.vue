<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

const user = useSupabaseUser();
const payeeStore = usePayeeStore();

const newPayeeSchema = toTypedSchema(
	z.object({
		name: z.string().min(3),
	})
);

const { handleSubmit, errors, defineField } = useForm({
	validationSchema: newPayeeSchema,
});
const [payeeName, payeeNameAttr] = defineField("name");

const createNewPayee = handleSubmit((values) => {
	if (!user.value) return;
	const data = {
		...values,
		user_id: user.value.id,
	};
	payeeStore.add(data);
});
</script>
<template>
	<div>
		<form @submit="createNewPayee" class="sm:col-span-4">
			<label
				for="add-new-payee"
				class="block text-sm font-medium leading-6 text-neutral-900"
				>Payee</label
			>
			<input
				id="add-new-payee"
				type="text"
				v-bind="payeeNameAttr"
				v-model="payeeName"
				class="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-primary-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
				:class="{
					'!ring-danger': errors.name,
				}"
			/>
			<span class="text-danger text-sm">{{ errors.name }}</span>
			<Button type="submit">Add Payee</Button>
		</form>
	</div>
</template>
