<script lang="ts">
	import BlogCard from "$lib/components/BlogCard.svelte"
	import type { PageData } from "./$types"

	export let data: PageData
</script>

{#if data.posts.length}
	<aside class="mb-16 text-center">
		<h2>{data.category}</h2>
		<ul class="flex flex-col items-center">
			{#each data.posts as post}
				<BlogCard {post} />
			{/each}
		</ul>
	</aside>
{/if}
