<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import FormInput from "~/components/ui/form/FormInput.vue";

const user = useSupabaseUser();
const userStore = useUserStore();

if (user.value) {
	navigateTo("/profile");
}

const signInSchema = toTypedSchema(
	z.object({
		email: z.string().email(),
		password: z.string().min(6),
	})
);

const { handleSubmit } = useForm({ validationSchema: signInSchema });

const signIn = handleSubmit(async (values) => {
	try {
		await userStore.login(values.email, values.password);
		return navigateTo("/");
	} catch (error) {
		console.error("Error in login:", error);
	}
});
</script>

<template>
	<div class="grid place-items-center h-full">
		<Card class="w-full max-w-sm">
			<CardHeader>
				<CardTitle class="text-2xl"> Login </CardTitle>
				<CardDescription>
					Enter your email below to login to your account.
				</CardDescription>
			</CardHeader>
			<CardContent class="grid gap-4">
				<form @submit="signIn" class="grid gap-4">
					<FormField v-slot="{ componentField }" name="email">
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<FormInput
									type="email"
									placeholder="email@example.com"
									v-bind="componentField"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>
					<FormField v-slot="{ componentField }" name="password">
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<FormInput type="password" v-bind="componentField" />
							</FormControl>
							<FormMessage />
						</FormItem>
					</FormField>
					<Button class="w-full"> Sign in </Button>
				</form>
			</CardContent>
		</Card>
	</div>
</template>
