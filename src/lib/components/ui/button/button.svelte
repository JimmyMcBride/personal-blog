<script lang="ts" module>
	import { cn } from "$lib/utils.js"

	export type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
	export type ButtonSize = "default" | "sm" | "lg" | "icon"

	const variantClasses: Record<ButtonVariant, string> = {
		default: "bg-primary text-primary-foreground hover:bg-primary/90",
		destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
		outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
		secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
		ghost: "hover:bg-accent hover:text-accent-foreground",
		link: "text-primary underline-offset-4 hover:underline",
	}

	const sizeClasses: Record<ButtonSize, string> = {
		default: "h-10 px-4 py-2",
		sm: "h-9 rounded-md px-3",
		lg: "h-11 rounded-md px-8",
		icon: "h-10 w-10",
	}

	export function buttonVariants(variant: ButtonVariant = "default", size: ButtonSize = "default") {
		return cn(
			"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
			variantClasses[variant],
			sizeClasses[size]
		)
	}
</script>

<script lang="ts">
	import type { Snippet } from "svelte"
	import type { HTMLButtonAttributes } from "svelte/elements"

	let {
		class: className,
		variant = "default",
		size = "default",
		children,
		...restProps
	}: HTMLButtonAttributes & {
		variant?: ButtonVariant
		size?: ButtonSize
		children?: Snippet
	} = $props()
</script>

<button class={cn(buttonVariants(variant, size), className)} {...restProps}>
	{@render children?.()}
</button>
