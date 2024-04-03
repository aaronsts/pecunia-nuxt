// plugins/myPiniaPlugin.ts
import { type Pinia, type PiniaPluginContext } from "pinia";
import cloneDeep from "lodash.clonedeep";

function ResetStorePlugin({ store }: PiniaPluginContext) {
	const initialState = cloneDeep(store.$state);
	store.$reset = () => {
		console.log("Resetting all stores...");
		store.$patch(($state) => {
			Object.assign($state, initialState);
		});
	};
}

export default defineNuxtPlugin(({ $pinia }) => {
	const _pinia = $pinia as Pinia;
	if (!_pinia) return;

	_pinia.use(ResetStorePlugin);
});
