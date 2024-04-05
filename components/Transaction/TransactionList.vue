<script lang="ts" setup>
const transactionStore = useTransactionStore();
const { transactions, fetching } = storeToRefs(transactionStore);
</script>
<template>
  <div>
    <ul v-if="!fetching">
      <li
        v-for="transaction in transactions"
        :key="transaction.id"
        class="flex items-center gap-2"
      >
        {{ transaction.description }} - {{ transaction.amount }}
        <button @click="transactionStore.deleteTransaction(transaction.id)">
          Delete Transaction
        </button>
      </li>
    </ul>
    <div v-else>Loading ...</div>
  </div>
</template>
