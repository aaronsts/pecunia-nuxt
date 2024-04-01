import { defineStore } from "pinia";
import type { ICategory } from "~/types";
import type { Database, Tables } from "~/types/supabase";

export const useCategoryStore = defineStore("categoryStore", () => {
	const supabase = useSupabaseClient<Database>();
	// State
	const isInitialized = ref(false);
	const categories = ref<Tables<"categorie">[]>([]);
	const error = ref(null);
	const isfetched = ref(false);

	const initialized = () => {
		isInitialized.value = !isInitialized.value;
	};

	const fetching = () => {
		isfetched.value = !isfetched.value;
	};

	const getCategories = async () => {
		try {
			const { data, error } = await supabase
				.from("categorie")
				.select("*")
				.order("name", { ascending: true });
			console.log("categories", data);

			if (!data) return;
			data.forEach((category) => categories.value.push(category));
		} catch (err) {
			console.log("Something went wrong", error);
		} finally {
			fetching();
		}
	};

	const addCategory = async (category: Tables<"categorie"> | ICategory) => {
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

	return {
		isInitialized,
		error,
		isfetched,
		categories,
		initialized,
		getCategories,
		addCategory,
	};
});
