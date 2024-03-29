<script lang="ts" setup>
defineProps(['fetching'])
const store = useAccountsStore()
const { data: accounts, fetching } = storeToRefs(store)

</script>

<template>
  <div>
    <ul v-if="!fetching">
      <li v-for="(account, index) in accounts" :key="account.id" class="flex items-center gap-2">
        <Account :account="account" :index="index" />
      </li>
    </ul>
    <div v-else>Loading...</div>
  </div>
</template>