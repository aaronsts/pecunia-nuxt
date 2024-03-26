<template>
  <nav class="max-w-6xl mx-auto px-4 md:px-8 py-6 flex justify-between items-center">
    <h2>Pecunia</h2>
    <button @click="logout" v-if="user" type="button"
      class="h-fit text-sm bg-danger text-white py-2 px-3 rounded-md">Logout</button>
  </nav>
  <main class="max-w-6xl mx-auto px-4 md:px-8">
    <slot />
  </main>
</template>

<script setup lang="ts">
import type { Database } from '../types/supabase'
import { useAccountsStore } from '~/stores/accounts'
const router = useRouter()

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const store = useAccountsStore()

const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error;

    // Remove All state
    store.$reset()
    router.push('/login')
  } catch (error) {
    if (error instanceof Error) console.log(error.message)
  }
}
</script>