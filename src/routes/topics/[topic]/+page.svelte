<script lang="ts">
	import { browser } from "$app/environment"
	import { afterNavigate, goto } from "$app/navigation"
	import ArchiveSearchInput from "$lib/components/archive/ArchiveSearchInput.svelte"
	import PaginationNav from "$lib/components/archive/PaginationNav.svelte"
	import BlogCard from "$lib/components/BlogCard.svelte"
	import { title } from "$lib/config"
	import { createSeo } from "$lib/seo"
	import { formatDate } from "$lib/utils.js"
	import { onMount } from "svelte"
	import type { PageData } from "./$types"

	let { data }: { data: PageData } = $props()

	const pageSize = 6
	const searchThreshold = 5

	function normalizeSearch(value: string) {
		return value.trim()
	}

	function parsePage(value: string | null) {
		const parsed = Number(value)
		return Number.isInteger(parsed) && parsed > 0 ? parsed : 1
	}

	let seo = $derived(
		createSeo({
			path: `/topics/${data.topic.slug}`,
			title: `${data.topic.title} | ${title}`,
			description: data.topic.description,
		})
	)

	let searchTerm = $state("")
	let currentPage = $state(1)
	let urlStateReady = $state(!browser)

	let normalizedSearchTerm = $derived(normalizeSearch(searchTerm))
	let showSearch = $derived(data.posts.length >= searchThreshold)
	let filteredPosts = $derived(
		data.posts.filter((post) => {
			if (!normalizedSearchTerm) {
				return true
			}

			const query = normalizedSearchTerm.toLowerCase()
			const haystacks = [post.title, post.description, post.short ?? "", ...post.categories]

			return haystacks.some((field) => field.toLowerCase().includes(query))
		})
	)
	let totalPages = $derived(Math.max(1, Math.ceil(filteredPosts.length / pageSize)))
	let effectivePage = $derived(Math.min(Math.max(currentPage, 1), totalPages))
	let showPagination = $derived(filteredPosts.length > pageSize)
	let paginatedPosts = $derived(
		filteredPosts.slice((effectivePage - 1) * pageSize, effectivePage * pageSize)
	)
	let resultsLabel = $derived(
		normalizedSearchTerm
			? `${filteredPosts.length} result${filteredPosts.length === 1 ? "" : "s"} for "${normalizedSearchTerm}"`
			: `${data.posts.length} post${data.posts.length === 1 ? "" : "s"}`
	)
	let pageLabel = $derived(showPagination ? `Page ${effectivePage} of ${totalPages}` : "")
	let archiveDescription = $derived(
		showPagination
			? "Search within this topic or move page by page through the archive."
			: showSearch
				? "Use search to narrow this topic, then scan the posts in one focused view."
				: "This topic is compact enough to browse in one view."
	)

	function getUrlState() {
		if (!browser) {
			return { query: "", page: 1 }
		}

		const searchParams = new URLSearchParams(window.location.search)

		return {
			query: normalizeSearch(searchParams.get("q") ?? ""),
			page: parsePage(searchParams.get("page")),
		}
	}

	function syncStateFromUrl() {
		const { query, page } = getUrlState()

		if (query !== normalizedSearchTerm) {
			searchTerm = query
		}

		if (page !== currentPage) {
			currentPage = page
		}

		urlStateReady = true
	}

	function serializeTopicUrl(query: string, pageNumber: number) {
		const nextUrl = new URL(window.location.href)

		if (query) {
			nextUrl.searchParams.set("q", query)
		} else {
			nextUrl.searchParams.delete("q")
		}

		if (pageNumber > 1 && totalPages > 1) {
			nextUrl.searchParams.set("page", String(pageNumber))
		} else {
			nextUrl.searchParams.delete("page")
		}

		return `${nextUrl.pathname}${nextUrl.search}`
	}

	function writeTopicUrl(query: string, pageNumber: number, replaceState = false) {
		const nextUrl = serializeTopicUrl(query, pageNumber)
		const currentUrl = `${window.location.pathname}${window.location.search}`

		if (nextUrl === currentUrl) {
			return
		}

		goto(nextUrl, { replaceState, noScroll: true, keepFocus: true })
	}

	function handleSearchChange(value: string) {
		searchTerm = value
		currentPage = 1
	}

	function clearSearch() {
		searchTerm = ""
		currentPage = 1

		if (browser) {
			writeTopicUrl("", 1, true)
		}
	}

	function handlePageChange(nextPage: number) {
		const clampedPage = Math.min(Math.max(nextPage, 1), totalPages)
		currentPage = clampedPage

		if (browser) {
			writeTopicUrl(normalizedSearchTerm, clampedPage, false)
		}
	}

	onMount(() => {
		syncStateFromUrl()

		afterNavigate(() => {
			syncStateFromUrl()
		})
	})

	$effect(() => {
		if (currentPage < 1) {
			currentPage = 1
			return
		}

		if (currentPage > totalPages) {
			currentPage = totalPages
		}
	})

	$effect(() => {
		if (!browser || !urlStateReady) return

		const { query: urlQuery } = getUrlState()

		if (urlQuery !== normalizedSearchTerm) {
			const timeoutId = window.setTimeout(() => {
				writeTopicUrl(normalizedSearchTerm, 1, true)
			}, 150)

			return () => window.clearTimeout(timeoutId)
		}
	})

	$effect(() => {
		if (!browser || !urlStateReady) return

		const { query: urlQuery, page: urlPage } = getUrlState()
		const normalizedPage = showPagination ? effectivePage : 1

		if (urlQuery !== normalizedSearchTerm) {
			return
		}

		if (
			urlPage !== normalizedPage ||
			(!showPagination && new URLSearchParams(window.location.search).has("page"))
		) {
			writeTopicUrl(normalizedSearchTerm, normalizedPage, true)
		}
	})
