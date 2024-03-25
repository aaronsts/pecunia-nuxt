<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()

const email = ref<string | undefined>('')
const accountName = ref<string | undefined>('')
const amount = ref<number | undefined>()
const description = ref<number | undefined>()

definePageMeta({
  middleware: ['auth']
})

if (user.value) {
  email.value = user.value?.email
}


const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error;
    router.push('/login')
  } catch (error) {
    if (error instanceof Error) console.log(error.message)
  }
}
const session = await supabase.auth.getSession()
console.log(session)

const addAccount = async () => {
  try {
    const newAccount = {
      name: accountName.value,
      user_id: user.value?.id,
      description: description.value,
      amount: amount.value
    }
    if (!accountName) return
    const { data, error } = await supabase.from('account').insert([newAccount]).select()
    console.log('Data', data)

  } catch (error) {
    console.log('Error:', error)
  }
}

const updateAccount = async () => {
  console.log('test')
  try {
    const updatedAccount = {
      name: 'test',
      description: 'also a test',
      amount: 123
    }

    const { data, error } = await supabase.from('account').update(updatedAccount).eq('id', '599e73a4-9d7f-4a8a-a8b8-6a16ba29b34b').select()

    console.log('updated data', data)
  } catch (error) {
    console.log(error)
  }
}

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
    <form @submit.prevent="updateAccount">
      <button type="submit"
        class="rounded-md hover:bg-primary-200 transition-colors px-3 py-2 bg-primary block text-white">Update
        Account</button>
    </form>

  </div>
</template>