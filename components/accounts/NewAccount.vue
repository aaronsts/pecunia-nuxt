<script lang="ts" setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { toast } from "vue-sonner";
import { moneyFormatter } from "~/lib/utils";
import { Plus, User } from "lucide-vue-next";

const accountStore = useAccountsStore();
const user = useSupabaseUser();

const newAccountSchema = toTypedSchema(
	z.object({
		name: z.string(),
		amount: z.number(),
		description: z.string().optional().nullable(),
	})
);

const { handleSubmit } = useForm({ validationSchema: newAccountSchema });

const createNewAccount = handleSubmit((values) => {
	if (!user.value) return;
	const data = {
		...values,
		user_id: user.value.id,
	};
	accountStore.add(data);
});
</script>
<template>
	<Sheet>
		<SheetTrigger as-child>
			<Button class="flex items-center gap-1">
				<Plus class="h-4 w-4" />
				New Account</Button
			>
		</SheetTrigger>
		<SheetContent>
			<SheetHeader>
				<SheetTitle>New Account</SheetTitle>
				<SheetDescription>
					Create a new account with a starting balance. Click save when you're
					done.
				</SheetDescription>
			</SheetHeader>
			<div class="grid gap-4 py-4">
				<form class="grid gap-3" @submit="createNewAccount">
					<FormField v-slot="{ componentField }" name="name">
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<FormInput
									type="name"
									placeholder="Ex. Main Checking Account"
									v-bind="componentField"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>
					<FormField v-slot="{ componentField }" name="amount">
						<FormItem>
							<FormLabel>Starting Amount</FormLabel>
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
					<FormField v-slot="{ componentField }" name="description">
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Ex. Used for all grocery purchases"
									class="resize-none"
									v-bind="componentField"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>
					<!-- <Button>Save</Button> -->
					<SheetFooter>
						<SheetClose as-child>
							<Button type="submit"> Save </Button>
						</SheetClose>
					</SheetFooter>
				</form>
			</div>
		</SheetContent>
	</Sheet>
</template>
