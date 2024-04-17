<script lang="ts" setup>
import { LogOut, Settings } from "lucide-vue-next";
import { pages } from "~/lib/utils";
import Header from "./Header.vue";

const userStore = useUserStore();

const signOut = () => {
	userStore.logout();
};
</script>
<template>
	<div>
		<div
			class="hidden fixed h-full md:w-56 lg:w-72 text-gray-700 bg-white border-r md:block"
		>
			<div class="flex h-full max-h-screen flex-col py-5 gap-4">
				<div class="flex px-4 items-center">
					<a href="/" class="flex items-center gap-2 font-semibold">
						<h1 class="">Pecunia</h1>
					</a>
				</div>
				<div class="flex-1">
					<nav class="grid items-start px-2 gap-2 text-sm font-normal lg:px-4">
						<NuxtLink
							v-for="page in pages"
							:to="page.path"
							class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
							:class="[
								$route.fullPath === page.path
									? 'bg-gray-100 text-gray-900'
									: 'text-gray-500 hover:bg-gray-100 hover:text-gray-700',
							]"
						>
							<component v-bind:is="page.symbol" class="h-4 w-4" />
							{{ page.name }}
						</NuxtLink>
					</nav>
				</div>
				<div class="mt-auto p-4">
					<NuxtLink
						to="/settings"
						class="flex items-center gap-3 text-sm rounded-lg px-3 py-2 transition-all"
						:class="[
							$route.fullPath === '/settings'
								? 'bg-gray-100 text-gray-900'
								: 'text-gray-500 hover:bg-gray-100 hover:text-gray-700',
						]"
					>
						<Settings class="h-4 w-4" />
						Settings
					</NuxtLink>
					<Button
						@click="signOut"
						class="flex bg-transparent font-normal border-0 hover:bg-gray-100 hover:text-gray-700 text-gray-500 w-full justify-start gap-3 rounded-lg px-3 py-2 transition-all"
					>
						<LogOut class="h-4 w-4" />
						Logout
					</Button>
				</div>
			</div>
		</div>
	</div>
</template>
