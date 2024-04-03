import { defineStore } from "pinia";
import type { ITransaction } from "~/types";
import type { Database, Tables } from "~/types/supabase";

export const useTransactionStore = defineStore("transactionStore", () => {
	const supabase = useSupabaseClient<Database>();
	// State
	const isInitialized = ref(false);
	const transactions = ref<Tables<"transaction">[]>([]);
	const error = ref(null);
	const isfetched = ref(false);

	const initialized = () => {
		isInitialized.value = !isInitialized.value;
	};

	const fetching = () => {
		isfetched.value = !isfetched.value;
	};

	const getTransactions = async () => {
		try {
			const { data, error } = await supabase
				.from("transaction")
				.select("*")
				.order("transaction_date", { ascending: true });
			if (!data) return;
			if (error) throw error;
			data.forEach((transaction) => transactions.value.push(transaction));
		} catch (err) {
			console.log("Something went wrong", err);
		} finally {
			fetching();
		}
	};

	const addTransaction = async (transaction: ITransaction) => {
		try {
			const { data, error } = await supabase
				.from("transaction")
				.insert([transaction])
				.select()
				.single();
			console.log("Transaction Added:", data);

			if (error) throw error;
			if (!data) return;
			transactions.value.push(data);
		} catch (err: any) {
			error.value = err;
			console.log("Error:", err);
		}
	};

	const deleteTransaction = async (id: number) => {
		try {
			const { error } = await supabase
				.from("transaction")
				.delete()
				.eq("id", id);
			if (error) throw error;
			transactions.value = transactions.value.filter(
				(transaction) => transaction.id !== id
			);
		} catch (error) {
			console.log("Error:", error);
		}
	};

	return {
		isInitialized,
		error,
		isfetched,
		transactions,
		initialized,
		getTransactions,
		addTransaction,
		deleteTransaction,
	};
});