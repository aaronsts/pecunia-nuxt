export type IAccount = {
	amount: number;
	description?: string;
	name: string;
	user_id: string;
};

export type ICategory = {
	user_id: string;
	name: string;
};

export type IPayee = {
	user_id: string;
	name: string;
};
