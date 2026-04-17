<script lang="ts">
	import { title } from "$lib/config"
	import { createSeo } from "$lib/seo"
	import { getAllTopics } from "$lib/taxonomy"

	const topics = getAllTopics()
	const seo = createSeo({
		path: "/topics",
		title: `Topics | ${title}`,
		description:
			"Browse Jimmy McBride's core topic hubs for Bash, Linux, SvelteKit, self-hosting, AI for developers, career growth, and Android.",
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
	<header class="mb-10 space-y-4 text-center">
		<h1 class="text-4xl font-bold sm:text-5xl">Topic Hubs</h1>
		<p class="mx-auto max-w-3xl text-muted-foreground">
			Start with the subjects that define the site, then branch into the related tutorials, essays,
			and implementation notes behind each one.
		</p>
	</header>

	<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
		{#each topics as topic}
			<a
				href={`/topics/${topic.slug}`}
				class="rounded-lg border border-border bg-card p-6 no-underline transition-colors hover:border-primary/40 hover:bg-accent/30"
			>
				<h2 class="mb-3 text-2xl font-bold">{topic.title}</h2>
				<p class="mb-4 text-muted-foreground">{topic.summary}</p>
				<ul class="space-y-1 text-sm text-muted-foreground">
					{#each topic.focusAreas as focusArea}
						<li>{focusArea}</li>
					{/each}
				</ul>
			</a>
		{/each}
	</div>
</section>
