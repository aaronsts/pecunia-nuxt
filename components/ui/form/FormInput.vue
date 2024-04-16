<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { useFormField } from "./useFormField";
import { cn } from "@/lib/utils";

const props = defineProps<{
	defaultValue?: string | number;
	modelValue?: string | number;
	class?: HTMLAttributes["class"];
}>();

const { error, formItemId } = useFormField();
</script>

<template>
	<Input :class="cn(error && 'border-danger', props.class)" :for="formItemId" />
</template>
