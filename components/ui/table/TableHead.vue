<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
	class?: HTMLAttributes["class"];
}>();
</script>

<template>
	<th
		:class="
			cn(
				'h-12 text-left align-middle font-normal text-gray-500 [&:has([role=checkbox])]:pr-0 dark:text-gray-400',
				props.class
			)
		"
	>
		<slot />
	</th>
</template>
