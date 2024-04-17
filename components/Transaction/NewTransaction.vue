<script lang="ts" setup>
import { DateFormatter, parseDate } from "@internationalized/date";
import { toDate } from "radix-vue/date";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { cn } from "~/lib/utils";
import { ArrowLeft, ArrowRight, CalendarIcon } from "lucide-vue-next";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const user = useSupabaseUser();
const { accounts } = useAccountsStore();
const { payees } = usePayeeStore();
const { categories } = useCategoryStore();
const transactionStore = useTransactionStore();

const { type } = defineProps<{
	type: "expense" | "income";
}>();

const newTransactionSchema = toTypedSchema(
	z.object({
		amount: z.number(),
		transaction_date: z
			.string()
			.refine((v) => v, { message: "Date is required." }),
		account_id: z.string(),
		description: z.string().optional(),
		payee_id: z.string().optional().nullable(),
		category_id: z.string().optional().nullable(),
	})
);

const { handleSubmit, setValues, values, errors } = useForm({
	validationSchema: newTransactionSchema,
});

const df = new DateFormatter("en-US", {
	dateStyle: "long",
});

const value = computed({
	get: () =>
		values.transaction_date ? parseDate(values.transaction_date) : undefined,
	set: (val) => val,
});

const createNewTransaction = handleSubmit((values) => {
	if (!user.value) return;

	const data = {
		...values,
		user_id: user.value.id,
		payee_id: values.payee_id ? parseInt(values.payee_id) : null,
		category_id: values.category_id ? parseInt(values.category_id) : null,
		transaction_type: type,
	};

	transactionStore.add(data);
});
</script>
<template>
	<div>
		<form class="grid gap-4" @submit="createNewTransaction">
			<FormField v-slot="{ componentField }" name="amount">
				<FormItem>
					<FormLabel>Amount</FormLabel>
					<FormControl>
						<FormInput
							type="number"
							placeholder="$0.00"
							v-bind="componentField"
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
			<FormField name="transaction_date">
				<FormItem class="flex flex-col">
					<FormLabel>Transaction Date</FormLabel>
					<Popover>
						<PopoverTrigger as-child>
							<FormControl>
								<Button
									variant="outline"
									:class="
										cn(
											' ps-3 text-start font-normal',
											!value && 'text-gray-400'
										)
									"
								>
									<span>{{
										value ? df.format(toDate(value)) : "Pick a date"
									}}</span>
									<CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
								</Button>
								<input hidden />
							</FormControl>
						</PopoverTrigger>
						<PopoverContent class="w-auto p-0">
							<Calendar
								v-model="value"
								calendar-label="Transaction Date"
								initial-focus
								@update:model-value="
									(v) => {
										if (v) {
											setValues({
												transaction_date: v.toString(),
											});
										} else {
											setValues({
												transaction_date: '',
											});
										}
									}
								"
							/>
						</PopoverContent>
					</Popover>
					<FormMessage />
				</FormItem>
			</FormField>

			<div class="w-full flex gap-4">
				<FormField v-slot="{ componentField }" name="account_id">
					<FormItem>
						<FormLabel>Accounts</FormLabel>
						<Select v-bind="componentField">
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Select an account" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectGroup>
									<SelectItem v-for="account in accounts" :value="account.id"
										>{{ account.name }}
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				</FormField>
				<div class="flex">
					<ArrowRight
						v-if="type === 'expense'"
						class="text-primary-400 w-8 h-8 self-end mb-1"
					/>
					<ArrowLeft v-else class="text-primary-400 w-8 h-8 self-end mb-1" />
				</div>
				<FormField v-slot="{ componentField }" name="payee_id">
					<FormItem>
						<FormLabel>Payees</FormLabel>
						<Select v-bind="componentField">
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Select a payee	" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectGroup>
									<SelectItem
										v-for="payee in payees"
										:value="payee.id.toString()"
										>{{ payee.name }}
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				</FormField>
			</div>
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
									>{{ category.name }}
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<FormMessage />
				</FormItem>
			</FormField>

			<FormField v-slot="{ componentField }" name="description">
				<FormItem>
					<FormLabel>Notes</FormLabel>
					<FormControl>
						<Textarea
							placeholder="Add extra notes..."
							class="resize-none"
							v-bind="componentField"
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			</FormField>
			<Button>Save</Button>
		</form>
	</div>
</template>
