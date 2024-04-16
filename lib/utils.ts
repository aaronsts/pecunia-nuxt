import { type ClassValue, clsx } from "clsx";
import { ArrowRightLeft, Banknote, Home } from "lucide-vue-next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const pages = [
	{ name: "Dashboard", path: "/", symbol: Home },
	{ name: "Transactions", path: "/transactions", symbol: ArrowRightLeft },
	{ name: "Accounts", path: "/accounts", symbol: Banknote },
];
