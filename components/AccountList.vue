<script lang="ts" setup>
defineProps(['fetching'])
const store = useAccountsStore()
const { accounts, isfetched } = storeToRefs(store)


</script>

<template>
  <div>
    {{ console.log(accounts) }}
    <ul v-if="!isfetched">
      <li v-for="(account, index) in accounts" :key="account.id" class="flex items-center gap-2">
        <Account :account="account" :index="index" />
      </li>
    </ul>
    <div v-else>Loading...</div>
  </div>
</template>