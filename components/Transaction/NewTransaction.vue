<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

import Input from "../ui/input/Input.vue";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-vue-next";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

const user = useSupabaseUser();
const { accounts } = useAccountsStore();
const { payees } = usePayeeStore();
const { categories } = useCategoryStore();
const transactionStore = useTransactionStore();

const TRANSACTION_TYPES = ["expense", "income"] as const;

const newTransactionSchema = toTypedSchema(
	z.object({
		amount: z.number(),
		transaction_date: z.date(),
		transaction_type: z.enum(TRANSACTION_TYPES, {
			required_error: "You need to select a notification type.",
		}),
		account_id: z.string(),
		description: z.string(),
		payee_id: z.string(),
		category_id: z.string(),
	})
);

const { handleSubmit, errors } = useForm({
	validationSchema: newTransactionSchema,
});

const createNewTransaction = handleSubmit((values) => {
	if (!user.value) return;

	const formattedDate = values.transaction_date.toISOString();
	const data = {
		...values,
		user_id: user.value.id,
		transaction_date: formattedDate,
		payee_id: parseInt(values.payee_id),
		category_id: parseInt(values.category_id),
	};

	transactionStore.add(data);
});
</script>
<template>
	<div>
		<form class="space-y-6 max-w-sm" @submit="createNewTransaction">
			<FormField v-slot="{ componentField, value }" name="transaction_date">
				<FormItem class="flex flex-col">
					<FormLabel>Transaction Date</FormLabel>
					<Popover>
						<PopoverTrigger as-child>
							<FormControl>
								<Button
									variant="outline"
									:class="
										cn(
											'ps-3 text-start font-normal',
											!value && 'text-muted-foreground'
										)
									"
								>
									<span>{{ value ? format(value, "P") : "Pick a date" }}</span>
									<CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
								</Button>
							</FormControl>
						</PopoverTrigger>
						<PopoverContent class="p-0">
							<Calendar v-bind="componentField" />
						</PopoverContent>
					</Popover>
					<FormMessage />
				</FormItem>
			</FormField>

			<FormField
				v-slot="{ componentField }"
				type="radio"
				name="transaction_type"
			>
				<FormItem class="space-y-3">
					<FormLabel class="sr-only">Transaction Type</FormLabel>
					<FormControl>
						<RadioGroup
							class="flex gap-6 w-full justify-center"
							v-bind="componentField"
						>
							<FormItem class="flex items-center space-y-0 gap-x-3">
								<FormControl>
									<RadioGroupItem value="expense" />
								</FormControl>
								<FormLabel class="font-normal cursor-pointer">
									Expense
								</FormLabel>
							</FormItem>
							<FormItem class="flex items-center space-y-0 gap-x-3">
								<FormControl>
									<RadioGroupItem value="income" />
								</FormControl>
								<FormLabel class="font-normal cursor-pointer">
									Income
								</FormLabel>
							</FormItem>
						</RadioGroup>
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>

			<FormField v-slot="{ componentField }" name="amount">
				<FormItem>
					<FormLabel>Amount</FormLabel>
					<FormControl>
						<Input type="number" v-bind="componentField" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>

			<FormField v-slot="{ componentField }" name="description">
				<FormItem>
					<FormLabel>Description</FormLabel>
					<FormControl>
						<Input type="text" v-bind="componentField" />
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>

			<FormField v-slot="{ componentField }" name="account_id">
				<FormItem>
					<FormLabel>Account</FormLabel>
					<Select v-bind="componentField">
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder="Select an account" />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							<SelectGroup>
								<SelectItem v-for="account in accounts" :value="account.id">
									{{ account.name }}
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			</FormField>

			<FormField v-slot="{ componentField }" name="payee_id">
				<FormItem>
					<FormLabel>Payee</FormLabel>
					<Select v-bind="componentField">
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder="Select a payee" />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							<SelectGroup>
								<SelectItem
									v-for="payee in payees"
									:value="payee.id.toString()"
								>
									{{ payee.name }}
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			</FormField>

			<FormField v-slot="{ componentField }" name="category_id">
				<FormItem>
					<FormLabel>Category</FormLabel>
					<Select v-bind="componentField">
						<FormControl>
							<SelectTrigger>
								<SelectValue placeholder="Select a category" />
							</SelectTrigger>
						</FormControl>
						<SelectContent>
							<SelectGroup>
								<SelectItem
									v-for="category in categories"
									:value="category.id.toString()"
								>
									{{ category.name }}
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			</FormField>

			<Button type="submit">Add Transaction</Button>
		</form>
	</div>
</template>
