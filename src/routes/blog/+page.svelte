<script lang="ts">
	import ArchiveSearchInput from "$lib/components/archive/ArchiveSearchInput.svelte"
	import PaginationNav from "$lib/components/archive/PaginationNav.svelte"
	import BlogCard from "$lib/components/BlogCard.svelte"
	import { buttonVariants } from "$lib/components/ui/button"
	import { title } from "$lib/config"
	import { createSeo } from "$lib/seo"
	import { cn } from "$lib/utils"

	let { data } = $props()
	const pageSize = 8
	const seo = createSeo({
		path: "/blog",
		title: `Blog | ${title}`,
		description:
			"Technical tutorials, developer essays, and practical notes on SvelteKit, Bash, Linux, AI tools, and self-hosting.",
	})

	let currentPage = $state(1)
	let searchTerm = $state("")

	let filteredPosts = $derived(
		data.posts.filter((post: { title: string; description: string }) =>
			`${post.title} ${post.description}`.toLowerCase().includes(searchTerm.toLowerCase())
		)
	)

	let totalPages = $derived(Math.max(1, Math.ceil(filteredPosts.length / pageSize)))
	let showPagination = $derived(filteredPosts.length > pageSize)
	let resultsLabel = $derived(
		searchTerm.trim()
			? `${filteredPosts.length} result${filteredPosts.length === 1 ? "" : "s"} for "${searchTerm.trim()}"`
			: `${data.posts.length} post${data.posts.length === 1 ? "" : "s"} in the archive`
	)
	let pageLabel = $derived(showPagination ? `Page ${currentPage} of ${totalPages}` : "")

	let paginatedPosts = $derived(
		filteredPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize)
	)

	$effect(() => {
		if (searchTerm) currentPage = 1
	})

	function handleSearchChange(value: string) {
		searchTerm = value
	}

	function clearSearch() {
		searchTerm = ""
		currentPage = 1
	}

	function handlePageChange(page: number) {
		currentPage = Math.min(Math.max(page, 1), totalPages)
	}
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
	<meta name="twitter:widgets:new-embed-design" content="on" />

	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
</svelte:head>

<section class="mb-16">
	<div class="mx-4 mb-8 rounded-[1.75rem] border border-border/70 bg-card/70 p-5 md:p-6">
		<div class="flex flex-col gap-5">
			<div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
				<div class="space-y-2">
					<p class="text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">Archive</p>
					<h2 class="text-2xl font-bold sm:text-3xl">Search the full archive</h2>
					<p class="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
						Browse every post in one place, or switch to topic hubs when you want a tighter subject view.
					</p>
				</div>

				<a
					class={cn(buttonVariants("outline", "sm"), "w-fit rounded-full px-4 no-underline")}
					href="/topics"
				>
					Explore topic hubs
				</a>
			</div>

			<div class="border-t border-border/70 pt-5">
				<ArchiveSearchInput
					id="blog-search"
					label="Search blog posts"
					placeholder="Search titles and summaries"
					value={searchTerm}
					{resultsLabel}
					{pageLabel}
					onValueChange={handleSearchChange}
					onClear={clearSearch}
				/>
			</div>
		</div>
	</div>

	{#if filteredPosts.length === 0}
		<div class="mx-4 rounded-[1.5rem] border border-dashed border-border bg-card/60 p-8 text-center">
			<h3 class="text-xl font-bold">No posts matched</h3>
			<p class="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
				Try a broader search term or clear the current filter.
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
		<ul class="flex flex-col items-center px-4 pb-2">
			{#each paginatedPosts as post}
				<BlogCard {post} />
			{/each}
		</ul>

		{#if showPagination}
			<div class="mx-4">
				<PaginationNav currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
			</div>
		{/if}
	{/if}
</section>
