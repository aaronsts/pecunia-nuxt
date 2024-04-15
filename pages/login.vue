<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const user = useSupabaseUser();
const userStore = useUserStore();
const router = useRouter();

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
	console.log("sign in values", values);
	// try {
	// 	await userStore.login(.value, password.value);
	// 	router.push("/");
	// } catch (error) {
	// 	if (error instanceof Error) errorMsg.value = error.message;
	// }
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
							<button
								type="submit"
								class="w-full text-white active:scale-95 transition-all active:bg-primary-500 bg-primary-600 focus:ring-1 focus:ring-offset-2 focus:outline-none focus:ring-primary-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							>
								Sign in
							</button>
							<p class="text-sm font-light text-gray-500 dark:text-gray-400">
								Don’t have an account yet?
								<a
									href="#"
									class="font-medium text-primary-600 hover:underline dark:text-primary-500"
									>Sign up</a
								>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>
