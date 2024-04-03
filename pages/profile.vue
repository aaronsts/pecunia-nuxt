<script setup lang="ts">

definePageMeta({
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