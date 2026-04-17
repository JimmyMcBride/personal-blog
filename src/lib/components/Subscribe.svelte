<script lang="ts">
	import { toast } from "$lib/stores/toaster"
	import { Button } from "$lib/components/ui/button"

	let loading = $state(false)
	let email = $state("")

	async function subscribe() {
		loading = true
		const res = await fetch("/api/subscribe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		})
		const data = await res.json()
		const message = res.status === 200 ? data.message : data.title
		loading = false
		email = ""
		toast(message)
	}
</script>

<form
	class="flex w-max overflow-hidden rounded-md ring-1 ring-border focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background"
	onsubmit={(event) => {
		event.preventDefault()
		subscribe()
	}}
>
	<label class="sr-only" for="subscribe-email">Email address</label>
	<div
		class="flex items-center justify-center bg-muted px-4 text-sm text-muted-foreground"
		aria-live="polite"
		aria-atomic="true"
	>
		{#if loading}
			<span
				class="animate-spin inline-block h-5 w-5 rounded-full border-2 border-current border-t-transparent"
			></span>
			<span class="sr-only">Subscribing</span>
		{:else}
			Subscribe
		{/if}
	</div>
	<input
		id="subscribe-email"
		name="email"
		class="border-0 border-l border-border bg-transparent px-3 py-1 text-base focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
		type="email"
		bind:value={email}
		autocomplete="email"
		inputmode="email"
		placeholder="Enter your email"
		required
		disabled={loading}
	/>
	<Button type="submit" class="rounded-none" disabled={loading}>Submit</Button>
</form>
