<script setup lang="ts">
import { onMounted } from "vue";
import { initFlowbite } from "flowbite";
import { ArrowDownLeft, ArrowUpLeft, ArrowUpRight } from "lucide-vue-next";

definePageMeta({
	layout: "app",
	middleware: ["auth"],
});

// initialize components based on data attribute selectors
onMounted(() => {
	initFlowbite();
});
</script>
<template>
	<div class="py-8">
		<div class="p-6 rounded-lg shadow-md space-y-6 max-w-sm bg-gray-100">
			<div>
				<span>placeholder</span>
				<h3>New Transaction</h3>
			</div>
			<div class="mb-4">
				<ul
					data-tabs-active-classes="bg-gray-700 text-gray-50 shadow-sm"
					data-tabs-inactive-classes="hover:text-gray-900 text-gray-500"
					class="flex font-medium text-base gap-2 bg-gray-200 rounded-lg p-1"
					id="default-tab"
					data-tabs-toggle="#default-tab-content"
					role="tablist"
				>
					<li class="w-1/2" role="presentation">
						<button
							class="inline-block w-full p-2.5 rounded-lg"
							id="expense-tab"
							data-tabs-target="#expense"
							type="button"
							role="tab"
							aria-controls="expense"
							aria-selected="false"
						>
							<span class="flex justify-center mr-3">
								<ArrowDownLeft class="w-6 h-6 text-danger" />
								Expense
							</span>
						</button>
					</li>
					<li class="w-1/2" role="presentation">
						<button
							class="inline-block w-full p-2.5 rounded-lg"
							id="income-tab"
							data-tabs-target="#income"
							type="button"
							role="tab"
							aria-controls="income"
							aria-selected="false"
						>
							<span class="flex justify-center mr-3">
								<ArrowUpRight class="w-6 h-6 text-success" />
								Income
							</span>
						</button>
					</li>
				</ul>
			</div>
			<div id="default-tab-content">
				<div
					class="hidden"
					id="expense"
					role="tabpanel"
					aria-labelledby="expense-tab"
				>
					<TransactionModal text="Add Expense" type="expense" />
				</div>
				<div
					class="hidden"
					id="income"
					role="tabpanel"
					aria-labelledby="income-tab"
				>
					<TransactionModal text="Add Income" type="income" />
				</div>
			</div>
		</div>
	</div>
</template>
