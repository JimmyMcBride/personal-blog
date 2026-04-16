<script lang="ts">
	import { cn } from "$lib/utils.js"
	import type { Snippet } from "svelte"
	import type { HTMLAttributes } from "svelte/elements"

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLSpanElement> & { children?: Snippet } = $props()
</script>

<span
	class={cn(
		"flex h-full w-full items-center justify-center rounded-full bg-muted",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</span>
