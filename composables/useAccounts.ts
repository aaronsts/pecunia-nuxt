// import type { Database, Tables } from "~/types/supabase";
// import type { IAccount } from "~/types";

// export const useAccounts = () => {
// 	const supabase = useSupabaseClient<Database>();
// 	const store = useAccountsStore();
// 	const { error } = storeToRefs(store);

// 	return {
// 		async fetchAll() {
// 			try {
// 				store.reverseFetching();
// 				const { data } = await supabase
// 					.from("account")
// 					.select("*")
// 					.order("name", { ascending: true });
// 				if (!data) return;
// 				data.forEach((account) => store.addAccountState(account));
// 			} catch (err) {
// 				store.setError(err);
// 				console.log("Something went wrong", error);
// 			} finally {
// 				store.reverseFetching();
// 			}
// 		},

// 		async add(account: IAccount) {
// 			try {
// 				const { data, error } = await supabase
// 					.from("account")
// 					.insert([account])
// 					.select()
// 					.single();

// 				if (!data) return;
// 				if (error) throw error;

// 				store.addAccountState(data);
// 			} catch (error) {
// 				store.setError(error);
// 			}
// 		},

// 		async update(account: Tables<"account">, index: number) {
// 			try {
// 				const { data, error } = await supabase
// 					.from("account")
// 					.update(account)
// 					.eq("id", account.id)
// 					.select()
// 					.single();

// 				if (!data) return;
// 				store.updateAccountState(data, index);

// 				if (error) throw error;
// 			} catch (error) {
// 				console.log(error);
// 			}
// 		},

// 		async delete(id: string, index: number) {
// try {
// 	store.deleteAccountState(index);
// 	const { error } = await supabase.from("account").delete().eq("id", id);
// 	if (error) throw error;
// } catch (error) {
// 	console.log(error);
// }
// 		},
// 	};
// };
