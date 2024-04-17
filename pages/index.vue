<script setup lang="ts">
import Header from "~/components/ui/Header.vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateFormatter, parseDate } from "@internationalized/date";
import { toDate } from "radix-vue/date";
import { useForm } from "vee-validate";
import {
	FormControl,
	FormField,
	FormInput,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { cn } from "~/lib/utils";
import { CalendarIcon } from "lucide-vue-next";

definePageMeta({
	layout: "app",
	middleware: ["auth"],
});

const newTransactionSchema = toTypedSchema(
	z.object({
		transaction_date: z
			.string()
			.refine((v) => v, { message: "A date is required." }),
	})
);
const { handleSubmit, setValues, values } = useForm({
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

const addTransaction = handleSubmit((values) => {
	console.log(values);
});
</script>
<template>
	<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-8 lg:p-8">
		<Header />
		<div class="flex">
			<Card>
				<CardHeader>
					<CardTitle>New Transaction</CardTitle>
				</CardHeader>
				<CardContent>
					<Tabs default-value="expense" class="w-[400px]">
						<TabsList>
							<TabsTrigger value="expense"> Expense </TabsTrigger>
							<TabsTrigger value="income"> Income </TabsTrigger>
						</TabsList>
						<TabsContent value="expense">
							<form @submit="addTransaction" class="grid gap-4">
								<FormField v-slot="{ componentField }" name="Amount">
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
																'w-[240px] ps-3 text-start font-normal',
																!value && 'text-gray-400'
															)
														"
													>
														<span>{{
															value ? df.format(toDate(value)) : "Pick a date"
														}}</span>
														<CalendarIcon class="ms-auto h-4 w-4 opacity-80" />
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
								<Button>Add Expense</Button>
							</form>
						</TabsContent>
						<TabsContent value="income">
							Change your password here.
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	</main>
</template>
