<script setup lang="ts">
const supabase = useSupabaseClient()
const router = useRouter()

const email = ref('')
const password = ref('')
const errorMsg = ref('')

const signIn = async () => {
  try {
    const { error } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value })
    if (error) throw error
    router.push('/profile')
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

            <input id="email" name="email" type="email" v-model="email" autocomplete="email"
              class="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-primary-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6" />

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