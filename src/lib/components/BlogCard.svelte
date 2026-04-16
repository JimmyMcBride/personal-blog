<script lang="ts">
	import { formatDate } from "$lib/utils.js"

	let { post } = $props()
</script>

{#key post.slug}
	<a class="rounded-lg bg-card text-card-foreground overflow-hidden w-full max-w-4xl mt-4 mx-4 transition-colors hover:bg-accent border border-border" href={`/blog/${post.slug}`}>
		<header class="mb-4">
			{#if post.image}
				<img src={post.image} alt="blog banner" width="1000px" loading="lazy" />
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
{/key}
