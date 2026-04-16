<script lang="ts" module>
	import { cn } from "$lib/utils.js"

	export type BadgeVariant = "default" | "secondary" | "destructive" | "outline"

	const variantClasses: Record<BadgeVariant, string> = {
		default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
		outline: "text-foreground",
	}

	export function badgeVariants(variant: BadgeVariant = "default") {
		return cn(
			"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
			variantClasses[variant]
		)
	}
</script>

<script lang="ts">
	import type { Snippet } from "svelte"
	import type { HTMLAttributes } from "svelte/elements"

	let {
		class: className,
		variant = "default",
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		variant?: BadgeVariant
		children?: Snippet
	} = $props()
</script>

<div class={cn(badgeVariants(variant), className)} {...restProps}>
	{@render children?.()}
</div>
