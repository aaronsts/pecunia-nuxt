<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
	class?: HTMLAttributes["class"];
}>();
</script>

<template>
	<tr
		:class="
			cn(
				'border-b transition-colors  text-gray-700 data-[state=selected]:bg-gray-100 dark:hover:bg-gray-800/50 dark:data-[state=selected]:bg-gray-800',
				props.class
			)
		"
	>
		<slot />
	</tr>
</template>
