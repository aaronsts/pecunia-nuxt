import { defineStore } from "pinia";
import type { Database, InsertDto, Row } from "~/types/supabase";

export const useTransactionStore = defineStore("transactionStore", () => {
	const supabase = useSupabaseClient<Database>();
	// State
	const transactions = ref<Row<"transaction">[]>([]);
	const error = ref(null);
	const fetching = ref(false);

	const getAll = async () => {
		try {
			fetching.value = true;
			const { data, error } = await supabase
				.from("transaction")
				.select("*")
				.order("transaction_date", { ascending: true });
			if (!data) return;
			if (error) throw error;
			data.forEach((transaction) => transactions.value.push(transaction));
			fetching.value = false;
		} catch (err) {
			console.log("Something went wrong", err);
		}
	};

	const add = async (transaction: InsertDto<"transaction">) => {
		try {
			const { data, error } = await supabase
				.from("transaction")
				.insert([transaction])
				.select()
				.single();

			if (error) throw error;
			if (!data) return;

			transactions.value.push(data);
		} catch (err: any) {
			error.value = err;
			console.log("Error:", err);
		}
	};

	const destroy = async (id: number) => {
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
		error,
		fetching,
		transactions,
		getAll,
		add,
		destroy,
	};
});
