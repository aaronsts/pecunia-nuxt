<script setup lang="ts">
import Header from "~/components/ui/Header.vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "vee-validate";
import {
	FormControl,
	FormField,
	FormInput,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";

definePageMeta({
	layout: "app",
	middleware: ["auth"],
});

const { handleSubmit } = useForm();

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
