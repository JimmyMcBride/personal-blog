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

<div class="flex w-max rounded-md ring-1 ring-border overflow-hidden">
	<div class="flex items-center justify-center px-4 text-sm bg-muted text-muted-foreground">
		{#if loading}
			<span
				class="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full inline-block"
			></span>
		{:else}
			Subscribe
		{/if}
	</div>
	<input
		class="bg-transparent px-3 py-1 text-base border-0 border-l border-border outline-none focus:ring-0"
		type="email"
		bind:value={email}
		placeholder="Enter your email"
	/>
	<Button onclick={subscribe} class="rounded-none">Submit</Button>
</div>