</script>

<svelte:head>
	<title>{seo.title}</title>

	<link rel="canonical" href={seo.canonical} />
	<meta name="description" content={seo.description} />

	<meta property="og:type" content={seo.type} />
	<meta property="og:url" content={seo.canonical} />
	<meta property="og:title" content={seo.title} />
	<meta property="og:description" content={seo.description} />
	<meta property="og:site_name" content={title} />
	<meta property="og:image" content={seo.image} />

	<meta name="twitter:site" content="@McBride1105" />
	<meta name="twitter:creator" content="@McBride1105" />
	<meta name="twitter:title" content={seo.title} />
	<meta name="twitter:description" content={seo.description} />
	<meta name="twitter:card" content={seo.twitterCard} />
	<meta name="twitter:image:src" content={seo.image} />
</svelte:head>

<section class="mx-auto mb-16 max-w-6xl p-4">
	<header class="mb-8 rounded-[2rem] border border-border/80 bg-card/75 p-6 md:p-8">
		<a
			class="inline-flex text-sm font-medium text-primary underline-offset-4 hover:underline"
			href="/topics"
		>
			All topics
		</a>
		<p class="mt-4 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">Topic hub</p>
		<h1 class="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">{data.topic.title}</h1>
		<p class="mt-4 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
			{data.topic.description}
		</p>
		<div class="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
			<span class="rounded-full border border-border bg-background px-3 py-1">
				{data.posts.length} post{data.posts.length === 1 ? "" : "s"}
			</span>
			{#if data.latestActivityDate}
				<span>Latest update: {formatDate(data.latestActivityDate)}</span>
			{/if}
		</div>
		<div class="mt-6 flex flex-wrap gap-2">
			{#each data.topic.focusAreas as focusArea}
				<span class="rounded-full border border-border bg-muted/70 px-3 py-1 text-sm">{focusArea}</span>
			{/each}
		</div>
	</header>

	<section class="rounded-[1.75rem] border border-border/70 bg-background/40 p-6 md:p-8">
		<div class="mb-6 space-y-2">
			<h2 class="text-2xl font-bold sm:text-3xl">Browse posts</h2>
			<p class="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">{archiveDescription}</p>
		</div>

		{#if showSearch}
			<div class="mb-6 rounded-[1.5rem] border border-border/70 bg-card/70 p-4">
				<ArchiveSearchInput
					id="topic-search"
					label={`Search posts in ${data.topic.title}`}
					placeholder={`Search posts in ${data.topic.title}`}
					value={searchTerm}
					{resultsLabel}
					{pageLabel}
					onValueChange={handleSearchChange}
					onClear={clearSearch}
				/>
			</div>
		{/if}

		{#if filteredPosts.length === 0}
			<div class="rounded-[1.5rem] border border-dashed border-border bg-card/70 p-8 text-center">
				<h3 class="text-xl font-bold">No posts matched</h3>
				<p class="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
					Try a different keyword or clear the current search.
				</p>
				<button
					type="button"
					class="mt-5 inline-flex rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
					onclick={clearSearch}
				>
					Clear search
				</button>
			</div>
		{:else}
			{#if showPagination}
				<div class="mb-6">
					<PaginationNav currentPage={effectivePage} totalPages={totalPages} onPageChange={handlePageChange} />
				</div>
			{/if}

			<ul class="flex flex-col items-center">
				{#each paginatedPosts as post}
					<BlogCard {post} variant="compact" />
				{/each}
			</ul>

			{#if showPagination}
				<PaginationNav currentPage={effectivePage} totalPages={totalPages} onPageChange={handlePageChange} />
			{/if}
		{/if}
	</section>
</section>
