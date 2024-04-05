import { defineStore } from "pinia";
import type { ICategory } from "~/types";
import type { Database, Tables } from "~/types/supabase";

export const useCategoryStore = defineStore("categoryStore", () => {
	const supabase = useSupabaseClient<Database>();
	// State
	const categories = ref<Tables<"categorie">[]>([]);
	const error = ref(null);
	const fetching = ref(false);

	const getAll = async () => {
		try {
			fetching.value = true;
			const { data, error } = await supabase
				.from("categorie")
				.select("*")
				.order("name", { ascending: true });

			if (!data) return;
			data.forEach((category) => categories.value.push(category));
			fetching.value = false;
		} catch (err) {
			console.log("Something went wrong", error);
		}
	};

	const add = async (category: Tables<"categorie"> | ICategory) => {
		try {
			const { data, error } = await supabase
				.from("categorie")
				.insert([category])
				.select()
				.single();

			if (error) throw error;
			if (!data) return;
			categories.value.push(data);
		} catch (err: any) {
			error.value = err;
			console.log("Error:", err);
		}
	};

	const destroy = async (id: number) => {
		try {
			const { error } = await supabase.from("categorie").delete().eq("id", id);
			if (error) throw error;
			categories.value = categories.value.filter(
				(category) => category.id !== id
			);
		} catch (error) {
			console.log("Error:", error);
		}
	};

	return {
		error,
		fetching,
		categories,
		getAll,
		add,
		destroy,
	};
});
