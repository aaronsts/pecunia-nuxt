<script setup lang="ts">
import { useAccountsStore } from '~/stores/accounts'

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

definePageMeta({
  middleware: ['auth']
})

const user = useSupabaseUser()
const account = useAccounts()

const store = useAccountsStore()
const { data: accounts, fetching } = storeToRefs(store)

const newAccountFormSchema = toTypedSchema(z.object({
  name: z.string(),
  amount: z.number(),
  description: z.string().optional(),
}))
const { handleSubmit, errors, defineField } = useForm({ validationSchema: newAccountFormSchema })

const onSubmit = handleSubmit((values) => {
  if (!user.value) return
  const newAccount = {
    name: values.name,
    amount: values.amount,
    description: values.description,
    user_id: user.value.id,
  }

  account.add(newAccount)

})

const [name, nameAttr] = defineField('name')
const [amount, amountAttr] = defineField('amount')
const [description, descriptionAttr] = defineField('description')

onMounted(() => {
  account.fetchAll()
})

</script>
<template>

  <div>
    <form @submit.prevent="onSubmit" class="max-w-sm">
      <div class="sm:col-span-4">
        <label for="account" class="block text-sm font-medium leading-6 text-neutral-900">Account Name</label>
        <input id="account" name="account" type="text" v-model="name" v-bind="nameAttr"
          :class="{ 'ring-danger': errors.name }"
          class="block w-full rounded-md  border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-primary-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6" />
        <span class="text-danger">{{ errors.name }}</span>
      </div>
      <div class="sm:col-span-4">
        <label for="amount" class="block text-sm font-medium leading-6 text-neutral-900">Amount</label>
        <input id="amount" name="amount" type="number" v-model="amount" v-bind="amountAttr"
          :class="{ 'ring-danger': errors.amount }"
          class="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-primary-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6" />
        <span class="text-danger">{{ errors.amount }}</span>
      </div>
      <div class="sm:col-span-4">
        <label for="description" class="block text-sm font-medium leading-6 text-neutral-900">Description</label>
        <input id="description" name="description" type="text" v-model="description" v-bind="descriptionAttr"
          :class="{ 'ring-danger': errors.description }"
          class="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-primary-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6" />
        <span class="text-danger">{{ errors.description }}</span>
      </div>
      <div class="mt-2">
        <button type="submit"
          class="rounded-md hover:bg-primary-200 transition-colors px-3 py-2 bg-primary block text-white">Add
          Account</button>
      </div>
    </form>
  </div>
  <ul v-if="!fetching">
    <li v-for="(a, index) in accounts" :key="index">
      {{ a.name }} - {{ a.amount }}
      <button @click="account.delete(a.id, index)">Delete Account</button>
    </li>
  </ul>
</template>