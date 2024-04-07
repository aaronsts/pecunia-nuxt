<script lang="ts" setup>
import { Trash2 } from "lucide-vue-next";

const transactionStore = useTransactionStore();
const { transactions, fetching } = storeToRefs(transactionStore);
</script>
<template>
	<div>
		<ul v-if="!fetching">
			<li
				v-for="transaction in transactions"
				:key="transaction.id"
				class="flex items-center gap-2"
			>
				<p>
					{{ transaction.account && transaction.account.name }} |
					{{
						new Date(transaction.transaction_date).toLocaleDateString("en-us", {
							day: "2-digit",
							month: "2-digit",
							year: "numeric",
						})
					}}
					| {{ transaction.payee && transaction.payee.name }} |
					{{ transaction.categorie && transaction.categorie.name }} |
					{{ transaction.description }}
					|
					{{
						new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD",
						}).format(transaction.amount)
					}}
				</p>
				<button @click="transactionStore.destroy(transaction.id)">
					<Trash2 :size="16" />
					<span class="sr-only">Delete</span>
				</button>
			</li>
		</ul>
		<div v-else>Loading ...</div>
	</div>
</template>
