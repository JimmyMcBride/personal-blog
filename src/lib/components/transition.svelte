<script lang="ts">
	import { fade } from "svelte/transition"
	import type { Snippet } from "svelte"

	let { url, children }: { url: string; children: Snippet } = $props()
</script>

{#key url}
	<div class="h-full" in:fade>
		{@render children()}
	</div>
{/key}
