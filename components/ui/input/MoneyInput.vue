<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useVModel } from "@vueuse/core";
import { cn } from "@/lib/utils";
import { useCurrencyInput } from "vue-currency-input";

const props = defineProps<{
	defaultValue?: string | number;
	modelValue?: string | number;
	class?: HTMLAttributes["class"];
}>();

const { inputRef } = useCurrencyInput({
	locale: "en-US",
	currency: "USD",
	precision: 2,
	hideCurrencySymbolOnFocus: true,
	hideGroupingSeparatorOnFocus: true,
	hideNegligibleDecimalDigitsOnFocus: true,
	autoDecimalDigits: false,
	useGrouping: true,
});

const emits = defineEmits<{
	(e: "update:modelValue", payload: string | number): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
	passive: true,
	defaultValue: props.defaultValue,
});
</script>

<template>
	<input
		type="text"
		ref="inputRef"
		v-model="modelValue"
		:class="
			cn(
				'flex h-10 w-full  rounded-md border border-gray-300  bg-gray-50 text-gray-700 px-3 py-1.5 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400  focus-visible:outline-none focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300',
				props.class
			)
		"
	/>
</template>
