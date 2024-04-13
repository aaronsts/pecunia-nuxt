<script lang="ts" setup>
import { format } from "date-fns";
import { CalendarIcon } from "lucide-vue-next";

const transactionStore = useTransactionStore();
const { transactions, fetching } = storeToRefs(transactionStore);
const accountStore = useAccountsStore();
const { accounts } = storeToRefs(accountStore);

const formatDate = (value: string) => {
	return format(new Date(value), "P");
};

const formatCurrency = (value: number) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(value);
};
</script>
<template>
	<div></div>
</template>
