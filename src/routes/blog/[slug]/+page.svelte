<script lang="ts">
	import { formatDate } from "$lib/utils"
	import { url, title } from "$lib/config"
	import { page } from "$app/stores"
	import { onMount } from "svelte"

	// Access the slug from the page store
	let slug = $page.params.slug
	let totalViews: number

	onMount(() => {
		fetch("/api/unique-views", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ slug: slug }),
		})
			.then((res) => res.json())
			.then((data) => (totalViews = data.totalViews))
	})

	export let data
</script>

<!-- SEO -->
<svelte:head>
	<title>{data.meta.title}</title>

	<link rel="canonical" href={`${url}${data.url}`} />
	<meta name="description" content={data.meta.description} />

	<meta property="og:type" content="article" />
	<meta property="og:url" content={`${url}${data.url}`} />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	<meta property="og:site_name" content={title} />
	<meta property="og:image" content={data.meta.image} />

	<meta name="twitter:site" content="@McBride1105" />
	<meta name="twitter:creator" content="@McBride1105" />
	<meta name="twitter:title" content={data.meta.title} />
	<meta name="twitter:description" content={data.meta.description} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image:src" content={data.meta.image} />
	<meta name="twitter:widgets:new-embed-design" content="on" />

	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
</svelte:head>
<article class="prose md:prose-lg lg:prose-xl mx-auto dark:prose-invert mb-16">
	<!-- Title -->
	<hgroup class="flex flex-col items-end">
		<h1 class="">{data.meta.title}</h1>
		<img src={data.meta.image} alt="blog banner" class="rounded-md" />
		<p class="text-end text-sm">
			Published at {formatDate(data.meta.date)}
			<br />
			Total Views:
			{#if totalViews !== undefined}
				{totalViews}
			{/if}
		</p>
	</hgroup>

	<!-- Tags -->
	<div class="flex flex-wrap gap-4 mb-6">
		{#each data.meta.categories as category}
			<a href={`/blog/categories/${category}`} class="chip variant-filled-secondary no-underline"
				>&num;{category}</a
			>
		{/each}
	</div>

	<!-- Post -->
	<svelte:component this={data.content} />
</article>
