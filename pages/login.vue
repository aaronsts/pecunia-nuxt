<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

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
	<script setup lang="ts">
		import { Button } from "@/components/ui/button";
		import {
			Card,
			CardContent,
			CardDescription,
			CardFooter,
			CardHeader,
			CardTitle,
		} from "@/components/ui/card";
		import { Input } from "@/components/ui/input";
		import { Label } from "@/components/ui/label";
	</script>

	<template>
		<Card class="w-full max-w-sm">
			<CardHeader>
				<CardTitle class="text-2xl"> Login </CardTitle>
				<CardDescription>
					Enter your email below to login to your account.
				</CardDescription>
			</CardHeader>
			<CardContent class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input id="email" type="email" placeholder="m@example.com" required />
				</div>
				<div class="grid gap-2">
					<Label for="password">Password</Label>
					<Input id="password" type="password" required />
				</div>
			</CardContent>
			<CardFooter>
				<Button class="w-full"> Sign in </Button>
			</CardFooter>
		</Card>
	</template>
</template>
