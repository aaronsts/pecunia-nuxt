<template>
	<div class="card p-fluid">
		<DataTable
			v-model:editingRows="editingRows"
			:value="products"
			editMode="row"
			dataKey="id"
			@row-edit-save="onRowEditSave"
			:pt="{
				table: { style: 'min-width: 50rem' },
			}"
		>
			<Column field="code" header="Code" style="width: 20%">
				<template #editor="{ data, field }">
					<InputText v-model="data[field]" />
				</template>
			</Column>
			<Column field="name" header="Name" style="width: 20%">
				<template #editor="{ data, field }">
					<InputText v-model="data[field]" />
				</template>
			</Column>
			<Column field="inventoryStatus" header="Status" style="width: 20%">
				<template #editor="{ data, field }">
					<Dropdown
						v-model="data[field]"
						:options="statuses"
						optionLabel="label"
						optionValue="value"
						placeholder="Select a Status"
					>
						<template #option="slotProps">
							<Tag
								:value="slotProps.option.value"
								:severity="getStatusLabel(slotProps.option.value)"
							/>
						</template>
					</Dropdown>
				</template>
				<template #body="slotProps">
					<Tag
						:value="slotProps.data.inventoryStatus"
						:severity="getStatusLabel(slotProps.data.inventoryStatus)"
					/>
				</template>
			</Column>
			<Column field="price" header="Price" style="width: 20%">
				<template #body="{ data, field }">
					{{ formatCurrency(data[field]) }}
				</template>
				<template #editor="{ data, field }">
					<Popover>
						<PopoverTrigger as-child>
							<FormControl>
								<Button
									variant="outline"
									:class="
										cn(
											'w-[240px] ps-3 text-start font-normal',
											!value && 'text-muted-foreground'
										)
									"
								>
									<span>{{ value ? format(value, "P") : "Pick a date" }}</span>
									<CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
								</Button>
							</FormControl>
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
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ProductService } from "@/service/ProductService";

const products = ref();
const editingRows = ref([]);
const statuses = ref([
	{ label: "In Stock", value: "INSTOCK" },
	{ label: "Low Stock", value: "LOWSTOCK" },
	{ label: "Out of Stock", value: "OUTOFSTOCK" },
]);

onMounted(() => {
	ProductService.getProductsMini().then((data) => (products.value = data));
});

const onRowEditSave = (event) => {
	let { newData, index } = event;

	products.value[index] = newData;
};
const getStatusLabel = (status) => {
	switch (status) {
		case "INSTOCK":
			return "success";

		case "LOWSTOCK":
			return "warning";

		case "OUTOFSTOCK":
			return "danger";

		default:
			return null;
	}
};
const formatCurrency = (value) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(value);
};
</script>
