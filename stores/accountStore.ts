import { defineStore } from "pinia";
import type { IAccount } from "~/types";
import type { Tables } from "~/types/supabase";

export const useAccountsStore = defineStore("accountStore", () => {
	const supabase = useSupabaseClient();
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
			data.forEach((account) => addAccount(account));
		} catch (err) {
			setError(err);
			console.log("Something went wrong", error);
		} finally {
			fetching();
		}
	};

	// TODO: Add supabase call to add, update and delete functions
	const addAccount = (account: IAccount) => {
		if (!account) return;
		accounts.value.push(account);
	};

	const updateAccount = (account: Tables<"account">, index: number) => {
		accounts.value[index] = account;
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
	const setError = (error: any) => {
		error.value = error.value;
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
		setError,
	};
});
