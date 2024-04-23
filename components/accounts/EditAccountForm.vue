<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import type { Tables } from "~/types/supabase";

const { account } = defineProps<{ account: Tables<"account"> }>();

const accountStore = useAccountsStore();
const user = useSupabaseUser();

const newAccountSchema = toTypedSchema(
	z.object({
		name: z.string(),
		amount: z.number(),
		description: z.string().optional().nullable(),
	})
);

const { handleSubmit } = useForm({
	validationSchema: newAccountSchema,
	initialValues: {
		name: account.name,
		amount: account.amount,
		description: account.description,
	},
});

const createNewAccount = handleSubmit((values) => {
	if (!user.value) return;
	const data = {
		...account,
		name: values.name,
		amount: values.amount,
		description: values.description ? values.description : null,
	};
	accountStore.update(data);
});
</script>
<template>
	<form class="grid gap-3" @submit="createNewAccount">
		<FormField v-slot="{ componentField }" name="name">
			<FormItem>
				<FormLabel>Name</FormLabel>
				<FormControl>
					<Input
						type="text"
						placeholder="Ex. Main Checking Account"
						v-bind="componentField"
					/>
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<FormField v-slot="{ componentField }" name="amount">
			<FormItem>
				<FormLabel>Starting Amount</FormLabel>
				<FormControl>
					<Input type="number" placeholder="$0.00" v-bind="componentField" />
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<FormField v-slot="{ componentField }" name="description">
			<FormItem>
				<FormLabel>Description</FormLabel>
				<FormControl>
					<Textarea
						placeholder="Ex. Used for all grocery purchases"
						class="resize-none"
						v-bind="componentField"
					/>
				</FormControl>
				<FormMessage />
			</FormItem>
		</FormField>
		<!-- <Button>Save</Button> -->
		<SheetFooter>
			<SheetClose as-child>
				<Button type="submit"> Save </Button>
			</SheetClose>
		</SheetFooter>
	</form>
</template>
