<script setup lang="ts">
import type { Tables } from "~/types/supabase";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

const { account, index } = defineProps<{
  account: Tables<"account">;
  index: number;
}>();

const user = useSupabaseUser();
const accountStore = useAccountsStore();

// Create Account
const newAccountFormSchema = toTypedSchema(
  z.object({
    name: z.string(),
    amount: z.number().nullable(),
    description: z.string().optional().nullable(),
  }),
);

const { handleSubmit, errors, defineField } = useForm({
  validationSchema: newAccountFormSchema,
  initialValues: {
    name: account.name,
    amount: account.amount,
    description: account.description,
  },
});

const [name, nameAttr] = defineField("name");
const [amount, amountAttr] = defineField("amount");
const [description, descriptionAttr] = defineField("description");

// Update Account
const updateAccount = handleSubmit((values) => {
  if (!user.value) return;
  const updatedAccount = {
    id: account.id,
    name: values.name,
    amount: values.amount,
    description: values.description as string | null,
    created_at: account.created_at,
    user_id: user.value.id,
  };
  accountStore.update(updatedAccount, index);
});
</script>

<template>
  <form class="flex items-center gap-2" @submit.prevent="updateAccount">
    <div class="sm:col-span-4">
      <label
        for="account"
        class="block text-sm font-medium leading-6 text-neutral-900"
        >Account Name</label
      >
      <input
        id="account"
        v-model="name"
        name="account"
        type="text"
        v-bind="nameAttr"
        :class="{ 'ring-danger': errors.name }"
        class="placeholder:text-gray-400 block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-primary-100 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
      />
      <span class="text-danger">{{ errors.name }}</span>
    </div>
    <div class="sm:col-span-4">
      <label
        for="amount"
        class="block text-sm font-medium leading-6 text-neutral-900"
        >Amount</label
      >
      <input
        id="amount"
        v-model="amount"
        name="amount"
        type="number"
        v-bind="amountAttr"
        :class="{ 'ring-danger': errors.amount }"
        class="placeholder:text-gray-400 block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-primary-100 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
      />
      <span class="text-danger">{{ errors.amount }}</span>
    </div>
    <div class="sm:col-span-4">
      <label
        for="description"
        class="block text-sm font-medium leading-6 text-neutral-900"
        >Description</label
      >
      <input
        id="description"
        v-model="description"
        name="description"
        type="text"
        v-bind="descriptionAttr"
        :class="{ 'ring-danger': errors.description }"
        class="placeholder:text-gray-400 block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-primary-100 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
      />
      <span class="text-danger">{{ errors.description }}</span>
    </div>
    <div class="mt-6 space-x-2">
      <button type="submit" class="transition-colors hover:text-success">
        Update Account
      </button>
      <button
        class="text-danger/80 transition-all hover:text-danger"
        @click="accountStore.destroy(account.id, index)"
      >
        Delete Account
      </button>
    </div>
  </form>
</template>
