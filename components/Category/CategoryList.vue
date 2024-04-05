<script setup lang="ts">
import { Trash2 } from "lucide-vue-next";

const categoryStore = useCategoryStore();
const { categories } = storeToRefs(categoryStore);
</script>

<template>
	<h3>Manage Categories</h3>
	<ol
		v-if="categories.length !== 0"
		id="categories"
		class="flex flex-col gap-3"
	>
		<li
			v-for="category in categories"
			class="flex items-end gap-2"
			:key="category.id"
		>
			<p class="leading-none">{{ category.name }}</p>
			<button @click="categoryStore.destroy(category.id)">
				<Trash2 :size="16" />
			</button>
		</li>
	</ol>
	<div v-else>
		<p>No Categories</p>
	</div>
</template>
