import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import type { Database, Tables, TablesInsert } from "~/types/supabase";

export const useAccountsStore = defineStore("accountStore", () => {
	const supabase = useSupabaseClient<Database>();
	// State
	const accounts = ref<Tables<"account">[]>([]);
	const balance = ref<number>(0);
	const error = ref(null);
	const fetching = ref(false);

	const getAll = async () => {
		try {
			fetching.value = true;
			const { data, error } = await supabase
				.from("account")
				.select("*")
				.order("name", { ascending: true });

			if (!data) return;
			if (error) throw error;

			data.forEach((account) => accounts.value.push(account));

			balance.value = accounts.value.reduce(
				(accumulator, account) => accumulator + account.amount,
				0
			);

			fetching.value = false;
		} catch (err) {
			console.log("Something went wrong", error);
		}
	};

	const add = async (account: TablesInsert<"account">) => {
		try {
			const { data, error } = await supabase
				.from("account")
				.insert([account])
				.select()
				.single();
			if (error) throw error;
			if (!data) return;
			toast.success(`${data.name} has been created`, {
				description: `${data.description ? data.description : ""}`,
			});
			accounts.value.push(data);
		} catch (error) {
			console.log("Account Error:", error);
		}
	};

	const update = async (account: Tables<"account">) => {
		try {
			const { data, error } = await supabase
				.from("account")
				.update(account)
				.eq("id", account.id)
				.select()
				.single();

			if (error) throw error;
			if (!data) return;

			const indexOfAccount = accounts.value.findIndex(
				(a) => a.id === account.id
			);
			accounts.value[indexOfAccount] = data;
		} catch (error) {
			console.log("Update Account Error:", error);
		}
	};

	const destroy = async (id: string, index: number) => {
		try {
			const { error } = await supabase.from("account").delete().eq("id", id);
			if (error) throw error;
			accounts.value.splice(index, 1);
		} catch (error) {
			console.log(error);
		}
	};

	return {
		fetching,
		accounts,
		balance,
		error,
		getAll,
		add,
		update,
		destroy,
	};
});
