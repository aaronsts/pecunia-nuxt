<script setup lang="ts">
const supabase = useSupabaseClient()

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const successMsg = ref('')

const signUp = async () => {
  try {
    const { error } = await supabase.auth.signUp({ email: email.value, password: password.value })
    if (error) throw error
    successMsg.value = 'Check your email to confirm your account'
  } catch (error) {
    if (error instanceof Error) errorMsg.value = error.message
  }
}
</script>

<template>
  <form @submit.prevent="signUp">
    <FormField name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" placeholder="your email" v-model="email" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField name="password">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input type="password" v-model="password" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">Sign Up</Button>
  </form>

</template>