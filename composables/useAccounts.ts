import type { Database, Tables } from "~/types/supabase";
import type { IAccount } from "~/types";

export const useAccounts = () => {
	const supabase = useSupabaseClient<Database>();
	const store = useAccountsStore();
	const { error } = storeToRefs(store);

	return {
		async fetchAll() {
			try {
				store.reverseFetching();
				const { data } = await supabase.from("account").select("*");
				if (!data) return;
				data.forEach((account) => store.addAccount(account));
			} catch (err) {
				store.setError(err);
				console.log("Something went wrong", error);
			} finally {
				store.reverseFetching();
			}
		},

		async add(account: IAccount) {
			try {
				const { data, error } = await supabase
					.from("account")
					.insert([account])
					.select()
					.single();

				if (!data) return;
				if (error) throw error;

				store.addAccount(data);
			} catch (error) {
				store.setError(error);
			}
		},
		async delete(id: string, index: number) {
			try {
				store.data.splice(index, 1);
				const { error } = await supabase.from("account").delete().eq("id", id);
			} catch (error) {
				console.log(error);
			}
		},
	};
};
