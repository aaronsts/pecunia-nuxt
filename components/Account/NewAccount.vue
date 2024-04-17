<script lang="ts" setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const newAccountSchema = toTypedSchema(
	z.object({
		name: z.string(),
		amount: z.number(),
		description: z.string().optional().nullable(),
	})
);

const { handleSubmit } = useForm();
const createNewAccount = handleSubmit((values) => {
	console.log("NewAccount", values);
});
</script>
<template>
	<form class="grid gap-3" @submit="createNewAccount">
		<FormField v-slot="{ componentField }" name="name">
			<FormItem>
				<FormLabel>Name</FormLabel>
				<FormControl>
					<FormInput
						type="name"
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
					<FormInput
						type="number"
						placeholder="$0.00"
						v-bind="componentField"
					/>
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
		<Button>Save</Button>
	</form>
</template>
