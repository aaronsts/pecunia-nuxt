import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import type { ITransaction } from "~/types";
import type { Database, TablesInsert, TablesUpdate } from "~/types/supabase";

export const useTransactionStore = defineStore("transactionStore", () => {
	const supabase = useSupabaseClient<Database>();
	// State
	const transactions = ref<ITransaction[]>([]);
	const monthlyExpenses = ref<number>(0);
	const monthlyIncome = ref<number>(0);

	const accountStore = useAccountsStore();
	const { accounts } = storeToRefs(accountStore);

	const fetching = ref(false);

	const getAll = async () => {
		try {
			fetching.value = true;
			const { data, error } = await supabase
				.from("transaction")
				.select("*, account (name), category (name), payee (name)")
				.order("transaction_date", { ascending: true });

			if (!data) return;
			if (error) throw error;

			transactions.value = data;

			monthlyExpenses.value = transactions.value.reduce(
				(accumulator, transaction) => {
					return transaction.transaction_type === "expense"
						? accumulator - transaction.amount
						: accumulator;
				},
				0
			);

			monthlyIncome.value = transactions.value.reduce(
				(accumulator, transaction) => {
					return transaction.transaction_type === "income"
						? accumulator + transaction.amount
						: accumulator;
				},
				0
			);

			fetching.value = false;
		} catch (err) {
			console.log("Something went wrong", err);
		}
	};

	const add = async (transaction: TablesInsert<"transaction">) => {
		try {
			const { data: transactionData, error: transactionError } = await supabase
				.from("transaction")
				.insert([transaction])
				.select("*, account (id, name), category (name), payee (name)")
				.single();

			if (transactionError) throw transactionError;

			if (!transactionData) return;

			const account = accounts.value.find(
				(acc) => acc.id === transactionData.account?.id
			);

			if (!account) return;
			transactionData.transaction_type === "expense"
				? (account.amount -= transactionData.amount)
				: (account.amount += transactionData.amount);

			accountStore.update(account);

			toast.success("Transaction Created");

			transactions.value.push(transactionData);
		} catch (err: any) {
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
				.select("*, account (name), category (name), payee (name)")
				.single();

			if (error) throw error;
			if (!data) return;

			toast.success("Transaction Updated");

			const indexOfTransaction = transactions.value.findIndex(
				(t) => t.id === transaction.id
			);
			transactions.value[indexOfTransaction] = data;
		} catch (error) {
			toast.error("Something went wrong");
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
			toast.success("Transaction deleted");
		} catch (error) {
			console.log("Error:", error);
		}
	};

	return {
		fetching,
		monthlyExpenses,
		monthlyIncome,
		transactions,
		getAll,
		add,
		update,
		destroy,
	};
});
