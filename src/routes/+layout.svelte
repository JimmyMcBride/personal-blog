<script lang="ts">
	import "../app.pcss"
	import {
		AppBar,
		AppShell,
		Avatar,
		RadioGroup,
		RadioItem,
		Toast,
		initializeStores,
	} from "@skeletonlabs/skeleton"
	import MyLinks from "$lib/components/MyLinks.svelte"
	import PageTransition from "$lib/components/transition.svelte"
	import Subscribe from "$lib/components/Subscribe.svelte"
	import { afterNavigate, goto } from "$app/navigation"
	import { page } from "$app/stores"
	import { pb, getAvatarUrl } from "$lib/pocketbase"
	import { user } from "$lib/stores/user"
	import { onMount } from "svelte"

	export let data

	// User store initialization
	$: user.set(data.user ?? null)

	// Clear authStore if there's no user
	$: if (!data.user) {
		pb.authStore.clear()
	}

	onMount(() => {
		// Register the auth change listener
		const unsubscribeAuthStore = pb.authStore.onChange((_, model) => {
			if (!model) {
				document.cookie = "pb_auth=; Max-Age=0; path=/;"
				user.set(null)
			}
		})

		return () => {
			unsubscribeAuthStore()
		}
	})

	initializeStores()

	// Scroll heading into view
	function scrollHeadingIntoView(): void {
		if (!window.location.hash) return
		const elemTarget: HTMLElement | null = document.querySelector(window.location.hash)
		if (elemTarget) elemTarget.scrollIntoView({ behavior: "smooth" })
	}

	// Lifecycle
	afterNavigate(() => {
		// Scroll to top
		const elemPage = document.querySelector("#page")
		if (elemPage !== null) {
			// logFirebaseEvent("page_view", { route: window.location.pathname })
			elemPage.scrollTop = 0
		}
		// Scroll heading into view
		scrollHeadingIntoView()
	})

	function handleNavigation(event: Event) {
		const target = event.target as HTMLInputElement
		if (target.value) {
			goto(target.value)
		}
	}

	$: route = $page.url.pathname
</script>

<svelte:head>
	<meta name="google-site-verification" content="CseTqMt48Lh5608yesp0xuVuqTa6Y_Q1yWUe6rC5gSU" />
	<script
		defer
		data-domain="jimmymcbride.dev"
		src="https://plausible.jimmymcbride.dev/js/script.outbound-links.pageview-props.tagged-events.js"
	></script>
</svelte:head>

<Toast />

<AppShell>
	<svelte:fragment slot="header">
		<nav class="container mx-auto my-8 grid grid-cols-3">
			{#if $user && $user.avatar}
				<Avatar
					class="ml-2"
					src={getAvatarUrl($user.id, $user.avatar)}
					width="w-12"
					rounded="rounded-full"
					alt="Jimmy's Profile Pic"
				/>
			{:else}
				<Avatar
					class="ml-2"
					src="/me-anime.webp"
					width="w-12"
					rounded="rounded-full"
					alt="Jimmy's Profile Pic"
				/>
			{/if}

			<div class="flex justify-center">
				<RadioGroup
					active="variant-filled-primary"
					hover="hover:variant-soft-primary"
					class="items-center"
				>
					<RadioItem on:click={handleNavigation} name="route" bind:group={route} value="/">
						Home
					</RadioItem>
					<RadioItem on:change={handleNavigation} name="route" bind:group={route} value="/blog">
						Blog
					</RadioItem>
				</RadioGroup>
			</div>
		</nav>
	</svelte:fragment>
	<PageTransition url={route}>
		<main class="container mx-auto h-full">
			<slot />
		</main>
	</PageTransition>

	<svelte:fragment slot="pageFooter">
		<AppBar gridColumns="grid-cols-1" slotDefault="place-self-center" slotTrail="place-content-end">
			<div class="flex flex-col gap-4 items-center">
				<MyLinks />
				<Subscribe />
			</div>
			<svelte:fragment slot="headline">
				<div class="text-center">&copy; Copyright 2023. All rights reserved.</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
</AppShell>
