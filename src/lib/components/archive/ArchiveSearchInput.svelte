<script lang="ts">
	import { buttonVariants } from "$lib/components/ui/button"
	import { cn } from "$lib/utils.js"

	let {
		id,
		label,
		placeholder,
		value,
		resultsLabel,
		pageLabel = "",
		onValueChange,
		onClear,
	}: {
		id: string
		label: string
		placeholder: string
		value: string
		resultsLabel: string
		pageLabel?: string
		onValueChange?: (value: string) => void
		onClear?: () => void
	} = $props()

	function handleInput(event: Event) {
		const target = event.currentTarget as HTMLInputElement
		onValueChange?.(target.value)
	}
</script>

<div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
	<div class="w-full max-w-xl">
		<label class="sr-only" for={id}>{label}</label>
		<div class="relative">
			<input
				id={id}
				type="search"
				name="search"
				autocomplete="off"
				value={value}
				placeholder={placeholder}
				class="flex h-11 w-full rounded-full border border-input bg-background px-4 pr-20 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
				oninput={handleInput}
			/>
			{#if value.trim()}
				<button
					type="button"
					class={cn(
						buttonVariants("ghost", "sm"),
						"absolute right-1 top-1/2 h-8 -translate-y-1/2 rounded-full px-3 text-xs"
					)}
					aria-label={`Clear ${label.toLowerCase()}`}
					onclick={() => onClear?.()}
				>
					Clear
				</button>
			{/if}
		</div>
	</div>

	<div class="flex flex-col items-start gap-1 text-sm text-muted-foreground lg:items-end">
		<p>{resultsLabel}</p>
		{#if pageLabel}
			<p class="font-mono text-xs uppercase tracking-[0.2em]">{pageLabel}</p>
		{/if}
	</div>
</div>
