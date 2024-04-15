<script lang="ts" setup>
import {
	ArrowRightLeft,
	Banknote,
	Home,
	Settings,
	LogOut,
} from "lucide-vue-next";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>
<template>
	<div>
		<button
			data-drawer-target="default-sidebar"
			data-drawer-toggle="default-sidebar"
			aria-controls="default-sidebar"
			type="button"
			class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
		>
			<span class="sr-only">Open sidebar</span>
			<svg
				class="w-6 h-6"
				aria-hidden="true"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					clip-rule="evenodd"
					fill-rule="evenodd"
					d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
				></path>
			</svg>
		</button>

		<aside
			id="default-sidebar"
			class="fixed top-0 left-0 z-40 w-[320px] h-screen transition-transform -translate-x-full sm:translate-x-0"
			aria-label="Sidebar"
		>
			<div class="h-full p-8 flex flex-col gap-8 bg-gray-50">
				<div class="flex gap-2 items-center">
					<div class="bg-gray-400 rounded-full w-12 h-12"></div>
					<p>{{ user?.email }}</p>
				</div>
				<div class="flex flex-col justify-between h-full">
					<ul class="space-y-2 font-medium">
						<li>
							<NuxtLink
								to="/"
								class="flex p-2 px-4 transition-colors group rounded-lg"
								:class="[
									$route.fullPath === '/'
										? 'bg-gray-700 text-gray-50'
										: 'text-gray-700 hover:bg-gray-200',
								]"
								><Home class="mr-2 w-6 h-6" />Dashboard</NuxtLink
							>
						</li>
						<li>
							<NuxtLink
								to="/transactions"
								class="flex p-2 px-4 transition-colors group rounded-lg"
								:class="[
									$route.fullPath === '/transactions'
										? 'bg-gray-700 text-gray-50  '
										: 'text-gray-700 hover:bg-gray-200',
								]"
								><ArrowRightLeft class="mr-2 w-6 h-6" />Transactions</NuxtLink
							>
						</li>
						<li>
							<NuxtLink
								to="/accounts"
								class="flex p-2 px-4 transition-colors group rounded-lg"
								:class="[
									$route.fullPath === '/accounts'
										? 'bg-gray-700 text-gray-50  '
										: 'text-gray-700 hover:bg-gray-200',
								]"
								><Banknote class="mr-2 w-6 h-6" />Accounts</NuxtLink
							>
						</li>
					</ul>
					<ul class="space-y-2 font-medium">
						<li>
							<NuxtLink
								to="/settings"
								class="flex p-2 px-4 transition-colors group rounded-lg"
								:class="[
									$route.fullPath === '/settings'
										? 'bg-gray-700 text-gray-50  '
										: 'text-gray-700 hover:bg-gray-200',
								]"
								><Settings class="mr-2 w-6 h-6" />Settings</NuxtLink
							>
						</li>
						<li>
							<button
								class="flex p-2 px-4 transition-colors text-gray-700 hover:bg-gray-200 w-full group rounded-lg"
								type="reset"
								@click="userStore.logout"
							>
								<LogOut class="mr-2 w-6 h-6" /> Logout
							</button>
						</li>
					</ul>
				</div>
			</div>
		</aside>
	</div>
</template>
