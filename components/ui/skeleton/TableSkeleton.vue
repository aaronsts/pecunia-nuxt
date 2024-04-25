<script setup lang="ts">
import { Skeleton } from ".";
</script>
<template>
	<TableRow v-for="n in 3" :key="n">
		<TableCell v-for="i in 5" :key="i" class="pr-2"
			><Skeleton class="h-8 rounded-md"
		/></TableCell>
	</TableRow>
</template>
