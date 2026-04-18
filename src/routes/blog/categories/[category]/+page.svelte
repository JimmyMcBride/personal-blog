<script lang="ts">
	import BlogCard from "$lib/components/BlogCard.svelte"
	import { title } from "$lib/config"
	import { createSeo, formatCategoryLabel } from "$lib/seo"
	import type { PageData } from "./$types"

	let { data }: { data: PageData } = $props()
	let label = $derived(formatCategoryLabel(data.category))
	let seo = $derived(
		createSeo({
			path: `/blog/categories/${data.category}`,
			title: `${label} Articles | ${title}`,
			description: `Browse Jimmy McBride's posts about ${label.toLowerCase()}, including tutorials, notes, and related developer writing.`,
		})
	)
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
</svelte:head>

{#if data.posts.length}
	<aside class="mb-16 text-center">
		<h1 class="text-4xl font-bold mb-4">{label}</h1>
		<p class="mx-auto mb-8 max-w-2xl text-muted-foreground">
			Posts, tutorials, and notes connected to {label.toLowerCase()}.
		</p>
		<ul class="flex flex-col items-center">
			{#each data.posts as post}
				<BlogCard {post} />
			{/each}
		</ul>
	</aside>
{/if}
