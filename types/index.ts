export type ITransaction = {
	amount: number;
	description: string | null;
	id: number;
	transaction_date: string;
	transaction_type: "expense" | "income";
	user_id: string;
	payee_id: number | null;
	account_id: string;
	category_id: number | null;
	payee: IPayee | null;
	category: ICategory | null;
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
