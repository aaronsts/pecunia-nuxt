<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import Button from "~/components/ui/Button.vue";

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
	<main class="min-h-screen">
		<section class="bg-gray-50 dark:bg-gray-900">
			<div
				class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
			>
				<div
					class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
				>
					<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1
							class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
						>
							Sign in to your account
						</h1>
						<form @submit="signIn" class="space-y-4 md:space-y-6">
							<div>
								<Input
									type="email"
									name="email"
									placeholder="aaron@pecunia.com"
									label="Email"
									required="true"
								/>
							</div>
							<div>
								<Input
									type="password"
									name="password"
									label="Password"
									required="true"
								/>
							</div>
							<Button>Sign in</Button>
							<p class="text-sm font-light text-gray-500 dark:text-gray-400">
								Don’t have an account yet?
								<NuxtLink
									class="font-medium text-primary-600 hover:underline dark:text-primary-500"
									to="/register"
									>Sign up</NuxtLink
								>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>
