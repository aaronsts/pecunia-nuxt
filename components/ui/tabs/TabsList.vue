<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { TabsList, type TabsListProps } from "radix-vue";
import { cn } from "@/lib/utils";

const props = defineProps<
	TabsListProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
	const { class: _, ...delegated } = props;

	return delegated;
});
</script>

<template>
	<TabsList
		v-bind="delegatedProps"
		:class="
			cn(
				'inline-flex  w-full gap-2 items-center justify-between rounded-lg p-1 bg-gray-300 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
				props.class
			)
		"
	>
		<slot />
	</TabsList>
</template>
