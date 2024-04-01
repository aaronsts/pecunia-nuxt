<script setup lang="ts">
import NewCategory from '~/components/Category/NewCategory.vue';
import NewPayee from '~/components/Payee/NewPayee.vue';
import NewTransaction from '~/components/Transaction/NewTransaction.vue';


definePageMeta({
  middleware: ['auth']
})

const { accounts } = useAccountsStore()
const payeeStore = usePayeeStore()
const { payees } = storeToRefs(payeeStore)
const transactionStore = useTransactionStore()
const { transactions } = storeToRefs(transactionStore)
const { categories } = useCategoryStore()


</script>
<template>

  <!-- <form class="max-w-sm mx-auto">
    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an
      Account</label>
    <select id="countries"
      class="bg-neutral-100 border border-primary-100 text-gray-900 text-sm rounded-lg focus:ring-primary-200 focus:border-primary-200 focus:ring-offset-2 focus:ring-2 block w-full p-2.5 dark:bg-gray-700 dark:border-primary-100 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-200 dark:focus:border-primary-200">
      <option selected>Choose Account</option>
      <option v-for="(account) in accounts" :key="account.id" :value="account.id">{{ account.name }}</option>
    </select>
    <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Category</label>
    <select id="countries"
      class="bg-neutral-100 border border-primary-100 text-gray-900 text-sm rounded-lg focus:ring-primary-200 focus:border-primary-200 focus:ring-offset-2 focus:ring-2 block w-full p-2.5 dark:bg-gray-700 dark:border-primary-100 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-200 dark:focus:border-primary-200">
      <option selected>Choose Category</option>
      <option v-for="(category) in categories" :key="category.id" :value="category.id">{{ category.name }}
      </option>
    </select>
  </form> -->
  <ul>
    <li v-for="(payee) in payees" :key="payee.id" class="flex items-center gap-2">
      {{ payee.name }} <button @click="payeeStore.deletePayee(payee.id)">Delete Payee</button>
    </li>
  </ul>
  <NewTransaction />
  <NewCategory />
  <NewPayee />
  <ul>
    <li v-for="(transaction) in transactions" :key="transaction.id" class="flex items-center gap-2">
      {{ transaction.description }} - {{ transaction.amount }} <button
        @click="transactionStore.deleteTransaction(transaction.id)">Delete
        Transaction</button>
    </li>
  </ul>
</template>