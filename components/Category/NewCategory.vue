<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

const user = useSupabaseUser();
const categoryStore = useCategoryStore();

const newCategorySchema = toTypedSchema(
	z.object({
		name: z.string().min(3),
	})
);

const { handleSubmit, errors, defineField } = useForm({
	validationSchema: newCategorySchema,
});
const [categoryName, categoryNameAttr] = defineField("name");

const createNewCategory = handleSubmit((values) => {
	if (!user.value) return;
	const data = {
		...values,
		user_id: user.value.id,
	};
	categoryStore.add(data);
});
</script>
<template>
	<div>
		<form @submit="createNewCategory" class="sm:col-span-4">
			<label
				for="add-new-category"
				class="block text-sm font-medium leading-6 text-neutral-900"
				>Category</label
			>
			<input
				id="add-new-category"
				type="text"
				v-bind="categoryNameAttr"
				v-model="categoryName"
				class="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-primary-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
				:class="{
					'!ring-danger': errors.name,
				}"
			/>
			<span class="text-danger text-sm">{{ errors.name }}</span>
			<Button type="submit">Add category</Button>
		</form>
	</div>
</template>
