<script lang="ts" setup>
import { FilePenLine, Trash2 } from "lucide-vue-next";

const transactionStore = useTransactionStore();
const { transactions, fetching } = storeToRefs(transactionStore);

const isEditing = ref(false);

const editTransaction = () => {
	console.log("test", isEditing.value);
	isEditing.value = !isEditing.value;
};
</script>
<template>
	<div>
		<ul v-if="!fetching">
			<li
				v-for="transaction in transactions"
				:key="transaction.id"
				class="flex flex-col items-center gap-2"
			>
				<p :class="[isEditing ? 'hidden' : 'block']">
					{{ transaction.payee ? transaction.payee.name : "No Payee added" }} |
					{{
						new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD",
						}).format(transaction.amount)
					}}
					| {{ transaction.account && transaction.account.name }} |
					{{ transaction.categorie && transaction.categorie.name }} |
					{{ transaction.description }}
					|
					{{
						new Date(
							transaction.transaction_date
								.replace(/-/g, "\/")
								.replace(/T.+/, "")
						).toLocaleDateString("en-US", {
							day: "2-digit",
							month: "2-digit",
							year: "numeric",
						})
					}}
				</p>
				<EditTransaction
					:transaction="transaction"
					:class="[!isEditing ? 'hidden' : 'block']"
				/>
				<button @click="editTransaction">
					<FilePenLine :size="16" />
					<span class="sr-only">Edit</span>
				</button>
				<button @click="transactionStore.destroy(transaction.id)">
					<Trash2 :size="16" />
					<span class="sr-only">Delete</span>
				</button>
			</li>
		</ul>
		<div v-else>Loading ...</div>
	</div>
</template>
