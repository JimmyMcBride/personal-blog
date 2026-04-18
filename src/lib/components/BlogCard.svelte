<script lang="ts">
	import { formatDate } from "$lib/utils.js"

	let {
		post,
		variant = "default",
	}: {
		post: Post
		variant?: "default" | "compact"
	} = $props()

	let displayDate = $derived(post.updated ?? post.date)
</script>

{#key post.slug}
	{#if variant === "compact"}
		<a
			class="group mt-4 block w-full max-w-4xl overflow-hidden rounded-[1.5rem] border border-border/80 bg-card/90 text-card-foreground transition-colors hover:border-primary/35 hover:bg-accent/20"
			href={`/blog/${post.slug}`}
		>
			<div class="grid gap-5 p-5 md:grid-cols-[minmax(0,1fr)_13rem] md:items-start">
				<div class="space-y-3">
					<h3 class="text-xl font-bold leading-tight sm:text-2xl" data-toc-ignore>{post.title}</h3>
					<p class="text-sm leading-7 text-muted-foreground sm:text-base">
						{post.short ?? post.description}
					</p>
				</div>

				{#if post.image}
					<div class="overflow-hidden rounded-2xl border border-border/70 bg-muted">
						<img
							src={post.image}
							alt=""
							class="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
							width="1000"
							loading="lazy"
						/>
					</div>
				{/if}
			</div>

			<div class="border-t border-border/70 px-5 py-4">
				<div class="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
					<img src="/me-anime.webp" alt="Jimmy McBride" class="h-8 w-8 rounded-full" loading="lazy" />
					<div class="flex flex-wrap items-center gap-2">
						<span class="font-semibold text-foreground" data-toc-ignore>Jimmy McBride</span>
						<span class="hidden sm:inline">/</span>
						<span>{post.updated ? "Updated" : "Published"} {formatDate(displayDate)}</span>
					</div>
				</div>
			</div>
		</a>
	{:else}
		<a
			class="rounded-lg bg-card text-card-foreground overflow-hidden w-full max-w-4xl mt-4 mx-4 transition-colors hover:bg-accent border border-border"
			href={`/blog/${post.slug}`}
		>
			<header class="mb-4">
				{#if post.image}
					<img src={post.image} alt="" width="1000px" loading="lazy" />
				{/if}
			</header>

			<div class="p-4 space-y-4">
				<h3 class="text-2xl font-bold" data-toc-ignore>{post.title}</h3>
				<article>
					<p>
						{post.description}
					</p>
				</article>
			</div>
			<hr class="opacity-50" />
			<footer class="p-4 flex justify-start items-center space-x-4">
				<img src="/me-anime.webp" alt="Jimmy McBride" class="w-8 h-8 rounded-full" loading="lazy" />
				<div class="flex-auto flex justify-between items-center">
					<h6 class="font-bold" data-toc-ignore>By Jimmy McBride</h6>
					<small>On {formatDate(post.date)}</small>
				</div>
			</footer>
		</a>
	{/if}
{/key}
