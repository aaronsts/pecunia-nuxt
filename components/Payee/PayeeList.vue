<script setup lang="ts">
import type { categories } from '@vueuse/core/metadata.mjs';
import { Trash2 } from 'lucide-vue-next';

const payeeStore = usePayeeStore()
const { payees } = storeToRefs(payeeStore)

</script>

<template>
  <h3>Manage Payees</h3>
  <ol v-if="payees.length !== 0" id="payees" class="flex flex-col gap-3">
    <li v-for="(payee) in payees" class="flex items-end gap-2" :key="payee.id">
      <p class="leading-none">{{ payee.name }}</p><button @click="payeeStore.deletePayee(payee.id)">
        <Trash2 :size="16" />
      </button>
    </li>
  </ol>
  <div v-else>
    <p>No Payees added</p>
  </div>
</template>