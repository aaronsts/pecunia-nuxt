import { type VariantProps, cva } from "class-variance-authority";

export { default as Button } from "./Button.vue";

export const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-normal ring-offset-white   transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300",
	{
		variants: {
			variant: {
				default:
					"bg-primary-500 hover:bg-primary-400 shadow-[inset_0_0px_4px_0_rgba(0,0,0,0.01)] active:scale-95 border border-primary-300 text-gray-50  dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90",
				destructive:
					"bg-danger text-gray-50 hover:bg-danger/90 dark:bg-red-900 dark:text-gray-50 dark:hover:bg-red-900/90",
				outline:
					"border border-gray-300 bg-gray-50  hover:text-gray-900 hover:border-gray-900  dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50",
				secondary:
					"bg-gray-100 text-gray-900 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80",
				ghost:
					"hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50",
				link: "text-gray-900 underline-offset-4 hover:underline dark:text-gray-50",
			},
			size: {
				default: "px-4 py-1.5",
				sm: "px-3",
				lg: "h-11 px-8",
				icon: "h-10 w-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
