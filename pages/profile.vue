<script setup lang="ts">

definePageMeta({
  layout: 'app',
  middleware: ['auth']
})

</script>
<template>
  <div>
    <CategoryList />
    <NewCategory />
  </div>
  <div>
    <PayeeList />
    <NewPayee />
  </div>
</template>