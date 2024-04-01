import { defineStore } from "pinia";
import type { ICategory } from "~/types";
import type { Database, Tables } from "~/types/supabase";

export const usePayeeStore = defineStore("payeeStore", () => {
	const supabase = useSupabaseClient<Database>();
	// State
	const isInitialized = ref(false);
	const payees = ref<Tables<"payee">[]>([]);
	const error = ref(null);
	const isfetched = ref(false);

	const initialized = () => {
		isInitialized.value = !isInitialized.value;
	};

	const fetching = () => {
		isfetched.value = !isfetched.value;
	};

	const getPayees = async () => {
		try {
			const { data, error } = await supabase
				.from("payee")
				.select("*")
				.order("name", { ascending: true });
			console.log("payees", data);

			if (!data) return;
			data.forEach((payee) => payees.value.push(payee));
		} catch (err) {
			console.log("Something went wrong", error);
		} finally {
			fetching();
		}
	};

	const addPayee = async (payee: Tables<"payee"> | IPayee) => {
		try {
			const { data, error } = await supabase
				.from("payee")
				.insert([payee])
				.select()
				.single();

			if (error) throw error;
			if (!data) return;
			payees.value.push(data);
		} catch (err: any) {
			error.value = err;
			console.log("Error:", err);
		}
	};

	return {
		isInitialized,
		error,
		isfetched,
		payees,
		initialized,
		getPayees,
		addPayee,
	};
});
