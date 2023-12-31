<script lang="ts">
	import "../app.pcss"
	import {
		AppBar,
		AppShell,
		Avatar,
		LightSwitch,
		RadioGroup,
		RadioItem,
		Toast,
		autoModeWatcher,
		initializeStores,
	} from "@skeletonlabs/skeleton"
	import { afterNavigate, goto } from "$app/navigation"
	import { page } from "$app/stores"
	import MyLinks from "$lib/components/MyLinks.svelte"
	import PageTransition from "$lib/components/transition.svelte"
	import Subscribe from "$lib/components/Subscribe.svelte"
	import { logFirebaseEvent, firestore, auth } from "$lib/firebase"
	import { FirebaseApp } from "sveltefire"

	if (typeof window !== "undefined") {
		logFirebaseEvent("page_view", { route: window.location.pathname })
	}

	initializeStores()

	// Scroll heading into view
	function scrollHeadingIntoView(): void {
		if (!window.location.hash) return
		const elemTarget: HTMLElement | null = document.querySelector(window.location.hash)
		if (elemTarget) elemTarget.scrollIntoView({ behavior: "smooth" })
	}

	// Lifecycle
	afterNavigate((params: any) => {
		// Scroll to top
		const isNewPage: boolean =
			params.from && params.to && params.from.route.id !== params.to.route.id
		const elemPage = document.querySelector("#page")
		if (isNewPage && elemPage !== null) {
			logFirebaseEvent("page_view", { route: window.location.pathname })
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
	export let data
</script>

<svelte:head>
	{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
</svelte:head>

<Toast />

<FirebaseApp {auth} {firestore}>
	<AppShell>
		<svelte:fragment slot="header">
			<nav class="container mx-auto my-8 flex justify-between items-center">
				<Avatar class="ml-2" src="/me-anime.jpeg" width="w-12" rounded="rounded-full" />
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
				<LightSwitch />
			</nav>
		</svelte:fragment>
		<PageTransition url={data.url}>
			<main class="container mx-auto h-full">
				<slot />
			</main>
		</PageTransition>

		<svelte:fragment slot="pageFooter">
			<AppBar
				gridColumns="grid-cols-1"
				slotDefault="place-self-center"
				slotTrail="place-content-end"
			>
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
</FirebaseApp>
