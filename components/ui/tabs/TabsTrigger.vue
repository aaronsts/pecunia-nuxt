<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from "radix-vue";
import { cn } from "@/lib/utils";

const props = defineProps<
	TabsTriggerProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
	const { class: _, ...delegated } = props;

	return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
	<TabsTrigger
		v-bind="forwardedProps"
		:class="
			cn(
				'inline-flex w-full items-center rounded-lg justify-center whitespace-nowrap py-1.5 text-sm font-normal ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-gray-600 data-[state=active]:shadow-[inset_0_0px_4px_0_rgba(0,0,0,0.01)] data-[state=active]:text-gray-50 border border-transparent data-[state=active]:border-gray-200 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-gray-50',
				props.class
			)
		"
	>
		<slot />
	</TabsTrigger>
</template>
