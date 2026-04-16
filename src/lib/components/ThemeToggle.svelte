<script lang="ts">
	import { Switch, type SwitchRootProps } from "bits-ui"

	let {
		checked = $bindable(false),
		onCheckedChange,
	}: {
		checked?: boolean
		onCheckedChange?: SwitchRootProps["onCheckedChange"]
	} = $props()
</script>

<Switch.Root
	bind:checked
	{onCheckedChange}
	aria-label="Toggle dark mode"
	class={`relative inline-flex h-10 w-16 shrink-0 items-center rounded-full border px-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
		checked
			? "justify-end border-primary/40 bg-primary/15"
			: "justify-start border-border bg-muted/70"
	}`}
>
	<span class="sr-only">Toggle dark mode</span>
	<Switch.Thumb
		class={`flex h-8 w-8 items-center justify-center rounded-full border bg-card shadow-sm transition-transform ${
			checked ? "border-primary/30 text-primary" : "border-border text-muted-foreground"
		}`}
	>
		<span aria-hidden="true" class="text-sm leading-none">
			{checked ? "☀️" : "🌙"}
		</span>
	</Switch.Thumb>
</Switch.Root>
