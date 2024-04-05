import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", () => {
	const supabase = useSupabaseClient();
	const user = useSupabaseUser();
	const accountStore = useAccountsStore();
	const resetStore = useResetStore();

	// State
	const userProfile = ref({});

	const login = async (email: string, password: string) => {
		try {
			const { error } = await supabase.auth.signInWithPassword({
				email: email,
				password: password,
			});
			if (error) throw error;
			return navigateTo("/");
		} catch (error: any) {
			console.error("Login error:", error.message);
		}
	};

	const logout = async () => {
		try {
			const { error } = await supabase.auth.signOut();
			if (error) throw error;

			// Remove All state
			resetStore.all();
			return navigateTo("/login");
		} catch (error) {
			if (error instanceof Error) console.log(error.message);
		}
	};

	const loadUserData = async () => {
		try {
		} catch (error: any) {
			console.error("Failed to load user profile:", error.message);
		}
	};

	return {
		user,
		userProfile,
		login,
		logout,
		loadUserData,
	};
});
