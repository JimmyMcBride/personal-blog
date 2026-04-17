<script lang="ts">
	import { cn } from "$lib/utils.js"
	import type { Snippet } from "svelte"
	import type { HTMLAttributes } from "svelte/elements"

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props()
</script>

<div
	class={cn("rounded-lg border border-border bg-card text-card-foreground shadow-sm", className)}
	{...restProps}
>
	{@render children?.()}
</div>
