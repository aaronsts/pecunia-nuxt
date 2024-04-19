<script lang="ts" setup>
const { text } = defineProps<{ text?: string }>();
</script>
<template>
	<header class="p-4 pb-0">
		<Card class="w-full">
			<card-header class="flex-row items-center gap-16">
				<h3>{{ text }}</h3>
			</card-header>
		</Card>
	</header>
</template>
