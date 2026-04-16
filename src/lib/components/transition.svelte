<script lang="ts">
	import { fade } from "svelte/transition"
	import type { Snippet } from "svelte"

	let { url, children }: { url: string; children: Snippet } = $props()
</script>

{#key url}
	<div in:fade>
		{@render children()}
	</div>
{/key}
