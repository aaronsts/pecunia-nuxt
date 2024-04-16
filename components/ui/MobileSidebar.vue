<script lang="ts" setup>
import { CircleUser, Menu } from "lucide-vue-next";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { pages } from "~/lib/utils";
</script>
<template>
	<header
		class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6"
	>
		<Sheet>
			<SheetTrigger as-child>
				<Button variant="outline" size="icon" class="shrink-0 md:hidden">
					<Menu class="h-5 w-5" />
					<span class="sr-only">Toggle navigation menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" class="flex flex-col">
				<nav class="grid gap-2 text-lg font-medium">
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
				<div class="mt-auto"></div>
			</SheetContent>
		</Sheet>
		<div class="w-full flex-1"></div>
		<DropdownMenu>
			<DropdownMenuTrigger as-child>
				<Button variant="secondary" size="icon" class="rounded-full">
					<CircleUser class="h-5 w-5" />
					<span class="sr-only">Toggle user menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuItem>Support</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</header>
</template>
