<script lang="ts">
	import { getToastStore, ProgressRadial } from "@skeletonlabs/skeleton"
	import type { ToastSettings } from "@skeletonlabs/skeleton"

	const toastStore = getToastStore()

	let loading = false
	let email = ""
	const t: ToastSettings = {
		message: "",
		timeout: 5000,
	}

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
		if (res.status === 200) {
			t.message = data.message
		} else {
			t.message = data.title
		}
		loading = false
		email = ""
		toastStore.trigger(t)
	}
</script>

<div class="input-group input-group-divider flex w-max">
	<div class="input-group-shim w-28">
		{#if loading}
			<ProgressRadial
				value={undefined}
				stroke={100}
				meter="stroke-primary-500"
				track="stroke-primary-500/30"
				width="w-8"
				class="mx-auto"
			/>
		{:else}
			Subscribe
		{/if}
	</div>
	<input type="email" bind:value={email} placeholder="Enter your email" />
	<button class="variant-filled-primary" on:click={subscribe}>Submit</button>
</div>
