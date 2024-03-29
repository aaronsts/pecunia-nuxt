import { defineStore } from "pinia";
import type { Tables } from "~/types/supabase";

export const useAccountsStore = defineStore("accounts", {
	state: () => ({
		isInitialized: false,
		data: [] as Tables<"account">[],
		error: null,
		fetching: false,
	}),
	actions: {
		initialized() {
			this.isInitialized = !this.isInitialized;
		},
		reverseFetching() {
			this.fetching = !this.fetching;
		},
		addAccountState(account: Tables<"account">) {
			if (!account) return;
			this.data.push(account);
		},

		updateAccountState(account: Tables<"account">, index: number) {
			this.data[index] = account;
		},

		deleteAccountState(index: number) {
			this.data.splice(index, 1);
		},

		setError(error: any) {
			this.error = error;
		},
	},
});
