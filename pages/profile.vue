<script setup lang="ts">

definePageMeta({
  middleware: ['auth']
})

</script>
<template>
  <CategoryList />
  <CategoryNewCategory />
</template>