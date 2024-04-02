<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const userStore = useUserStore()
const router = useRouter()

if (user.value) {
  navigateTo('/profile')
}

const email = ref('')
const password = ref('')
const errorMsg = ref('')

const signInSchema = toTypedSchema(z.object({
  email: z.string().email(),
  password: z.string().min(6)
}))

const signIn = async () => {
  try {
    await userStore.login(email.value, password.value)
    router.push('/')
  } catch (error) {
    if (error instanceof Error) errorMsg.value = error.message
  }
}
</script>

<template>
  <main class="min-h-screen">
    <div class="grid h-full place-items-center">
      <div class="max-w-sm p-6">
        <form @submit.prevent="signIn" class="space-y-3">
          <div class="sm:col-span-4">
            <label for="email" class="block text-sm font-medium leading-6 text-neutral-900">Email address</label>
            <input name="email" id="email" type="email" v-model="email"
              class="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-primary-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6 " />
          </div>

          <div class="sm:col-span-4">
            <label for="password" class="block text-sm font-medium leading-6 text-neutral-900">Password</label>
            <input id="password" name="password" type="password" v-model="password"
              class="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-primary-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6" />

          </div>
          <div class="text-danger">
            {{ errorMsg }}
          </div>
          <div class="mt-2">
            <button type="submit"
              class="rounded-md hover:bg-primary-200 transition-colors px-3 py-2 bg-primary block text-white">Sign
              In</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>