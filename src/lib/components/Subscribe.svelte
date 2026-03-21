<script lang="ts">
	import { toaster } from "$lib/stores/toaster"

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
		toaster.create({ title: message })
	}
</script>

<div class="input-group flex w-max">
	<div class="ig-cell">
		{#if loading}
			<span
				class="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full inline-block"
			></span>
		{:else}
			Subscribe
		{/if}
	</div>
	<input class="ig-input" type="email" bind:value={email} placeholder="Enter your email" />
	<button class="btn preset-filled-primary-500" onclick={subscribe}>Submit</button>
</div>
