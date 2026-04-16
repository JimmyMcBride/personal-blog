<script lang="ts">
	import type { Snippet } from "svelte"

	let { children }: { children: Snippet } = $props()
</script>

<div
	class="rounded-full bg-primary text-primary-foreground hover:bg-primary/80 w-10 h-10 flex justify-center items-center transition-colors"
>
	{@render children()}
</div>
