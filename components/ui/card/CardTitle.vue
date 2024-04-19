<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
	class?: HTMLAttributes["class"];
}>();
</script>

<template>
	<h3 :class="cn('text-lg font-normal text-gray-700 ', props.class)">
		<slot />
	</h3>
</template>
