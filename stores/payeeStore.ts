import { defineStore } from "pinia";
import type { IPayee } from "~/types";
import type { Database, Tables } from "~/types/supabase";

export const usePayeeStore = defineStore("payeeStore", () => {
	const supabase = useSupabaseClient<Database>();
	// State
	const payees = ref<Tables<"payee">[]>([]);
	const error = ref(null);
	const fetching = ref(false);

	const getAll = async () => {
		try {
			fetching.value = true;
			const { data, error } = await supabase
				.from("payee")
				.select("*")
				.order("name", { ascending: true });

			if (!data) return;
			if (error) throw error;

			data.forEach((payee) => payees.value.push(payee));
			fetching.value = false;
		} catch (err) {
			console.log("Something went wrong", error);
		}
	};

	const add = async (payee: IPayee) => {
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

	// TODO: Add Cascade destroy in supabase
	const destroy = async (id: number) => {
		try {
			const { error } = await supabase.from("payee").delete().eq("id", id);
			if (error) throw error;
			payees.value = payees.value.filter((payee) => payee.id !== id);
		} catch (error) {
			console.log("Error:", error);
		}
	};

	return {
		error,
		fetching,
		payees,
		getAll,
		add,
		destroy,
	};
});
