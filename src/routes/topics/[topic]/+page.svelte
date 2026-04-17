<script lang="ts">
	import BlogCard from "$lib/components/BlogCard.svelte"
	import { title } from "$lib/config"
	import { createSeo } from "$lib/seo"

	let { data } = $props()

	let seo = $derived(
		createSeo({
			path: `/topics/${data.topic.slug}`,
			title: `${data.topic.title} | ${title}`,
			description: data.topic.description,
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
</svelte:head>

<section class="mx-auto mb-16 max-w-6xl p-4">
	<header class="mb-10 rounded-lg border border-border bg-card p-6">
		<p class="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Topic hub</p>
		<h1 class="mb-4 text-4xl font-bold sm:text-5xl">{data.topic.title}</h1>
		<p class="mb-6 max-w-3xl text-muted-foreground">{data.topic.description}</p>
		<div class="flex flex-wrap gap-2">
			{#each data.topic.focusAreas as focusArea}
				<span class="rounded-full border border-border bg-muted px-3 py-1 text-sm">{focusArea}</span>
			{/each}
		</div>
	</header>

	<section>
		<div class="mb-6 flex items-center justify-between gap-4">
			<div>
				<h2 class="text-2xl font-bold">Posts in this topic</h2>
				<p class="text-muted-foreground">{data.posts.length} post{data.posts.length === 1 ? "" : "s"}</p>
			</div>
			<a class="font-medium text-primary underline-offset-4 hover:underline" href="/topics">
				View all topic hubs
			</a>
		</div>

		<ul class="flex flex-col items-center">
			{#each data.posts as post}
				<BlogCard {post} />
			{/each}
		</ul>
	</section>
</section>
