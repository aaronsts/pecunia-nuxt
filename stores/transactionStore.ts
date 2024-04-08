import { defineStore } from "pinia";
import type { ITransaction } from "~/types";
import type {
	Database,
	InsertDto,
	QueryData,
	Tables,
	TablesUpdate,
} from "~/types/supabase";

export const useTransactionStore = defineStore("transactionStore", () => {
	const supabase = useSupabaseClient<Database>();
	// State
	const transactions = ref<ITransaction[]>([]);
	const error = ref(null);
	const fetching = ref(false);

	const getAll = async () => {
		try {
			fetching.value = true;
			const { data, error } = await supabase
				.from("transaction")
				.select("*, account (name), categorie (name), payee (name)")
				.order("transaction_date", { ascending: true });

			if (!data) return;
			if (error) throw error;

			transactions.value = data;
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
				.select("*, account (name), categorie (name), payee (name)")
				.single();

			if (error) throw error;
			if (!data) return;

			transactions.value.push(data);
		} catch (err: any) {
			error.value = err;
			console.log("Error:", err);
		}
	};

	const update = async (transaction: TablesUpdate<"transaction">) => {
		try {
			if (!transaction.id) return;

			const { data, error } = await supabase
				.from("transaction")
				.update(transaction)
				.eq("id", transaction.id)
				.select("*, account (name), categorie (name), payee (name)")
				.single();

			if (error) throw error;
			if (!data) return;

			const indexOfTransaction = transactions.value.findIndex(
				(t) => t.id === transaction.id
			);
			transactions.value[indexOfTransaction] = data;
		} catch (error) {
			console.error("Update Transaction Error:", error);
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
