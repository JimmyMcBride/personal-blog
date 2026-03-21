<script lang="ts">
	import BlogCard from "$lib/components/BlogCard.svelte"
	import { title, description, url } from "$lib/config"

	let { data } = $props()
	const pageSize = 8

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
	<title>{title}</title>

	<meta name="description" content={description} />

	<meta property="og:type" content="article" />
	<meta property="og:url" content={`${url}/blog`} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content={title} />
	<meta property="og:image" content="/blog-banner.webp" />

	<meta name="twitter:site" content="@McBride1105" />
	<meta name="twitter:creator" content="@McBride1105" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image:src" content="/blog-banner.webp" />
	<meta name="twitter:widgets:new-embed-design" content="on" />

	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
</svelte:head>

<section class="mb-16">
	<!-- Search Input -->
	<div class="flex justify-center mb-4 mx-4">
		<input
			type="search"
			name="search"
			bind:value={searchTerm}
			placeholder="Search blogs..."
			class="input border p-2 w-full max-w-lg"
		/>
	</div>

	<!-- Pagination (top) -->
	<div class="flex justify-center items-center space-x-4 mt-4">
		{#if currentPage > 1}
			<button onclick={() => currentPage--} class="btn preset-filled-primary-500">
				Previous
			</button>
		{/if}

		{#if currentPage < totalPages}
			<button onclick={() => currentPage++} class="btn preset-filled-primary-500">
				Next
			</button>
		{/if}

		<p class="code">Page: {currentPage}/{totalPages}</p>
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
			<button onclick={() => currentPage--} class="btn preset-filled-primary-500">
				Previous
			</button>
		{/if}

		{#if currentPage < totalPages}
			<button onclick={() => currentPage++} class="btn preset-filled-primary-500">
				Next
			</button>
		{/if}

		<p class="code">Page: {currentPage}/{totalPages}</p>
	</div>
</section>
