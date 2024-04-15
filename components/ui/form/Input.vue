<script lang="ts" setup>
import { useField } from "vee-validate";

const props = defineProps<{
	type: string;
	name: string;
	required?: string;
	placeholder?: string;
	label: string;
}>();

const { value, errors } = useField(() => props.name, undefined, {
	syncVModel: true,
});

const id = useId();
</script>
<template>
	<div class="relative">
		<input
			v-model="value"
			:type="props.type"
			:id="id"
			class="block px-3 pb-2 pt-6 w-full text-base text-gray-700 bg-transparent rounded-lg border-gray-400 appearance-none dark:text-white dark:border-gray-600 placeholder:text-gray-400 placeholder:font-light dark:focus:border-blue-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray-700 focus:ring-0 focus:border-gray-900 peer"
			:class="[errors.length === 0 ? '' : 'border-danger focus:border-danger']"
			:placeholder="props.placeholder"
		/>
		<label
			:for="props.name"
			class="absolute text-xs font-light dark:text-gray-400 top-2.5 z-10 dark:bg-gray-900 px-2 peer-focus:dark:text-blue-500 start-1"
			:class="[
				errors.length === 0
					? 'text-gray-400'
					: 'peer-focus:text-danger text-danger',
			]"
			>{{ props.label }}</label
		>
		<ul v-if="errors.length">
			<li
				class="text-danger text-sm font-light tracking-wide pt-1"
				v-for="error in errors"
			>
				{{ error }}
			</li>
		</ul>
	</div>
</template>
