<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-vue-next";
import Popover from "../ui/popover/Popover.vue";
import PopoverTrigger from "../ui/popover/PopoverTrigger.vue";
import Button from "../ui/button/Button.vue";
import PopoverContent from "../ui/popover/PopoverContent.vue";
import Calendar from "../ui/calendar/Calendar.vue";

const transactionStore = useTransactionStore();
const { transactions, fetching } = storeToRefs(transactionStore);
const accountStore = useAccountsStore();
const { accounts } = storeToRefs(accountStore);

const isEditing = ref(false);
const editingRows = ref([]);

const onRowEditSave = (event) => {
	console.log("event", event.newData);
	// let { newData, index } = event;
	// products.value[index] = newData;
};

const formatCurrency = (value: number) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(value);
};
</script>
<template>
	<div>
		<DataTable
			v-model:editingRows="editingRows"
			@row-edit-save="onRowEditSave"
			editMode="row"
			dataKey="id"
			:value="transactions"
			tableStyle="min-width: 50rem"
		>
			<Column field="account.name" header="Account" style="width: 30%">
				<template #editor="{ data, field }">
					<Select>
						<SelectTrigger class="w-[180px]">
							<SelectValue :placeholder="data.account.name" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Accounts</SelectLabel>
								<SelectItem v-for="account in accounts" :value="account.id">{{
									account.name
								}}</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</template>
			</Column>
			<Column field="amount" header="Amount">
				<template #body="{ data, field }">
					{{ formatCurrency(data[field]) }}
				</template>
				<template #editor="{ data, field }">
					<InputNumber
						inputClass="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						v-model="data[field]"
						mode="currency"
						currency="USD"
						locale="en-US"
					/>
				</template>
			</Column>
			<Column field="description" header="Description">
				<template #editor="{ data, field }">
					<Input v-model="data[field]" />
				</template>
			</Column>
			<Column field="transaction_date" header="Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data[slotProps.field]), "P") }}
				</template>
				<template #editor="{ data, field }">
					<Popover>
						<PopoverTrigger as-child>
							<Button
								variant="outline"
								class="'w-[240px] ps-3 text-start font-normal'"
							>
								<span>
									{{ format(new Date(data[field]), "P") }}
								</span>
								<CalendarIcon class="ml-2 h-4 w-4 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent class="p-0">
							<Calendar v-model="data[field]" />
						</PopoverContent>
					</Popover>
				</template>
			</Column>
			<Column
				:rowEditor="true"
				style="width: 10%; min-width: 8rem"
				bodyStyle="text-align:center"
			></Column>
		</DataTable>
		<!-- <ul v-if="!fetching">
			<li
				v-for="transaction in transactions"
				:key="transaction.id"
				class="flex flex-col items-center gap-2"
			>
				<p :class="[isEditing ? 'hidden' : 'block']">
					{{ transaction.payee ? transaction.payee.name : "No Payee added" }} |
					{{
						new Intl.NumberFormat("en-US", {
							style: "currency",
							currency: "USD",
						}).format(transaction.amount)
					}}
					| {{ transaction.account && transaction.account.name }} |
					{{ transaction.categorie && transaction.categorie.name }} |
					{{ transaction.description }}
					|
					{{
						new Date(
							transaction.transaction_date
								.replace(/-/g, "\/")
								.replace(/T.+/, "")
						).toLocaleDateString("en-US", {
							day: "2-digit",
							month: "2-digit",
							year: "numeric",
						})
					}}
				</p>
				<EditTransaction
					:transaction="transaction"
					:class="[!isEditing ? 'hidden' : 'block']"
				/>
				<button @click="editTransaction">
					<FilePenLine :size="16" />
					<span class="sr-only">Edit</span>
				</button>
				<button @click="transactionStore.destroy(transaction.id)">
					<Trash2 :size="16" />
					<span class="sr-only">Delete</span>
				</button>
			</li>
		</ul>
		<div v-else>Loading ...</div> -->
	</div>
</template>
