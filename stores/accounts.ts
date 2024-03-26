import { defineStore } from "pinia";
import type { Tables } from "~/types/supabase";

export const useAccountsStore = defineStore("accounts", {
	state: () => ({
		data: [] as Tables<"account">[],
		error: null,
		fetching: false,
	}),
	actions: {
		reverseFetching() {
			!this.fetching;
		},
		addAccount(account: Tables<"account">) {
			if (!account) return;
			this.data.push(account);
		},
		setError(error: any) {
			this.error = error;
		},
	},
});
