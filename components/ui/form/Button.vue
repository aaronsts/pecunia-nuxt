<script lang="ts" setup>
const { text } = defineProps<{ text: string }>();
</script>
<template>
	<button
		type="submit"
		class="w-full text-white active:scale-95 transition-all active:bg-primary-500 bg-primary-600 focus:ring-1 focus:ring-offset-2 focus:outline-none focus:ring-primary-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
	>
		{{ text }}
	</button>
</template>
