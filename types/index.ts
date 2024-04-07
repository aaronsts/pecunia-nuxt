export type ITransaction = {
	amount: number;
	description: string | null;
	id: number;
	transaction_date: string;
	user_id: string;
	payee: IPayee | null;
	categorie: ICategory | null;
	account: IAccount | null;
};

type IPayee = {
	name: string;
};
type ICategory = {
	name: string;
};
type IAccount = {
	name: string;
};
