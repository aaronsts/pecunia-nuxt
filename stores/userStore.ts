import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", () => {
	const supabase = useSupabaseClient();
	const user = useSupabaseUser();
	const accountStore = useAccountsStore();
	const router = useRouter();

	// State
	const userProfile = ref({});

	const login = async (email: string, password: string) => {
		try {
			const { error } = await supabase.auth.signInWithPassword({
				email: email,
				password: password,
			});
			accountStore.getAccounts();
			if (error) throw error;
		} catch (error: any) {
			console.error("Login error:", error.message);
		}
	};

	const logout = async () => {
		try {
			const { error } = await supabase.auth.signOut();
			if (error) throw error;

			// Remove All state
			accountStore.$reset();
			router.push("/login");
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
