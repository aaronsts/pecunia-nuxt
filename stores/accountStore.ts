import { defineStore } from "pinia";
import type { IAccount } from "~/types";
import type { Database, Tables } from "~/types/supabase";

export const useAccountsStore = defineStore("accountStore", () => {
	const supabase = useSupabaseClient<Database>();
	// State
	const isInitialized = ref(false);
	const accounts = ref<Tables<"account">[]>([]);
	const error = ref(null);
	const isfetched = ref(false);

	const initialized = () => {
		isInitialized.value = !isInitialized.value;
	};

	const fetching = () => {
		isfetched.value = !isfetched.value;
	};

	const getAccounts = async () => {
		try {
			fetching();
			const { data } = await supabase
				.from("account")
				.select("*")
				.order("name", { ascending: true });
			if (!data) return;
			data.forEach((account) => accounts.value.push(account));
		} catch (err) {
			console.log("Something went wrong", error);
		} finally {
			fetching();
		}
	};

	const addAccount = async (account: IAccount) => {
		try {
			const { data, error } = await supabase
				.from("account")
				.insert([account])
				.select()
				.single();
			if (error) throw error;
			if (!data) return;
			accounts.value.push(data);
		} catch (error) {
			console.log("Account Error:", error);
		}
	};

	const updateAccount = async (account: Tables<"account">, index: number) => {
		try {
			const { data, error } = await supabase
				.from("account")
				.update(account)
				.eq("id", account.id)
				.select()
				.single();

			if (!data) return;
			if (error) throw error;

			accounts.value[index] = account;
		} catch (error) {
			console.log("Update Account Error:", error);
		}
	};

	const deleteAccount = async (id: string, index: number) => {
		try {
			const { error } = await supabase.from("account").delete().eq("id", id);
			if (error) throw error;
			accounts.value.splice(index, 1);
		} catch (error) {
			console.log(error);
		}
	};

	return {
		isInitialized,
		accounts,
		error,
		isfetched,
		initialized,
		fetching,
		getAccounts,
		addAccount,
		updateAccount,
		deleteAccount,
	};
});
