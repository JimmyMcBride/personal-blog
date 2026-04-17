<script lang="ts">
	import "../app.css"
	import { browser } from "$app/environment"
	import { Toaster } from "svelte-sonner"
	import ThemeToggle from "$lib/components/ThemeToggle.svelte"
	import NavAvatar from "$lib/components/NavAvatar.svelte"
	import { buttonVariants } from "$lib/components/ui/button"
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
	let isDark = $state(browser ? document.documentElement.classList.contains("dark") : false)
	let themePreference = $state<"light" | "dark" | null>(null)
	let themeReady = $state(false)

	// Sync user store from server data
	$effect(() => {
		const nextUser = data.user ?? (browser ? pb.authStore.model : null)
		if (nextUser) {
			user.set(nextUser)
		}
	})

	$effect(() => {
		if (typeof window === "undefined" || !themeReady) return

		const nextTheme = isDark ? "dark" : "light"
		document.documentElement.classList.toggle("dark", isDark)
		document.documentElement.dataset.theme = nextTheme

		try {
			if (themePreference) {
				localStorage.setItem("theme", themePreference)
			} else {
				localStorage.removeItem("theme")
			}
		} catch {
			// Ignore storage failures and keep the DOM theme as the source of truth.
		}
	})

	onMount(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
		let saved: string | null = null

		try {
			saved = localStorage.getItem("theme")
		} catch {
			saved = null
		}

		themePreference = saved === "light" || saved === "dark" ? saved : null
		isDark = document.documentElement.classList.contains("dark")
		themeReady = true

		const handleSystemThemeChange = (event: MediaQueryListEvent) => {
			if (themePreference === null) {
				isDark = event.matches
			}
		}

		mediaQuery.addEventListener("change", handleSystemThemeChange)

		// Auth change listener
		const unsubscribeAuthStore = pb.authStore.onChange((_, model) => {
			if (!model) {
				document.cookie = "pb_auth=; Max-Age=0; path=/;"
				user.set(null)
			}
		})

		return () => {
			mediaQuery.removeEventListener("change", handleSystemThemeChange)
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
	let currentPostTitle = $derived(isBlogChildRoute ? ($page.data.meta?.title ?? "") : "")
	let navAvatarSrc = $derived(
		$user && $user.avatar ? getAvatarUrl($user.id, $user.avatar) : "/me-anime.webp"
	)

	function handleThemeChange(nextChecked: boolean) {
		isDark = nextChecked
		themePreference = nextChecked ? "dark" : "light"
	}
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
				<NavAvatar src={navAvatarSrc} alt="Jimmy's Profile Pic" />
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
					class={cn(
						buttonVariants(isBlogIndexRoute ? "default" : "ghost"),
						isBlogChildRoute &&
							"border border-primary/25 bg-primary/10 text-primary/80 hover:border-primary/35 hover:bg-primary/15 hover:text-primary",
						"no-underline"
					)}
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
				<div
					class={cn(
						"flex h-10 w-16 items-center justify-end transition-opacity",
						themeReady ? "opacity-100" : "pointer-events-none opacity-0"
					)}
					aria-hidden={themeReady ? undefined : "true"}
				>
					<ThemeToggle checked={isDark} onCheckedChange={handleThemeChange} />
				</div>
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
