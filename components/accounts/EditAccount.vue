<script lang="ts" setup>
import { SquarePen } from "lucide-vue-next";
import type { Tables } from "~/types/supabase";

const { account } = defineProps<{ account: Tables<"account"> }>();
</script>
<template>
	<Sheet>
		<SheetTrigger as-child>
			<Button size="icon" variant="ghost">
				<SquarePen stroke-width="1.5" class="w-5 text-gray-500"
			/></Button>
		</SheetTrigger>
		<SheetContent>
			<SheetHeader>
				<SheetTitle>Edit Account</SheetTitle>
			</SheetHeader>
			<div class="grid gap-4 py-4">
				<EditAccountForm :account="account" />
			</div>
		</SheetContent>
	</Sheet>
</template>
