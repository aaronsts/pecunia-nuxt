<script setup lang="ts">
import Header from "~/components/ui/Header.vue";

definePageMeta({
	layout: "app",
	middleware: ["auth"],
});
</script>
<template>
	<div>
		<Header text="Accounts" />
		<div class="p-4">
			<AccountList />
		</div>
	</div>
	<!-- <div>
		<form @submit.prevent="createNewAccount" class="max-w-sm">
			<div class="sm:col-span-4">
				<label
					for="account"
					class="block text-sm font-medium leading-6 text-neutral-900"
					>Account Name</label
				>
				<input
					id="account"
					name="account"
					type="text"
					v-model="name"
					v-bind="nameAttr"
					:class="{ 'ring-danger': errors.name }"
					class="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-primary-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
				/>
				<span class="text-danger">{{ errors.name }}</span>
			</div>
			<div class="sm:col-span-4">
				<label
					for="amount"
					class="block text-sm font-medium leading-6 text-neutral-900"
					>Amount</label
				>
				<input
					id="amount"
					name="amount"
					type="number"
					v-model="amount"
					v-bind="amountAttr"
					:class="{ 'ring-danger': errors.amount }"
					class="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-primary-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
				/>
				<span class="text-danger">{{ errors.amount }}</span>
			</div>
			<div class="sm:col-span-4">
				<label
					for="description"
					class="block text-sm font-medium leading-6 text-neutral-900"
					>Description</label
				>
				<input
					id="description"
					name="description"
					type="text"
					v-model="description"
					v-bind="descriptionAttr"
					:class="{ 'ring-danger': errors.description }"
					class="block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-primary-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 sm:text-sm sm:leading-6"
				/>
				<span class="text-danger">{{ errors.description }}</span>
			</div>
			<div class="mt-2">
				<button type="submit">Add Account</button>
			</div>
		</form>
	</div>
	<AccountList /> -->
</template>
