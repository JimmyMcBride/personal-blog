<script lang="ts">
	import "../app.pcss"
	import * as Avatar from "$lib/components/ui/avatar"
	import { Toaster } from "svelte-sonner"
	import { Button } from "$lib/components/ui/button"
	import MyLinks from "$lib/components/MyLinks.svelte"
	import PageTransition from "$lib/components/transition.svelte"
	import Subscribe from "$lib/components/Subscribe.svelte"
	import { afterNavigate } from "$app/navigation"
	import { page } from "$app/stores"
	import { pb, getAvatarUrl } from "$lib/pocketbase"
	import { user } from "$lib/stores/user"
	import { onMount } from "svelte"

	let { data, children } = $props()

	// Dark mode
	let isDark = $state(false)

	function toggleDark() {
		isDark = !isDark
		document.documentElement.classList.toggle("dark", isDark)
		localStorage.setItem("theme", isDark ? "dark" : "light")
	}

	// Sync user store from server data
	$effect(() => {
		user.set(data.user ?? null)
		if (!data.user) {
			pb.authStore.clear()
		}
	})

	onMount(() => {
		// Initialize dark mode from localStorage or system preference
		const saved = localStorage.getItem("theme")
		isDark =
			saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)
		document.documentElement.classList.toggle("dark", isDark)

		// Auth change listener
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

	afterNavigate(() => {
		const elemPage = document.querySelector("#page")
		if (elemPage !== null) {
			elemPage.scrollTop = 0
		}
		if (window.location.hash) {
			const elemTarget = document.querySelector(window.location.hash) as HTMLElement | null
			if (elemTarget) elemTarget.scrollIntoView({ behavior: "smooth" })
		}
	})

	let route = $derived($page.url.pathname)
</script>

<svelte:head>
	<meta name="google-site-verification" content="CseTqMt48Lh5608yesp0xuVuqTa6Y_Q1yWUe6rC5gSU" />
	<script
		defer
		data-domain="jimmymcbride.dev"
		src="https://plausible.jimmymcbride.dev/js/script.outbound-links.pageview-props.tagged-events.js"
	></script>
</svelte:head>

<!-- Toast notifications -->
<Toaster richColors position="top-right" theme={isDark ? 'dark' : 'light'} />

<!-- App layout -->
<div class="flex flex-col h-full">
	<!-- Header -->
	<header>
		<nav class="container mx-auto my-8 grid grid-cols-3 items-center">
			<!-- Avatar -->
			<div class="ml-2">
				{#if $user && $user.avatar}
					<Avatar.Root class="h-12 w-12">
						<Avatar.Image
							src={getAvatarUrl($user.id, $user.avatar)}
							alt="Jimmy's Profile Pic"
							class="object-cover"
						/>
						<Avatar.Fallback class="bg-primary text-primary-foreground">J</Avatar.Fallback>
					</Avatar.Root>
				{:else}
					<Avatar.Root class="h-12 w-12">
						<Avatar.Image
							src="/me-anime.webp"
							alt="Jimmy's Profile Pic"
							class="object-cover"
						/>
						<Avatar.Fallback class="bg-primary text-primary-foreground">J</Avatar.Fallback>
					</Avatar.Root>
				{/if}
			</div>

			<!-- Navigation -->
			<div class="flex justify-center gap-1">
				<a
					href="/"
					class="no-underline"
				>
					<Button variant={route === '/' ? 'default' : 'ghost'}>
						Home
					</Button>
				</a>
				<a
					href="/blog"
					class="no-underline"
				>
					<Button variant={route.startsWith('/blog') ? 'default' : 'ghost'}>
						Blog
					</Button>
				</a>
			</div>

			<!-- Dark mode toggle -->
			<div class="flex justify-end items-center mr-2">
				<Button
					onclick={toggleDark}
					variant="ghost"
					size="icon"
					aria-label="Toggle dark mode"
				>
					{isDark ? "☀️" : "🌙"}
				</Button>
			</div>
		</nav>
	</header>

	<!-- Main scrollable content -->
	<main class="flex-1 overflow-y-auto" id="page">
		<div class="container mx-auto h-full">
			<PageTransition url={route}>
				{@render children()}
			</PageTransition>
		</div>
	</main>

	<!-- Footer -->
	<footer class="py-6 border-t border-border">
		<div class="flex flex-col gap-4 items-center">
			<MyLinks />
			<Subscribe />
			<p class="text-center text-sm opacity-60">&copy; Copyright 2023. All rights reserved.</p>
		</div>
	</footer>
</div>
