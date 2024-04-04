export function useLoadUserData() {
  const accountStore = useAccountsStore();
  const categoryStore = useCategoryStore();
  const payeeStore = usePayeeStore();
  const transactionStore = useTransactionStore();

  accountStore.getAll();
  categoryStore.getAll();
  transactionStore.getAll();
  payeeStore.getPayees();
}
