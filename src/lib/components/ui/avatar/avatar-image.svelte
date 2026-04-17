<script lang="ts">
	import { Avatar as AvatarPrimitive, type AvatarImageProps } from "bits-ui"
	import { cn } from "$lib/utils.js"

	let { class: className, ...restProps }: AvatarImageProps = $props()
</script>

<AvatarPrimitive.Image class={cn("aspect-square h-full w-full object-cover", className)} {...restProps} />
