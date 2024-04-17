<script setup lang="ts">
import Header from "~/components/ui/Header.vue";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

definePageMeta({
	layout: "app",
	middleware: ["auth"],
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
							<Dialog>
								<DialogTrigger as-child
									><Button class="w-full">Add Expense</Button></DialogTrigger
								>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>New Expense</DialogTitle>
										<DialogDescription>
											<NewTransaction type="expense" />
										</DialogDescription>
									</DialogHeader>
								</DialogContent>
							</Dialog>
						</TabsContent>
						<TabsContent value="income">
							<Dialog>
								<DialogTrigger as-child
									><Button class="w-full">Add Income</Button></DialogTrigger
								>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>New Income</DialogTitle>
										<DialogDescription>
											<NewTransaction type="income" />
										</DialogDescription>
									</DialogHeader>
								</DialogContent>
							</Dialog>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	</main>
</template>
