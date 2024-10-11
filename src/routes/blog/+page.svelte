<script defer>
	import BlogCard from "$lib/components/BlogCard.svelte"
	import { title, description, url } from "$lib/config"

	export let data
	const pageSize = 8

	let posts = [...data.posts]
	let currentPage = 1
	let totalPages = 1
	let searchTerm = ""

	// Reactive filtered posts based on search term
	$: filteredPosts = posts.filter((post) =>
		post.title.toLowerCase().includes(searchTerm.toLowerCase())
	)

	// Watch for searchTerm changes and reset the currentPage
	$: {
		if (searchTerm) {
			currentPage = 1 // Reset page to 1 when search term changes
		}
	}

	$: {
		// Calculate total pages
		totalPages = Math.ceil(filteredPosts.length / pageSize)
	}

	// Get paginated posts based on current page
	$: paginatedPosts = filteredPosts.slice((currentPage - 1) * pageSize, currentPage * pageSize)

	// export let data
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

	<!-- Pagination -->
	<div class="flex justify-center items-center space-x-4 mt-4">
		{#if currentPage > 1}
			<button
				on:click={() => currentPage--}
				class="btn variant-filled-primary px-4 py-2 bg-blue-500 text-white"
			>
				Previous
			</button>
		{/if}

		{#if currentPage < totalPages}
			<button
				on:click={() => currentPage++}
				class="btn variant-filled-primary px-4 py-2 bg-blue-500 text-white"
			>
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

	<!-- Pagination -->
	<div class="flex justify-center items-center space-x-4 mt-4">
		{#if currentPage > 1}
			<button
				on:click={() => currentPage--}
				class="btn variant-filled-primary px-4 py-2 bg-blue-500 text-white"
			>
				Previous
			</button>
		{/if}

		{#if currentPage < totalPages}
			<button
				on:click={() => currentPage++}
				class="btn variant-filled-primary px-4 py-2 bg-blue-500 text-white"
			>
				Next
			</button>
		{/if}

		<p class="code">Page: {currentPage}/{totalPages}</p>
	</div>
</section>
