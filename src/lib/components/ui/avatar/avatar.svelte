<script lang="ts">
	import { Avatar as AvatarPrimitive, type AvatarRootProps } from "bits-ui"
	import { cn } from "$lib/utils.js"

	let {
		class: className,
		children,
		...restProps
	}: AvatarRootProps = $props()
</script>

<AvatarPrimitive.Root
	class={cn(
		"relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</AvatarPrimitive.Root>
