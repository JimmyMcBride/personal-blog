<script lang="ts" defer>
	import { formatDate } from "$lib/utils.js"
	import { Avatar } from "@skeletonlabs/skeleton"

	export let post
</script>

{#key post.slug}
	<a class="card card-hover overflow-hidden w-full max-w-4xl mt-4 mx-4" href={`/blog/${post.slug}`}>
		<header class="mb-4">
			{#if post.image}
				<img src={post.image} alt="blog banner" width="1000px" loading="lazy" />
			{/if}
		</header>

		<div class="p-4 space-y-4">
			<h3 class="h3" data-toc-ignore>{post.title}</h3>
			<article>
				<p>
					{post.description}
				</p>
			</article>
		</div>
		<hr class="opacity-50" />
		<footer class="p-4 flex justify-start items-center space-x-4">
			<Avatar src="/me-anime.webp" width="w-8" loading="lazy" />
			<div class="flex-auto flex justify-between items-center">
				<h6 class="font-bold" data-toc-ignore>By Jimmy McBride</h6>
				<small>On {formatDate(post.date)}</small>
			</div>
		</footer>
	</a>
{/key}
