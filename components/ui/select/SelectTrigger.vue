<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import {
	SelectIcon,
	SelectTrigger,
	type SelectTriggerProps,
	useForwardProps,
} from "radix-vue";
import { ChevronDown } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = defineProps<
	SelectTriggerProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = computed(() => {
	const { class: _, ...delegated } = props;

	return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
	<SelectTrigger
		v-bind="forwardedProps"
		:class="
			cn(
				'flex h-10 w-full items-center justify-between text-gray-700 font-normal rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm ring-offset-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus:ring-gray-300',
				props.class
			)
		"
	>
		<slot />
		<SelectIcon as-child>
			<ChevronDown class="w-4 h-4 opacity-50" />
		</SelectIcon>
	</SelectTrigger>
</template>
