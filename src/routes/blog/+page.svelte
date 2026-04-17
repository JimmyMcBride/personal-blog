<script lang="ts">
	import BlogCard from "$lib/components/BlogCard.svelte"
	import { Button } from "$lib/components/ui/button"
	import { title } from "$lib/config"
	import { createSeo } from "$lib/seo"

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
		data.posts.filter((post: { title: string }) =>
			post.title.toLowerCase().includes(searchTerm.toLowerCase())
		)
	)

	let totalPages = $derived(Math.ceil(filteredPosts.length / pageSize))

	let paginatedPosts = $derived(
		filteredPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize)
	)

	$effect(() => {
		if (searchTerm) currentPage = 1
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
	<meta name="twitter:widgets:new-embed-design" content="on" />

	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
</svelte:head>

<section class="mb-16">
	<div class="mx-4 mb-8 rounded-lg border border-border bg-card p-6">
		<div class="mb-4 flex flex-wrap items-center justify-between gap-4">
			<div>
				<h2 class="text-2xl font-bold">Browse by topic</h2>
				<p class="text-muted-foreground">
					Follow the site's main subjects through focused hub pages instead of hunting through the full archive.
				</p>
			</div>
			<a class="font-semibold text-primary underline-offset-4 hover:underline" href="/topics">
				View topic hubs
			</a>
		</div>
	</div>

	<!-- Search Input -->
	<div class="flex justify-center mb-4 mx-4">
		<label class="sr-only" for="blog-search">Search blog posts</label>
		<input
			id="blog-search"
			type="search"
			name="search"
			bind:value={searchTerm}
			placeholder="Search blogs..."
			class="flex h-10 w-full max-w-lg rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
		/>
	</div>

	<!-- Pagination (top) -->
	<div class="flex justify-center items-center space-x-4 mt-4">
		{#if currentPage > 1}
			<Button aria-label="Previous page" onclick={() => currentPage--}>Previous</Button>
		{/if}

		{#if currentPage < totalPages}
			<Button aria-label="Next page" onclick={() => currentPage++}>Next</Button>
		{/if}

		<p class="font-mono text-sm">Page: {currentPage}/{totalPages}</p>
	</div>

	<!-- Blog List -->
	<ul class="flex flex-col items-center p-4">
		{#each paginatedPosts as post}
			<BlogCard {post} />
		{/each}
	</ul>

	<!-- Pagination (bottom) -->
	<div class="flex justify-center items-center space-x-4 mt-4">
		{#if currentPage > 1}
			<Button aria-label="Previous page" onclick={() => currentPage--}>Previous</Button>
		{/if}

		{#if currentPage < totalPages}
			<Button aria-label="Next page" onclick={() => currentPage++}>Next</Button>
		{/if}

		<p class="font-mono text-sm">Page: {currentPage}/{totalPages}</p>
	</div>
</section>
