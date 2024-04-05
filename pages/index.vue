<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: ['auth']
})
</script>
<template>
  <NewTransaction />
  <TransactionList />
</template>