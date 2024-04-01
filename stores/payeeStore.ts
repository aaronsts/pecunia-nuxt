import { defineStore } from "pinia";
import type { IPayee } from "~/types";
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

	const addPayee = async (payee: IPayee) => {
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

	const deletePayee = async (id: number) => {
		try {
			const { error } = await supabase.from("payee").delete().eq("id", id);
			if (error) throw error;
			payees.value = payees.value.filter((payee) => payee.id !== id);
			console.log("New Array:", payees.value);
		} catch (error) {
			console.log("Error:", error);
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
		deletePayee,
	};
});
