<script lang="ts">
	import { Toaster as SonnerToaster } from "svelte-sonner"
	import type { ComponentProps } from "svelte"

	let props: ComponentProps<typeof SonnerToaster> = $props()
</script>

<SonnerToaster {...props} />
