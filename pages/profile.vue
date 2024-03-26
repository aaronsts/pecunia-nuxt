<script setup lang="ts">
import type { Database, Tables } from '../types/supabase'
import { useAccountsStore } from '~/stores/accounts'
const user = useSupabaseUser()
const supabase = useSupabaseClient<Database>()
const router = useRouter()

const store = useAccountsStore()
const { data: accounts, fetching, error } = storeToRefs(store)

const email = ref<string | undefined>('')
const accountName = ref<string>('')
const amount = ref(null)
const description = ref(null)

definePageMeta({
  middleware: ['auth']
})



const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error;
    router.push('/login')
  } catch (error) {
    if (error instanceof Error) console.log(error.message)
  }
}



// const updateAccount = async () => {
//   console.log('test')
//   try {
//     const updatedAccount = {
//       name: 'test',
//       description: 'also a test',
//       amount: 123
//     }

//     const { data, error } = await supabase.from('account').update(updatedAccount).eq('id', '599e73a4-9d7f-4a8a-a8b8-6a16ba29b34b').select()

//     console.log('updated data', data)
//   } catch (error) {
//     console.log(error)
//   }
// }

const addAccount = async (e) => {
  console.log()
}

const fetchAccounts = async () => {
  try {
    store.reverseFetching()
    const { data } = await supabase.from("account").select("*");
    if (!data) return;

    data.forEach(account => store.addAccount(account))

  } catch (err) {
    store.setError(err)
    console.log("Something went wrong", error);
  } finally {
    store.reverseFetching()
  }
};


onMounted(() => {
  fetchAccounts()
})

</script>
<template>
  <p>Hello {{ email }}</p>
  <button @click="logout" type="button">Logout</button>
  <div>
    <form @submit.prevent="addAccount" class="max-w-sm">
      <div class="sm:col-span-4">
        <label for="account" class="block text-sm font-medium leading-6 text-neutral-900">Account Name</label>
        <input id="account" name="account" type="text" v-model="accountName"
          class="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-primary-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6" />
      </div>
      <div class="sm:col-span-4">
        <label for="amount" class="block text-sm font-medium leading-6 text-neutral-900">Amount</label>
        <input id="amount" name="amount" type="number" v-model="amount"
          class="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-primary-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6" />
      </div>
      <div class="sm:col-span-4">
        <label for="description" class="block text-sm font-medium leading-6 text-neutral-900">Description</label>
        <input id="description" name="description" type="text" v-model="description"
          class="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-primary-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6" />
      </div>
      <div class="mt-2">
        <button type="submit"
          class="rounded-md hover:bg-primary-200 transition-colors px-3 py-2 bg-primary block text-white">Add
          Account</button>
      </div>
    </form>
    <!-- <form @submit.prevent="updateAccount">
      <button type="submit"
        class="rounded-md hover:bg-primary-200 transition-colors px-3 py-2 bg-primary block text-white">Update
        Account</button>
    </form> -->
  </div>
  <ul v-if="!fetching">
    <li v-for="(account, index) in accounts" :key="index">
      {{ account.name }} - {{ account.amount }}
      <!-- <button @click="deleteAccount(account.id, index)">Delete Account</button> -->
    </li>
  </ul>
</template>