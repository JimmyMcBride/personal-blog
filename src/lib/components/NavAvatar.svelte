<script lang="ts">
	let {
		src,
		alt,
		fallbackText = "J",
	}: {
		src?: string
		alt: string
		fallbackText?: string
	} = $props()

	let hasError = $state(false)

	$effect(() => {
		hasError = !src
	})
</script>

<div class="h-12 w-12 overflow-hidden rounded-full bg-muted ring-1 ring-border/50">
	{#if src && !hasError}
		<img
			{src}
			{alt}
			class="h-full w-full object-cover"
			loading="eager"
			fetchpriority="high"
			decoding="async"
			onerror={() => {
				hasError = true
			}}
		/>
	{:else}
		<div
			class="flex h-full w-full items-center justify-center bg-primary text-sm font-medium text-primary-foreground"
			role="img"
			aria-label={alt}
		>
			{fallbackText}
		</div>
	{/if}
</div>
