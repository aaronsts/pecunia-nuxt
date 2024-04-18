import { type ClassValue, clsx } from "clsx";
import { ArrowRightLeft, Banknote, Home } from "lucide-vue-next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const moneyFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

export const dateFormatter = (date: string) => {
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(new Date(date.replace(/-/g, "/").replace(/T.+/, "")));
};

export const pages = [
	{ name: "Dashboard", path: "/", symbol: Home },
	{ name: "Transactions", path: "/transactions", symbol: ArrowRightLeft },
	{ name: "Accounts", path: "/accounts", symbol: Banknote },
];
