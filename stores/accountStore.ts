import { defineStore } from "pinia";
import type { Database, InsertDto, Tables } from "~/types/supabase";

export const useAccountsStore = defineStore("accountStore", () => {
	const supabase = useSupabaseClient<Database>();
	// State
	const accounts = ref<Tables<"account">[]>([]);
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
			fetching.value = false;
		} catch (err) {
			console.log("Something went wrong", error);
		}
	};

	const add = async (account: InsertDto<"account">) => {
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

	const update = async (account: Tables<"account">, index: number) => {
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
		error,
		getAll,
		add,
		update,
		destroy,
	};
});
