<script lang="ts" setup>
import { cva } from "class-variance-authority";

const buttonVariants = cva(
	"inline-flex items-center justify-center w-full text-center text-sm font-medium ring-offset-background  focus-visible:outline-none rounded-lg focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 transition-all",
	{
		variants: {
			variant: {
				default:
					"bg-primary-600 active:bg-primary-500 text-white hover:bg-primary-600/90",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90",
				outline:
					"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-10 px-5 py-2.5",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

interface Props {
	variant?: NonNullable<Parameters<typeof buttonVariants>[0]>["variant"];
	size?: NonNullable<Parameters<typeof buttonVariants>[0]>["size"];
	type?: "submit" | "button" | "reset";
}

withDefaults(defineProps<Props>(), {
	variant: "default",
	size: "default",
	type: "submit",
});
</script>
<template>
	<button :type="type" :class="buttonVariants({ variant, size })">
		<slot />
	</button>
</template>
