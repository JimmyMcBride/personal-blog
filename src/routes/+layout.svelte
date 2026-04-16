<script lang="ts">
	import "../app.css"
	import * as Avatar from "$lib/components/ui/avatar"
	import { Toaster } from "svelte-sonner"
	import ThemeToggle from "$lib/components/ThemeToggle.svelte"
	import { buttonVariants, type ButtonVariant } from "$lib/components/ui/button"
	import MyLinks from "$lib/components/MyLinks.svelte"
	import PageTransition from "$lib/components/transition.svelte"
	import Subscribe from "$lib/components/Subscribe.svelte"
	import { afterNavigate } from "$app/navigation"
	import { page } from "$app/stores"
	import { pb, getAvatarUrl } from "$lib/pocketbase"
	import { user } from "$lib/stores/user"
	import { cn } from "$lib/utils.js"
	import { onMount, tick } from "svelte"

	let { data, children } = $props()

	// Dark mode
	let isDark = $state(false)

	// Sync user store from server data
	$effect(() => {
		user.set(data.user ?? null)
		if (!data.user) {
			pb.authStore.clear()
		}
	})

	$effect(() => {
		if (typeof window === "undefined") return

		document.documentElement.classList.toggle("dark", isDark)
		localStorage.setItem("theme", isDark ? "dark" : "light")
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

	afterNavigate(async () => {
		await tick()

		const hash = window.location.hash.slice(1)
		if (hash) {
			requestAnimationFrame(() => {
				const elemTarget = document.getElementById(decodeURIComponent(hash))
				if (elemTarget) elemTarget.scrollIntoView({ behavior: "smooth", block: "start" })
			})
			return
		}

		window.scrollTo({ top: 0, behavior: "auto" })
	})

	let route = $derived($page.url.pathname)
	let isHomeRoute = $derived(route === "/")
	let isBlogIndexRoute = $derived(route === "/blog")
	let isBlogChildRoute = $derived(route.startsWith("/blog/"))
	let blogButtonVariant = $derived.by((): ButtonVariant => {
		if (isBlogIndexRoute) return "default"
		if (isBlogChildRoute) return "outline"
		return "ghost"
	})
	let currentPostTitle = $derived(isBlogChildRoute ? ($page.data.meta?.title ?? "") : "")
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
<Toaster richColors position="top-right" theme={isDark ? "dark" : "light"} />

<!-- App layout -->
<div class="flex min-h-screen flex-col">
	<!-- Header -->
	<header>
		<nav class="container mx-auto my-8 grid grid-cols-[auto_1fr_auto] items-center gap-4 px-2">
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
						<Avatar.Image src="/me-anime.webp" alt="Jimmy's Profile Pic" class="object-cover" />
						<Avatar.Fallback class="bg-primary text-primary-foreground">J</Avatar.Fallback>
					</Avatar.Root>
				{/if}
			</div>

			<!-- Navigation -->
			<div class="flex min-w-0 items-center justify-center gap-2">
				<a
					href="/"
					aria-current={isHomeRoute ? "page" : undefined}
					class={cn(buttonVariants(isHomeRoute ? "default" : "ghost"), "no-underline")}
				>
					Home
				</a>
				<a
					href="/blog"
					aria-current={isBlogIndexRoute ? "page" : undefined}
					class={cn(buttonVariants(blogButtonVariant), "no-underline")}
				>
					Blog
				</a>
				{#if currentPostTitle}
					<span
						class="hidden h-10 min-w-0 max-w-[14rem] items-center rounded-md border border-border bg-muted/50 px-3 text-sm text-muted-foreground sm:inline-flex md:max-w-[20rem] lg:max-w-[26rem]"
						title={currentPostTitle}
					>
						<span class="truncate whitespace-nowrap">{currentPostTitle}</span>
					</span>
				{/if}
			</div>

			<!-- Dark mode toggle -->
			<div class="mr-2 flex items-center justify-end">
				<ThemeToggle bind:checked={isDark} />
			</div>
		</nav>
	</header>

	<!-- Main content -->
	<main class="flex-1">
		<div class="container mx-auto">
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
