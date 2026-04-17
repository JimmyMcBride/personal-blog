<script lang="ts">
	import { buttonVariants } from "$lib/components/ui/button"
	import { title } from "$lib/config"
	import { createSeo } from "$lib/seo"
	import { cn, formatDate } from "$lib/utils.js"
	import type { PageData } from "./$types"

	let { data }: { data: PageData } = $props()
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
	<header class="grid gap-6 rounded-[2rem] border border-border/80 bg-card/60 p-6 md:p-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(18rem,1fr)] lg:items-start">
		<div class="space-y-4">
			<p class="text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">Topic hubs</p>
			<h1 class="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
				Browse the site by subject
			</h1>
			<p class="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
				Topic hubs group related tutorials, essays, and implementation notes so you can move through the site with a clear subject in mind instead of digging through the full archive.
			</p>
		</div>

		<aside class="rounded-[1.5rem] border border-border/70 bg-background/80 p-5">
			<h2 class="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
				How to use this page
			</h2>
			<ul class="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
				<li class="flex gap-3">
					<span class="font-mono text-xs text-foreground">01</span>
					<span>Start with the topic closest to the problem you are trying to solve right now.</span>
				</li>
				<li class="flex gap-3">
					<span class="font-mono text-xs text-foreground">02</span>
					<span>Use topic pages to browse focused posts instead of scanning the full archive.</span>
				</li>
				<li class="flex gap-3">
					<span class="font-mono text-xs text-foreground">03</span>
					<span>Each hub surfaces the latest and most relevant posts for that subject.</span>
				</li>
			</ul>
		</aside>
	</header>

	<div class="mt-10 space-y-4">
		{#each data.topics as topic}
			<article class="rounded-[1.75rem] border border-border/80 bg-card/75 p-6 transition-colors hover:border-primary/30 hover:bg-card">
				<div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
					<div class="space-y-5 lg:max-w-3xl">
						<div class="flex flex-wrap items-center gap-3">
							<h2 class="text-2xl font-bold sm:text-3xl">{topic.title}</h2>
							<span class="rounded-full border border-border bg-background px-3 py-1 text-sm font-medium text-muted-foreground">
								{topic.postCount} post{topic.postCount === 1 ? "" : "s"}
							</span>
						</div>

						<p class="max-w-2xl text-base leading-8 text-muted-foreground">{topic.summary}</p>

						<div class="flex flex-wrap gap-2">
							{#each topic.focusAreas.slice(0, 3) as focusArea}
								<span class="rounded-full border border-border/80 bg-muted/60 px-3 py-1 text-sm text-muted-foreground">
									{focusArea}
								</span>
							{/each}
						</div>

						<div class="rounded-[1.25rem] border border-border/70 bg-background/80 p-4">
							<p class="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Latest post</p>
							{#if topic.latestPost}
								<div class="mt-2 space-y-1">
									<a
										class="text-lg font-semibold text-foreground underline-offset-4 hover:text-primary hover:underline"
										href={`/blog/${topic.latestPost.slug}`}
									>
										{topic.latestPost.title}
									</a>
									<p class="text-sm text-muted-foreground">
										Updated {formatDate(topic.latestPost.date)}
									</p>
								</div>
							{:else}
								<p class="mt-2 text-sm text-muted-foreground">This hub is waiting for its first post.</p>
							{/if}
						</div>
					</div>

					<div class="flex shrink-0 flex-col gap-3 lg:items-end">
						<p class="max-w-xs text-sm leading-7 text-muted-foreground lg:text-right">
							Follow this subject through the posts that define it, then branch deeper once you know the terrain.
						</p>
						<a
							href={`/topics/${topic.slug}`}
							class={cn(buttonVariants("outline"), "no-underline rounded-full px-5")}
						>
							Open hub
						</a>
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>
