<script lang="ts" setup>
import { LogOut, Settings } from "lucide-vue-next";
import { pages } from "~/lib/utils";

const userStore = useUserStore();

const signOut = () => {
	userStore.logout();
};
</script>
<template>
	<div class="hidden text-gray-700 bg-gray-50 md:block">
		<div class="flex h-full max-h-screen flex-col py-5 gap-4">
			<div class="flex px-4 items-center">
				<a href="/" class="flex items-center gap-2 font-semibold">
					<h1 class="">Pecunia</h1>
				</a>
			</div>
			<div class="flex-1">
				<nav class="grid items-start px-2 gap-2 text-sm font-medium lg:px-4">
					<NuxtLink
						v-for="page in pages"
						:to="page.path"
						class="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all"
						:class="[
							$route.fullPath === page.path
								? 'bg-primary-700 text-gray-50'
								: 'text-gray-700 hover:bg-primary-100 hover:text-primary-700',
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
					class="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all"
					:class="[
						$route.fullPath === '/settings'
							? 'bg-primary-700 text-gray-50'
							: 'text-gray-700 hover:bg-primary-100 hover:text-primary-700',
					]"
				>
					<Settings class="h-4 w-4" />
					Settings
				</NuxtLink>
				<Button
					@click="signOut"
					class="flex bg-transparent font-normal text-base hover:bg-danger/20 hover:text-danger text-gray-700 w-full justify-start gap-3 rounded-lg px-3 py-2.5 transition-all"
				>
					<LogOut class="h-4 w-4" />
					Logout
				</Button>
			</div>
		</div>
	</div>
</template>
