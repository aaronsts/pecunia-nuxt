export function useLoadUserData() {
	const accountStore = useAccountsStore();
	const categoryStore = useCategoryStore();
	const payeeStore = usePayeeStore();
	const transactionStore = useTransactionStore();

	accountStore.getAccounts();
	categoryStore.getCategories();
	transactionStore.getAll();
	payeeStore.getAll();
}
